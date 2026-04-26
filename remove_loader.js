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

const newScript = `
    // Scroll Animation (Reveal)
    const revealElements = document.querySelectorAll('.feature-box, .about-content, .about-img, .service-card, .district-item, .blog-card, .section-title');
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const revealCallback = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // Sticky Header
    window.addEventListener('scroll', function() {
      const header = document.getElementById('main-header');
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      }
    });
  </script>
</body>`;

for (const file of filesToFix) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Remove Loader HTML
  content = content.replace(/<!-- Page Loader -->[\s\S]*?<\/div>\s*<\/div>\s*/, '');
  
  // Replace old script with new script
  content = content.replace(/<script>\s*\/\/ Page Loader[\s\S]*?<\/body>/, '<script>' + newScript);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed:', file);
}
