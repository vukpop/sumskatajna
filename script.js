/* ==========================================================================
   APARTMAN ŠUMSKA TAJNA - MOKRA GORA
   Client-side Interactivity & Multi-language Script
   ========================================================================== */

// All 38 Apartment Images cataloged for Lightbox
const galleryData = [
  { src: "sumskatajna slike/kuca.jpg", title: "Apartman Šumska Tajna", cat: "eksterijer" },
  { src: "sumskatajna slike/kuca2.jpg", title: "Planinska kuća u prirodi", cat: "eksterijer" },
  { src: "sumskatajna slike/ulaz.jpg", title: "Ulaz u kuću", cat: "eksterijer" },
  { src: "sumskatajna slike/ulaz1.jpg", title: "Prilaz i terasica", cat: "eksterijer" },
  
  { src: "sumskatajna slike/dnevna1.jpg", title: "Prostrana dnevna soba", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna2.jpg", title: "Ugaona garnitura i TV", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna3.jpg", title: "Dnevni boravak - detalj", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna4.jpg", title: "Dnevna soba ugao", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna5.jpg", title: "Topla atmosfera dnevnog boravka", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna6.jpg", title: "Dnevna soba pogled", cat: "dnevna" },
  
  { src: "sumskatajna slike/soba1(1).jpg", title: "Glavna spavaća soba", cat: "sobe" },
  { src: "sumskatajna slike/soba1(2).jpg", title: "Francuski bračni ležaj", cat: "sobe" },
  
  { src: "sumskatajna slike/soba2(1).jpg", title: "Druga spavaća soba", cat: "sobe" },
  { src: "sumskatajna slike/soba2(2).jpg", title: "Udobni ležajevi soba 2", cat: "sobe" },

  { src: "sumskatajna slike/stepenice.jpg", title: "Unutrašnje drveno stepenište", cat: "sobe" },
  { src: "sumskatajna slike/stepenice2.jpg", title: "Stepenište i hodnik", cat: "sobe" },
  
  { src: "sumskatajna slike/kuhinja.jpg", title: "Kompletno opremljena kuhinja", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kuhinja2.jpg", title: "Kuhinjski elementi i šporet", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kuhinja3.jpg", title: "Trpezarijski deo kuhinje", cat: "kuhinja-kupatilo" },
  
  { src: "sumskatajna slike/kupatilo.jpg", title: "Moderno kupatilo", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo2.jpg", title: "Tuš kabina", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo3.jpg", title: "Kupatilski ormarić i lavabo", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo4.jpg", title: "Kupatilo detalji", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo5.jpg", title: "Čisto kupatilo", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo6.jpg", title: "Opremljenost kupatila", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo7.jpg", title: "Pribor i fen", cat: "kuhinja-kupatilo" },
  
  { src: "sumskatajna slike/letnjikovac.jpg", title: "Letnjikovac kraj reke", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac2.jpg", title: "Odmaralište u dvorištu", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac3.jpg", title: "Dvorište i hladovina", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac4.jpg", title: "Pogled na letnjikovac", cat: "eksterijer" },

  { src: "sumskatajna slike/reka.jpg", title: "Čista planinska reka", cat: "reka" },
  { src: "sumskatajna slike/reka1.jpg", title: "Koritom reke pored kuće", cat: "reka" },
  { src: "sumskatajna slike/reka2.jpg", title: "Žubor reke i priroda", cat: "reka" },
  { src: "sumskatajna slike/reka3.jpg", title: "Zeleno okruženje rečice", cat: "reka" }
];

let currentLightboxIndex = 0;
let currentLanguage = 'sr';

// Initialize defaults on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupNavbarScroll();
  setupMobileMenu();
  setupLightboxKeys();
});

// Navbar Scroll Effect
function setupNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Mobile Drawer Toggle
function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

// Room Tabs Switcher
function switchRoomTab(roomKey, btnElem) {
  // Update Tab Buttons
  const buttons = document.querySelectorAll('.tabs-header .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (btnElem) {
    btnElem.classList.add('active');
  } else if (typeof event !== 'undefined' && event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }

  // Update Panes
  const panes = document.querySelectorAll('.room-pane');
  panes.forEach(pane => pane.classList.remove('active'));

  const activePane = document.getElementById(`pane-${roomKey}`);
  if (activePane) {
    activePane.classList.add('active');
  }
}

// Room Thumbnail Switcher
function changeMainImg(roomKey, newSrc, thumbElem) {
  const mainImg = document.getElementById(`mainImg-${roomKey}`);
  if (mainImg) {
    mainImg.style.opacity = 0;
    setTimeout(() => {
      mainImg.src = newSrc;
      mainImg.style.opacity = 1;
    }, 150);
  }

  const thumbs = thumbElem.parentElement.querySelectorAll('.thumb');
  thumbs.forEach(t => t.classList.remove('active'));
  thumbElem.classList.add('active');
}

// Close mobile menu (called from nav-link onclick)
function closeMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.remove('active');
}

// Gallery Filtering
function filterGallery(category) {
  const buttons = document.querySelectorAll('.filter-bar .filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  const cards = document.querySelectorAll('.gallery-grid .gallery-card');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-cat');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
      setTimeout(() => card.style.opacity = '1', 50);
    } else {
      card.style.opacity = '0';
      setTimeout(() => card.style.display = 'none', 300);
    }
  });
}

// Lightbox Logic
function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  if (galleryData[index]) {
    img.src = galleryData[index].src;
    caption.textContent = galleryData[index].title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function changeLightboxImg(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryData.length) % galleryData.length;
  const img = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');

  img.style.opacity = 0;
  setTimeout(() => {
    img.src = galleryData[currentLightboxIndex].src;
    caption.textContent = galleryData[currentLightboxIndex].title;
    img.style.opacity = 1;
  }, 150);
}

function setupLightboxKeys() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (!modal.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxImg(-1);
    if (e.key === 'ArrowRight') changeLightboxImg(1);
  });
}


// FAQ Accordion Toggle
function toggleFaq(headerElem) {
  const item = headerElem.parentElement;
  item.classList.toggle('active');
}

// Language Switcher (SR / EN)
function setLanguage(lang) {
  currentLanguage = lang;
  
  document.getElementById('btnSR').classList.toggle('active', lang === 'sr');
  document.getElementById('btnEN').classList.toggle('active', lang === 'en');

  const translatableElements = document.querySelectorAll('[data-sr]');
  translatableElements.forEach(elem => {
    const text = elem.getAttribute(`data-${lang}`);
    if (text) {
      elem.innerHTML = text;
    }
  });
}

// Toast Notification System
function showToast(msg) {
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  
  if (toast && toastText) {
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}
