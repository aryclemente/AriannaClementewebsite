const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = path.resolve(__dirname, '../assets/videos/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const videoPath = path.resolve(__dirname, '../assets/images/portfolio/Gonzaga Web/SitioWebGonzaga.mp4');
const outDir = path.resolve(__dirname, '../assets/videos/analysis_frames');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Extracting frames every 4 seconds from SitioWebGonzaga.mp4...');
// fps=1/4 extracts one frame every 4 seconds
execFileSync(ffmpegPath, [
  '-y',
  '-i', videoPath,
  '-r', '0.25',
  '-vf', 'scale=800:-1',
  path.join(outDir, 'frame_%03d.jpg')
]);

const frames = fs.readdirSync(outDir).filter(f => f.endsWith('.jpg'));
console.log(`Extracted ${frames.length} frames successfully.`);
