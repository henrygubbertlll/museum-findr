const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

// Create manifest.json
const manifest = {
  name: "Museum Findr",
  short_name: "MuseumFindr",
  description: "Discover museums near you",
  display: "standalone",
  start_url: "/",
  background_color: "#F5F0E8",
  theme_color: "#7C2D28",
  orientation: "portrait",
  lang: "en"
};

fs.writeFileSync(
  path.join(distDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log('Created manifest.json');

// PWA meta tags to inject before </head>
const pwaTags = [
  '  <link rel="manifest" href="/manifest.json">',
  '  <meta name="theme-color" content="#7C2D28">',
  '  <meta name="apple-mobile-web-app-capable" content="yes">',
  '  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
  '  <meta name="apple-mobile-web-app-title" content="Museum Findr">'
].join('\n');

// Find all HTML files recursively
function findHtmlFiles(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles(distDir);
let injected = 0;

for (const file of htmlFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('rel="manifest"')) {
    content = content.replace('</head>', pwaTags + '\n</head>');
    fs.writeFileSync(file, content);
    injected++;
  }
}

console.log('Injected PWA tags into ' + injected + ' HTML files');
