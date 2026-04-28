#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const videosDir = path.join(__dirname, 'videos');
const output = [];

// Scan directories
const categories = ['ano', 'normal'];

categories.forEach(category => {
  const categoryPath = path.join(videosDir, category);

  if (!fs.existsSync(categoryPath)) {
    console.warn(`Directory not found: ${categoryPath}`);
    return;
  }

  const entries = fs.readdirSync(categoryPath);

  entries.forEach(entry => {
    const videoPath = path.join(categoryPath, entry, 'video', 'rgb-front.mp4');

    if (fs.existsSync(videoPath)) {
      output.push({
        id: `${category}-${entry}`,
        category: category === 'ano' ? 'anomaly' : 'normal',
        timestamp: entry,
        path: `videos/${category}/${entry}/video/rgb-front.mp4`
      });
    }
  });
});

// Sort by timestamp for consistent ordering
output.sort((a, b) => a.timestamp.localeCompare(b.timestamp));

// Write manifest
const manifest = {
  generated: new Date().toISOString(),
  videos: output
};

fs.writeFileSync(
  path.join(__dirname, 'data', 'videos.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`Generated manifest with ${output.length} videos`);
