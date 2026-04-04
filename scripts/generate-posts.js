const fs = require("fs");
const path = require("path");

const postsDir = path.join(__dirname, "../content/products");
const outputFile = path.join(__dirname, "../posts.json");

// ✅ Your base public folder
const publicFolder = "/localpulse-site/images/uploads";

let posts = [];

fs.readdirSync(postsDir).forEach(file => {
  if (file.endsWith(".md")) {
    const content = fs.readFileSync(path.join(postsDir, file), "utf-8");

    // Simple parsing (basic frontmatter)
    const titleMatch = content.match(/title:\s*(.*)/);
    const imageMatch = content.match(/image:\s*(.*)/);
    const descMatch = content.match(/description:\s*(.*)/);

    // ✅ Clean image path + auto prepend folder
    let imagePath = imageMatch ? imageMatch[1].trim() : "";

    if (imagePath) {
      // Prevent double slashes and handle clean join
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
