/**
 * Post-install script to clean up problematic test directories from node_modules
 * These test files cause Turbopack build failures due to missing dev dependencies
 */

const fs = require("fs");
const path = require("path");

const dirsToRemove = [
  // thread-stream test directories that reference dev-only dependencies
  "node_modules/**/thread-stream/test",
  "node_modules/**/thread-stream/benchmark",
  // Nested walletconnect logger thread-stream
  "node_modules/@walletconnect/logger/node_modules/thread-stream/test",
  "node_modules/@walletconnect/logger/node_modules/thread-stream/benchmark",
];

function findDirectories(pattern) {
  const glob = require("path");
  const baseDir = process.cwd();

  // Simple glob-like matching for our specific patterns
  const parts = pattern.split("/**/");
  if (parts.length === 2) {
    const [prefix, suffix] = parts;
    const prefixPath = path.join(baseDir, prefix);

    if (!fs.existsSync(prefixPath)) return [];

    const results = [];
    findRecursive(prefixPath, suffix, results);
    return results;
  }

  // Direct path
  const directPath = path.join(baseDir, pattern);
  return fs.existsSync(directPath) ? [directPath] : [];
}

function findRecursive(dir, targetSuffix, results) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const fullPath = path.join(dir, entry.name);

      // Check if this path ends with our target
      if (fullPath.endsWith(targetSuffix)) {
        results.push(fullPath);
      }

      // Continue searching in subdirectories (but not too deep)
      const depth = fullPath.split("node_modules").length;
      if (depth < 5) {
        findRecursive(fullPath, targetSuffix, results);
      }
    }
  } catch {
    // Ignore permission errors
  }
}

function removeDirectory(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✓ Removed: ${dirPath}`);
      return true;
    }
  } catch (error) {
    console.warn(`⚠ Could not remove ${dirPath}:`, error.message);
  }
  return false;
}

console.log("🧹 Cleaning up problematic node_modules directories...\n");

let removedCount = 0;

for (const pattern of dirsToRemove) {
  const dirs = findDirectories(pattern);
  for (const dir of dirs) {
    if (removeDirectory(dir)) {
      removedCount++;
    }
  }
}

if (removedCount > 0) {
  console.log(`\n✅ Cleaned up ${removedCount} directories`);
} else {
  console.log("✅ No problematic directories found");
}
