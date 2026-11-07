-- File: server/src/db/schema.sql

CREATE TABLE
    IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('student', 'teacher')),
        created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );

CREATE TABLE
    IF NOT EXISTS quizzes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        teacher_id INTEGER NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
        title TEXT NOT NULL CHECK (length (trim(title)) > 0),
        instructions TEXT NOT NULL DEFAULT '',
        time_limit_minutes INTEGER NOT NULL CHECK (time_limit_minutes > 0),
        due_at TEXT,
        created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );

CREATE INDEX IF NOT EXISTS idx_quizzes_teacher ON quizzes (teacher_id);

CREATE TABLE
    IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL REFERENCES quizzes (id) ON DELETE CASCADE,
        position INTEGER NOT NULL CHECK (position >= 0),
        type TEXT NOT NULL CHECK (type IN ('mcq', 'short_answer')),
        prompt TEXT NOT NULL CHECK (length (trim(prompt)) > 0),
        points INTEGER NOT NULL DEFAULT 1 CHECK (points >= 0),
        options_json TEXT CHECK (
            options_json IS NULL
            OR json_valid (options_json)
        ),
        answer_key TEXT,
        CHECK (
            (
                type = 'mcq'
                AND options_json IS NOT NULL
                AND answer_key IS NOT NULL
            )
            OR (
                type = 'short_answer'
                AND options_json IS NULL
                AND answer_key IS NULL
            )
        )
    );

CREATE INDEX IF NOT EXISTS idx_questions_quiz_position ON questions (quiz_id, position);

CREATE TABLE
    IF NOT EXISTS attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quiz_id INTEGER NOT NULL REFERENCES quizzes (id) ON DELETE RESTRICT,
        student_id INTEGER NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
        consent_given INTEGER NOT NULL DEFAULT 1 CHECK (consent_given = 1),
        status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'expired')),
        started_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        deadline_at TEXT NOT NULL,
        submitted_at TEXT,
        UNIQUE (quiz_id, student_id)
    );

CREATE INDEX IF NOT EXISTS idx_attempts_student ON attempts (student_id);

CREATE TABLE
    IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attempt_id INTEGER NOT NULL REFERENCES attempts (id) ON DELETE CASCADE,
        question_id INTEGER NOT NULL REFERENCES questions (id) ON DELETE RESTRICT,
        response TEXT NOT NULL DEFAULT '',
        client_version INTEGER NOT NULL CHECK (client_version >= 0),
        is_correct INTEGER CHECK (
            is_correct IS NULL
            OR is_correct IN (0, 1)
        ),
        created_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        updated_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        UNIQUE (attempt_id, question_id)
    );

CREATE TABLE
    IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attempt_id INTEGER NOT NULL REFERENCES attempts (id) ON DELETE CASCADE,
        question_id INTEGER REFERENCES questions (id) ON DELETE RESTRICT,
        client_event_id TEXT NOT NULL CHECK (length (client_event_id) > 0),
        type TEXT NOT NULL CHECK (
            type IN (
                'focus_lost',
                'focus_gained',
                'paste',
                'answer_change',
                'question_view',
                'question_leave',
                'copy',
                'key_burst'
            )
        ),
        t_ms INTEGER NOT NULL CHECK (t_ms >= 0),
        metadata TEXT NOT NULL DEFAULT '{}' CHECK (json_valid (metadata)),
        received_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        UNIQUE (attempt_id, client_event_id)
    );

CREATE INDEX IF NOT EXISTS idx_events_attempt_order ON events (attempt_id, t_ms, id);

CREATE TABLE
    IF NOT EXISTS results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        attempt_id INTEGER NOT NULL UNIQUE REFERENCES attempts (id) ON DELETE CASCADE,
        score INTEGER NOT NULL CHECK (score BETWEEN 0 AND 100),
        level TEXT NOT NULL CHECK (level IN ('Low', 'Medium', 'High')),
        confidence TEXT NOT NULL CHECK (confidence IN ('normal', 'low')),
        confidence_reasons_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid (confidence_reasons_json)),
        features_json TEXT NOT NULL CHECK (json_valid (features_json)),
        flags_json TEXT NOT NULL DEFAULT '[]' CHECK (json_valid (flags_json)),
        scoring_version TEXT NOT NULL,
        computed_at TEXT NOT NULL DEFAULT (strftime ('%Y-%m-%dT%H:%M:%fZ', 'now')),
        mcq_points INTEGER CHECK (
            mcq_points IS NULL
            OR mcq_points >= 0
        ),
        mcq_points_possible INTEGER CHECK (
            mcq_points_possible IS NULL
            OR mcq_points_possible >= 0
        ),
        decision TEXT NOT NULL DEFAULT 'pending' CHECK (
            decision IN ('pending', 'cleared', 'needs_follow_up')
        ),
        decision_by INTEGER REFERENCES users (id) ON DELETE RESTRICT,
        decided_at TEXT
    );