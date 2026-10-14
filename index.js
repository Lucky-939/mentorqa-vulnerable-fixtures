const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

class DummyDB {
  all(query, callback) {
    if (query.includes("'")) {
      callback(new Error("SQLITE_ERROR: near \"'\": syntax error (SQL syntax)"));
    } else {
      callback(null, [{ id: 1, name: 'Alice' }]);
    }
  }
}
const db = new DummyDB();

// 1. Reflected XSS
app.get('/search', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send("<div>" + (req.query.q || '') + "</div>");
});

// 2. Broken Auth / returns sensitive data on invalid/missing token
app.get('/admin', (req, res) => {
  res.json({ secret: 'admin-dashboard-sensitive-data' });
});

// 3. SQL Injection via DummyDB shim
app.get('/users', (req, res) => {
  const q = req.query.id || '';
  db.all("SELECT * FROM users WHERE id = '" + q + "'", (err, rows) => {
    if (err) {
      res.status(500).send(err.toString());
    } else {
      res.json(rows);
    }
  });
});

// 4. Path Traversal
app.get('/file', (req, res) => {
  const filename = req.query.file || 'index.js';
  res.sendFile(path.resolve(__dirname, filename));
});

app.listen(port, () => {
  console.log('Vulnerable test server listening on port ' + port);
});
