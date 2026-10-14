# MentorQA Vulnerable Fixtures

This repository is intentionally vulnerable for MentorQA security, dynamic fuzzing, and architecture analysis testing.

### Vulnerabilities Included:
- **Reflected XSS**: `/search` responds with unescaped HTML (`text/html`).
- **SQL Injection**: `/users` string-concatenates query input into an inline SQL statement.
- **Path Traversal**: `/file` passes unvalidated query input to `path.resolve` and `sendFile`.
- **Broken Auth**: `/admin` exposes sensitive data without proper token authorization.
- **Circular Dependency**: `A.js` and `B.js` require each other.
- **Layering Violation**: `controllers/UserController.js` directly instantiates `repositories/UserRepository.js` bypassing any service layer.
- **Secret Exposure**: `.env` file in repository with test secrets.
