const fs = require('fs');

const files = {
  hub: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/34/output.txt',
  fullstack: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/38/output.txt',
  wordpress: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/40/output.txt',
  marketing: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/42/output.txt',
  soporte: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/44/output.txt'
};

const images = new Set();
const hrefs = new Set();
const dataPaths = new Set();

for (const [key, p] of Object.entries(files)) {
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const html = data.html;
  
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    images.add(match[1]);
  }

  const hrefRegex = /<a[^>]+href=["']([^"']+)["']/g;
  while ((match = hrefRegex.exec(html)) !== null) {
    hrefs.add(match[1]);
  }

  const dataPathRegex = /data-path=["']([^"']+)["']/g;
  while ((match = dataPathRegex.exec(html)) !== null) {
    dataPaths.add(match[1]);
  }
}

console.log('=== IMAGES FOUND (' + images.size + ') ===');
for (const img of images) console.log(img);

console.log('=== UNIQUE HREF VALUES (' + hrefs.size + ') ===');
for (const h of hrefs) console.log(h);

console.log('=== UNIQUE DATA-PATH VALUES (' + dataPaths.size + ') ===');
for (const dp of dataPaths) console.log(dp);
