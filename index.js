const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = '';

  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, '404.html');
    res.statusCode = 404;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      return res.end('Server error');
    }

    res.writeHead(res.statusCode || 200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
