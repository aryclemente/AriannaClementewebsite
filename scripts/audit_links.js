const fs = require('fs');

const files = [
  'portafolio.html',
  'portafolio-fullstack.html',
  'portafolio-wordpress.html',
  'portafolio-marketing.html',
  'portafolio-soporte.html'
];

for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  const linkRegex = /<a\s+([^>]*?)>(.*?)<\/a>/gis;
  let match;
  let total = 0;
  let hashCount = 0;
  while ((match = linkRegex.exec(html)) !== null) {
    total++;
    const attrs = match[1];
    const text = match[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    const hrefMatch = attrs.match(/href=["']([^"']*)["']/i);
    const href = hrefMatch ? hrefMatch[1] : '';
    if (href === '#' || href === '') {
      hashCount++;
      console.log(`   # link: text="${text.slice(0, 50)}" | attrs="${attrs.slice(0, 60)}"`);
    }
  }
  console.log(`Total links: ${total} | Empty/# links: ${hashCount}`);
}
