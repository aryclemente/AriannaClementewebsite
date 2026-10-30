const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpeg = path.resolve(__dirname, '../assets/videos/node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');
const audioDir = path.resolve(__dirname, '../assets/videos/public/audio');

const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));
const results = {};

files.forEach(f => {
  const p = path.join(audioDir, f);
  let out = '';
  try {
    execSync(`"${ffmpeg}" -i "${p}"`, { stdio: 'pipe' });
  } catch (err) {
    out = (err.stderr || err.stdout || '').toString();
  }
  const m = out.match(/Duration:\s*(\d+):(\d+):([\d\.]+)/);
  if (m) {
    const sec = parseFloat(m[1]) * 3600 + parseFloat(m[2]) * 60 + parseFloat(m[3]);
    const frames = Math.ceil(sec * 30);
    results[f] = { sec: Number(sec.toFixed(2)), frames };
  }
});

console.log(JSON.stringify(results, null, 2));
