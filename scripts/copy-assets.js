/**
  * Some evidence that CopyWebpackPlugin doesn't work as expected in Next.js, 
  * and it seems it's convention to let it copy from the {root}/public folder
 */

function copyAssets() {
  const fs = require("fs-extra");
  const path = require("path");
  const glob = require("glob");

  const sourcePattern = path.join(
    __dirname,
    "..",
    "node_modules",
    "**",
    "@itwin",
    "*",
    "lib",
    "public",
    "**",
    "*"
  );
  const files = glob.sync(sourcePattern, { nodir: true });

  files.forEach((file) => {
    const relativePath = file.replace(/.+public\//, "")
    
    const destPath = path.join(__dirname, "..", "public", relativePath);
    fs.ensureDirSync(path.dirname(destPath));
    fs.copyFileSync(file, destPath);
    console.log(`Copied ${file} to ${destPath}`);
  });
}

copyAssets();