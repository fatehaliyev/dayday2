const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\fateh\\OneDrive\\Desktop\\Halikoltukyikama\\public';

const filesToFix = [
  'hakkimizda.html',
  'hizmetler.html',
  'blog.html',
  'iletisim.html',
  'blog-detail.html',
  'blog-1-leke-cikarma.html',
  'blog-2-yanlis-hali-yikama.html',
  'blog-3-evcil-hayvan-lekesi.html',
  'blog-4-hali-yikama-sikligi.html',
  'blog-5-derinlemesine-temizlik.html',
  'blog-6-hali-kokusu.html',
  'blog-7-bakteri-ve-akar.html',
  'blog-8-kuyu-suyu-ile-hali-yikama.html',
  'blog-9-makine-hali-yikama.html',
  'blog-10-profesyonel-hali-yikama.html',
  'blog-11-sicak-su-ile-hali-yikama.html',
  'blog-12-sampuan-secimi.html'
];

for (const file of filesToFix) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove the header-top element block
  content = content.replace(/<div class="header-top">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed header-top in:', file);
}
