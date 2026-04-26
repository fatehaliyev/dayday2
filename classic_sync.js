const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\fateh\\OneDrive\\Desktop\\Halikoltukyikama\\public';

const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const loaderRegex = /<!-- Page Loader -->[\s\S]*?<\/div>\s*<\/div>/;
const headerRegex = /<!-- Classic Premium Header -->[\s\S]*?<\/header>/;
const footerRegex = /<!-- Classic Footer -->[\s\S]*?<\/footer>/;
const fabRegex = /<!-- Floating Contact Buttons -->[\s\S]*?<\/div>\s*<\/div>/;
const scriptRegex = /<script>[\s\S]*?<\/script>\s*<\/body>/;

const newLoader = indexHtml.match(loaderRegex) ? indexHtml.match(loaderRegex)[0] : '';
const newHeader = indexHtml.match(headerRegex)[0];
const newFooter = indexHtml.match(footerRegex)[0];
const newFab = indexHtml.match(fabRegex) ? indexHtml.match(fabRegex)[0] : '';
const newScript = indexHtml.match(scriptRegex)[0];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Sync Header & Footer
  content = content.replace(/<header[\s\S]*?<\/header>/, newHeader);
  content = content.replace(/<footer[\s\S]*?<\/footer>/, newFooter);

  // Sync Loader
  if (content.includes('id="loader"')) {
    content = content.replace(/<!-- (Premium )?Page Loader -->[\s\S]*?<\/div>\s*<\/div>/, newLoader);
  } else {
    content = content.replace('<body>', '<body>\n\n  ' + newLoader);
  }

  // Sync FAB
  if (content.includes('class="fab-container"')) {
    content = content.replace(/<div class="fab-container">[\s\S]*?<\/div>/, newFab);
  } else if (content.includes('<!-- Floating Contact Buttons -->')) {
    content = content.replace(/<!-- Floating Contact Buttons -->[\s\S]*?<\/div>\s*<\/div>/, newFab);
  } else {
    content = content.replace('</main>', '</main>\n\n  ' + newFab);
  }

  // Replace script tags at the bottom
  content = content.replace(/<script>[\s\S]*?<\/script>\s*<\/body>/, newScript);
  
  // Clean up "reveal" classes that break the layout
  content = content.replace(/ class="[^"]*reveal[^"]*"/g, '');
  content = content.replace(/ class="[^"]*delay-\d+[^"]*"/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Classic Sync complete for', filePath);
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('.git') && !fullPath.includes('node_modules')) {
        walkDir(fullPath);
      }
    } else {
      if (fullPath.endsWith('.html') && fullPath !== path.join(dir, 'index.html')) {
        replaceInFile(fullPath);
      }
    }
  }
}

walkDir(dir);
