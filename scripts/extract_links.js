const fs = require('fs');

const files = {
  hub: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/34/output.txt',
  fullstack: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/38/output.txt',
  wordpress: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/40/output.txt',
  marketing: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/42/output.txt',
  soporte: 'C:/Users/user/.gemini/antigravity-ide/brain/f63c9ae6-d8c0-4831-a3ef-944425667605/.system_generated/steps/44/output.txt'
};

for (const [key, p] of Object.entries(files)) {
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const html = data.html;
  console.log('=== ' + key.toUpperCase() + ' ===');
  const linkRegex = /<a\s+([^>]*?)>(.*?)<\/a>/gis;
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const dpMatch = attrs.match(/data-path=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    const dp = dpMatch ? dpMatch[1] : '';
    console.log(`  href: "${href}" | dp: "${dp}" | text: "${text.slice(0, 60)}"`);
  }
}
