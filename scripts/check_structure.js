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
  console.log(`\n================== ${key.toUpperCase()} ==================`);
  
  // Scripts in file
  const scripts = [...html.matchAll(/<script[\s\S]*?<\/script>/gi)].map(s => s[0].slice(0, 100).replace(/\n/g, ' '));
  console.log('Scripts:', scripts);

  // Check header
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i);
  console.log('Header length:', headerMatch ? headerMatch[0].length : 0);

  // Check footer
  const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
  console.log('Footer length:', footerMatch ? footerMatch[0].length : 0);
  
  // Check sections
  const sections = [...html.matchAll(/<section[^>]*id=["']?([^"'\s>]+)?[\s\S]*?>/gi)].map(s => s[1] || 'no-id');
  console.log('Section IDs:', sections);
}
