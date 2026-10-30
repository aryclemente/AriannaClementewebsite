const fs = require('fs');
const path = require('path');

// We have 47 frames, extracted at interval of 4.0 seconds
// frame_001.jpg -> 0s
// frame_002.jpg -> 4s
// ...
// frame_047.jpg -> 184s (3m04s)

const frames = fs.readdirSync(path.resolve(__dirname, '../assets/videos/analysis_frames'))
  .filter(f => f.endsWith('.jpg'))
  .sort();

console.log('Total frames:', frames.length);
const diffs = [];
for (let i = 0; i < frames.length - 1; i++) {
  const b1 = fs.readFileSync(path.resolve(__dirname, '../assets/videos/analysis_frames', frames[i]));
  const b2 = fs.readFileSync(path.resolve(__dirname, '../assets/videos/analysis_frames', frames[i+1]));
  
  // calculate byte difference as a rough proxy
  let diff = 0;
  const len = Math.min(b1.length, b2.length);
  for (let j = 0; j < len; j += 100) {
    diff += Math.abs(b1[j] - b2[j]);
  }
  const sec = i * 4;
  const min = Math.floor(sec / 60);
  const remSec = sec % 60;
  const timeStr = `${min}:${remSec.toString().padStart(2, '0')}`;
  diffs.push({ idx: i + 1, time: timeStr, sec, diff });
}

// Log diffs
diffs.forEach(d => {
  const isTransition = d.diff > 30000;
  const isStatic = d.diff < 5000;
  console.log(`Frame ${d.idx.toString().padStart(2, '0')} (${d.time}) -> Diff: ${d.diff} ${isTransition ? '<< BIG CHANGE / CUT' : isStatic ? '[STATIC / IDLE]' : ''}`);
});
