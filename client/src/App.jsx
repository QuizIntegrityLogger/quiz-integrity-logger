/**
 * @file client/src/App.jsx
 * @description
 * TEMPORARY screen for Issue 5 so npm run dev shows the shared styles. Issue 9 replaces this
 * file with the public, student, and teacher routes and role guards.
 */
export default function App() {
  return (
    <main className="container stack">
      <h1>Quiz Integrity Logger</h1>
      <p className="muted">
        The client is running. Below is a preview of the shared styles.
      </p>

      <section className="card stack" aria-labelledby="form-title">
        <h2 id="form-title">Form</h2>
        <form className="stack" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" />
            <span className="field-hint">We never share it.</span>
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              aria-invalid="true"
              aria-describedby="password-error"
            />
            <span id="password-error" className="field-error">
              Password is too short.
            </span>
          </div>
          <div className="row">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
            <button type="button" className="btn btn-primary" disabled>
              Disabled
            </button>
          </div>
        </form>
      </section>

      <section className="card stack" aria-labelledby="states-title">
        <h2 id="states-title">States</h2>
        <div className="loading" role="status">
          <span className="spinner" aria-hidden="true" /> Loading…
        </div>
        <div className="alert alert-error" role="alert">
          Something went wrong. Please try again.
        </div>
        <div className="alert alert-success" role="status">
          Saved.
        </div>
        <p className="notice notice-confidence">
          Low confidence: this quiz has fewer than five questions, so the
          indicator is less reliable.
        </p>
      </section>

      <section className="card stack" aria-labelledby="table-title">
        <h2 id="table-title">Table</h2>
        <div className="table-wrap">
          <table>
            <caption className="visually-hidden">Sample attempts</caption>
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Concern</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sample student</td>
                <td>
                  <span className="badge badge-low">Low</span>
                </td>
                <td>Submitted</td>
              </tr>
              <tr>
                <td>Another student</td>
                <td>
                  <span className="badge badge-medium">Medium</span>
                </td>
                <td>Submitted</td>
              </tr>
              <tr>
                <td>Third student</td>
                <td>
                  <span className="badge badge-high">High</span>
                </td>
                <td>Expired</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
