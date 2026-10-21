const fs = require('fs');
const html = fs.readFileSync('extracted_stitch.html', 'utf8');
const urls = html.match(/https:\/\/[^"'\s>]+/g) || [];
console.log([...new Set(urls)].join('\n'));
