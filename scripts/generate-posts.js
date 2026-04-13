const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../content/products");
const outputFile = path.join(__dirname, "../posts.json");

// ✅ Correct public path for your live domain (evoora.net)
const publicFolder = "/images/uploads";

let posts = [];

fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith(".md")) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");

    const titleMatch = content.match(/title:\s*(.*)/);
    const imageMatch = content.match(/image:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);

    let imagePath = imageMatch ? imageMatch[1].trim() : "";

    // ✅ Fix image path properly
    if (imagePath) {
      const fileName = path.basename(imagePath);
      imagePath = `${publicFolder}/${fileName}`;
    }

    posts.push({
      title: titleMatch ? titleMatch[1].trim() : "No title",
      image: imagePath,
      description: descMatch ? descMatch[1].trim() : ""
    });
  }
});

// ✅ Write JSON once (fixed duplicate write issue)
fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

console.log("posts.json generated successfully!");
