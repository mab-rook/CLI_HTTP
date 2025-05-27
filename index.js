const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3000;


const pageserver  = async(req, res) => {
  let filePath;

  if (req.url === '/') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    filePath = path.join(__dirname, '404.html');
    res.statusCode = 404;
  }

  // try {
  //   const file = await fs.readFile(filePath, 'utf-8');
  //   res.writeHead(res.statusCode || 200, {'Content-Type': 'text/html'});
  //   res.end(file);
  // } catch (error) {
  //   res.writeHead(500, {'Content-Type': 'text/plain'});
  //   return res.end('Server error');
  // }
  const file = await fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      return res.end('Server error');
    }

    res.writeHead(res.statusCode || 200, {'Content-Type': 'text/html'});
    res.end(data);
  });
};

const server = http.createServer(pageserver);

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
