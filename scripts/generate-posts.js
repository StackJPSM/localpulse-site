const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../content/products");
const outputFile = path.join(__dirname, "../posts.json");

// ✅ Your base path (only defined once here)
const publicFolder = "/localpulse-site/images/uploads";

let posts = [];

fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith(".md")) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");

    const titleMatch = content.match(/title:\s*(.*)/);
    const imageMatch = content.match(/image:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);

    let imagePath = imageMatch ? imageMatch[1].trim() : "";

    // ✅ Automatically add your base path
    if (imagePath && !imagePath.startsWith("http")) {
      imagePath = `${publicFolder}/${imagePath.replace(/^\/+/, "")}`;
    }

    posts.push({
      title: titleMatch ? titleMatch[1] : "No title",
      image: imagePath,
      description: descMatch ? descMatch[1] : ""
    });
  }
});

fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log("posts.json generated!");
