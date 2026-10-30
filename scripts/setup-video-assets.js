const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../assets/videos/public');
const videoSrc = path.resolve(__dirname, '../assets/images/portfolio/Gonzaga Web/SitioWebGonzaga.mp4');
const screenshotsSrcDir = path.resolve(__dirname, '../assets/images/portfolio/Gonzaga Web/screenshotswordpress');

// 1. Create subdirs
const videoOutDir = path.join(publicDir, 'video');
const screenshotsOutDir = path.join(publicDir, 'screenshots');
const audioOutDir = path.join(publicDir, 'audio');

fs.mkdirSync(videoOutDir, { recursive: true });
fs.mkdirSync(screenshotsOutDir, { recursive: true });
fs.mkdirSync(audioOutDir, { recursive: true });

// 2. Copy video if not already there or different size
const videoDest = path.join(videoOutDir, 'SitioWebGonzaga.mp4');
if (!fs.existsSync(videoDest) || fs.statSync(videoDest).size !== fs.statSync(videoSrc).size) {
  console.log('Copying SitioWebGonzaga.mp4 to public/video/ ...');
  fs.copyFileSync(videoSrc, videoDest);
  console.log('Video copied successfully.');
} else {
  console.log('Video already exists in public/video/.');
}

// 3. Copy screenshots
const screenshots = fs.readdirSync(screenshotsSrcDir).filter(f => f.endsWith('.png'));
screenshots.forEach(file => {
  const src = path.join(screenshotsSrcDir, file);
  // normalize filename to be clean for web
  const cleanName = file.replace(/^_C__Users_.*_Propuesta_financiamiento.*\.png$/, 'propuesta_financiamiento_old.png')
                        .replace(/\s+/g, '_')
                        .toLowerCase();
  const dest = path.join(screenshotsOutDir, cleanName);
  fs.copyFileSync(src, dest);
});
console.log(`Copied ${screenshots.length} screenshots to public/screenshots/.`);
