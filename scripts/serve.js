const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  if (reqPath === '/portafolio') reqPath = '/portafolio.html';
  if (reqPath === '/portafolio/') reqPath = '/portafolio/index.html';
  if (reqPath === '/portafolio/fullstack') reqPath = '/portafolio/fullstack.html';
  if (reqPath === '/portafolio/wordpress') reqPath = '/portafolio/wordpress.html';
  if (reqPath === '/portafolio/marketing') reqPath = '/portafolio/marketing.html';
  if (reqPath === '/portafolio/soporte') reqPath = '/portafolio/soporte.html';

  const filePath = path.join(__dirname, '..', reqPath);
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
