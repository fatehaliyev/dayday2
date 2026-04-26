const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\fateh\\OneDrive\\Desktop\\Halikoltukyikama\\public';

const indexHtml = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const loaderRegex = /<!-- Page Loader -->[\s\S]*?<\/div>\s*<\/div>/;
const headerRegex = /<!-- Classic Premium Header -->[\s\S]*?<\/header>/;
const footerRegex = /<!-- Classic Footer -->[\s\S]*?<\/footer>/;
const fabRegex = /<!-- Floating Contact Buttons -->[\s\S]*?<\/div>\s*<\/div>/;
const scriptRegex = /<script>[\s\S]*?<\/script>\s*<\/body>/;

const newLoader = indexHtml.match(loaderRegex)[0];
const newHeader = indexHtml.match(headerRegex)[0];
const newFooter = indexHtml.match(footerRegex)[0];
const newFab = indexHtml.match(fabRegex)[0];
const newScript = indexHtml.match(scriptRegex)[0];

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract district name from filename, e.g., "avcilar-hali-yikama.html" -> "Avcılar"
  const baseName = path.basename(filePath, '.html');
  const districtNameRaw = baseName.replace('-hali-yikama', '').replace(/-/g, ' ');
  
  // Turkish char map for capitalization
  const trMap = {
    'c': 'ç', 's': 'ş', 'g': 'ğ', 'u': 'ü', 'o': 'ö', 'i': 'ı'
  };
  
  // Basic fix for district names
  let districtName = toTitleCase(districtNameRaw);
  if(districtName.toLowerCase() === 'avcilar') districtName = 'Avcılar';
  if(districtName.toLowerCase() === 'bagcilar') districtName = 'Bağcılar';
  if(districtName.toLowerCase() === 'bahcelievler') districtName = 'Bahçelievler';
  if(districtName.toLowerCase() === 'bakirkoy') districtName = 'Bakırköy';
  if(districtName.toLowerCase() === 'basaksehir') districtName = 'Başakşehir';
  if(districtName.toLowerCase() === 'bayrampasa') districtName = 'Bayrampaşa';
  if(districtName.toLowerCase() === 'besiktas') districtName = 'Beşiktaş';
  if(districtName.toLowerCase() === 'beylikduzu') districtName = 'Beylikdüzü';
  if(districtName.toLowerCase() === 'beyoglu') districtName = 'Beyoğlu';
  if(districtName.toLowerCase() === 'buyukcekmece') districtName = 'Büyükçekmece';
  if(districtName.toLowerCase() === 'catalca') districtName = 'Çatalca';
  if(districtName.toLowerCase() === 'eyup') districtName = 'Eyüp';
  if(districtName.toLowerCase() === 'fatih') districtName = 'Fatih';
  if(districtName.toLowerCase() === 'gaziosmanpasa') districtName = 'Gaziosmanpaşa';
  if(districtName.toLowerCase() === 'gungoren') districtName = 'Güngören';
  if(districtName.toLowerCase() === 'kagithane') districtName = 'Kağıthane';
  if(districtName.toLowerCase() === 'kucukcekmece') districtName = 'Küçükçekmece';
  if(districtName.toLowerCase() === 'sisli') districtName = 'Şişli';
  if(districtName.toLowerCase() === 'zeytinburnu') districtName = 'Zeytinburnu';

  const newBodyContent = `
<body>

  ${newLoader}

  ${newHeader}

  <main>
    <div class="page-header">
      <div class="container">
        <h1>${districtName} Halı Yıkama</h1>
        <p>${districtName} ve çevresi için profesyonel, hızlı ve güvenilir temizlik hizmetleri.</p>
      </div>
    </div>

    <!-- About Section -->
    <section class="about">
      <div class="container about-wrapper">
        <div class="about-content" style="flex: 1;">
          <div class="section-title" style="text-align: left; margin-bottom: 20px;">
            <span>Hizmet Kalitesi</span>
            <h2>${districtName} Bölgesinde Güvenilir Temizlik</h2>
          </div>
          <p>${districtName} bölgesinde halı, koltuk, stor perde ve yatak yıkama hizmetlerimizi ürün tipine uygun makine ve temizlik ürünleriyle gerçekleştiriyoruz. ${districtName} halı yıkama taleplerinizde hijyen, hızlı teslimat ve müşteri memnuniyeti önceliğimizdir.</p>
          <ul class="about-list" style="margin-top: 20px;">
            <li><i class="fas fa-truck"></i> Ücretsiz Adresten Alım ve Teslimat</li>
            <li><i class="fas fa-leaf"></i> %100 Bitkisel ve Organik Şampuanlar</li>
            <li><i class="fas fa-check-circle"></i> Garantili Leke Çıkarma İşlemleri</li>
          </ul>
        </div>
        <div class="about-img" style="flex: 1;">
          <img src="assets/images/photo-2.jpg" alt="${districtName} Halı Yıkama" style="border-radius: var(--radius); box-shadow: var(--shadow-md);">
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services">
      <div class="container">
        <div class="section-title">
          <span>Hizmetlerimiz</span>
          <h2>Size Neler Sunuyoruz?</h2>
        </div>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-rug"></i></div>
            <h3>Halı Yıkama</h3>
            <p>Halılarınız türüne göre ayrıştırılarak tam otomatik makinelerde yıkanır.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-couch"></i></div>
            <h3>Koltuk Yıkama</h3>
            <p>Evinizde yüksek vakumlu makinelerle derinlemesine koltuk temizliği.</p>
          </div>
          <div class="service-card">
            <div class="service-icon"><i class="fas fa-bed"></i></div>
            <h3>Yatak Yıkama</h3>
            <p>Yataklarınızdaki toz akarları ve lekeler profesyonel yöntemlerle yok edilir.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${newFab}

  ${newFooter}

  ${newScript}
`;

  // Replace everything between <body> and </body>
  const newHtml = content.replace(/<body>[\s\S]*<\/body>/, newBodyContent);
  
  // Update Meta Title and Description if they look weird
  let finalHtml = newHtml;
  finalHtml = finalHtml.replace(/<title>.*?<\/title>/, `<title>${districtName} Halı Yıkama | Halı Koltuk Yıkama</title>`);
  finalHtml = finalHtml.replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${districtName} halı yıkama hizmetleri. ${districtName} bölgesinde profesyonel halı, koltuk, yatak ve perde temizliği.">`);

  fs.writeFileSync(filePath, finalHtml, 'utf8');
  console.log('District layout standardized for', filePath);
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    if (!fs.statSync(fullPath).isDirectory() && file.endsWith('-hali-yikama.html')) {
      processFile(fullPath);
    }
  }
}

walkDir(dir);
