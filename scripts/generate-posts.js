const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../content/products");
const outputFile = path.join(__dirname, "../posts.json");

// ✅ Correct base path for GitHub Pages
const publicFolder = "/localpulse-site/images/uploads";

let posts = [];

fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith(".md")) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");

    const titleMatch = content.match(/title:\s*(.*)/);
    const imageMatch = content.match(/image:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);

    let imagePath = imageMatch ? imageMatch[1].trim() : "";

    // ✅ ALWAYS clean and rebuild the image path
    if (imagePath) {
      const fileName = path.basename(imagePath); // <-- THIS is the key fix
      imagePath = `${publicFolder}/${fileName}`;
    }

    posts.push({
      title: titleMatch ? titleMatch[1] : "No title",
      image: imagePath,
      description: descMatch ? descMatch[1] : ""
    });
  }
});

// ✅ make sure file actually writes
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log("posts.json generated!");
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log("posts.json generated!");
