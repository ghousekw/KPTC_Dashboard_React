import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to remove MP4 files recursively
function removeMP4Files(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Recursively process subdirectories
      removeMP4Files(fullPath);
    } else if (file.endsWith('.mp4')) {
      // Remove MP4 files
      fs.unlinkSync(fullPath);
      console.log(`Removed: ${fullPath}`);
    }
  }
}

// Get the dist directory path
const distPath = path.join(__dirname, '..', 'dist');

console.log('Removing MP4 files from build directory...');
removeMP4Files(distPath);
console.log('MP4 cleanup complete!'); 