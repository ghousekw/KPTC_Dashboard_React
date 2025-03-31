import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');

async function deleteMP4Files(directory) {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });

    for (const file of files) {
      const fullPath = path.join(directory, file.name);

      if (file.isDirectory()) {
        // Recursively check subdirectories
        await deleteMP4Files(fullPath);
      } else if (file.name.endsWith('.mp4')) {
        // Delete MP4 files
        try {
          await fs.unlink(fullPath);
          console.log(`Deleted: ${fullPath}`);
        } catch (err) {
          console.error(`Error deleting ${fullPath}:`, err);
        }
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

// Start the cleanup process
console.log('Starting MP4 cleanup...');
deleteMP4Files(distPath)
  .then(() => console.log('MP4 cleanup complete'))
  .catch(err => console.error('Error during cleanup:', err)); 