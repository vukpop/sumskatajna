/* ==========================================================================
   APARTMAN ŠUMSKA TAJNA - MOKRA GORA
   Client-side Interactivity & Multi-language Script
   ========================================================================== */

// All 38 Apartment Images cataloged for Lightbox
const galleryData = [
  { src: "sumskatajna slike/kuca.jpg", title: "Apartman Šumska Tajna", titleEN: "Apartment Šumska Tajna", cat: "eksterijer" },
  { src: "sumskatajna slike/kuca2.jpg", title: "Planinska kuća u prirodi", titleEN: "Mountain Chalet in Nature", cat: "eksterijer" },
  { src: "sumskatajna slike/ulaz.jpg", title: "Ulaz u kuću", titleEN: "House Entrance", cat: "eksterijer" },
  { src: "sumskatajna slike/ulaz1.jpg", title: "Prilaz i terasica", titleEN: "Approach & Terrace", cat: "eksterijer" },
  
  { src: "sumskatajna slike/dnevna1.jpg", title: "Prostrana dnevna soba", titleEN: "Spacious Living Room", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna2.jpg", title: "Ugaona garnitura i TV", titleEN: "Sofa Lounge & TV", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna3.jpg", title: "Dnevni boravak - detalj", titleEN: "Living Room Detail", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna4.jpg", title: "Dnevna soba ugao", titleEN: "Living Room Corner", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna5.jpg", title: "Topla atmosfera dnevnog boravka", titleEN: "Warm Living Room Atmosphere", cat: "dnevna" },
  { src: "sumskatajna slike/dnevna6.jpg", title: "Dnevna soba pogled", titleEN: "Living Room View", cat: "dnevna" },
  
  { src: "sumskatajna slike/soba1(1).jpg", title: "Glavna spavaća soba", titleEN: "Master Bedroom", cat: "sobe" },
  { src: "sumskatajna slike/soba1(2).jpg", title: "Francuski bračni ležaj", titleEN: "Double King Bed", cat: "sobe" },
  
  { src: "sumskatajna slike/soba2(1).jpg", title: "Druga spavaća soba", titleEN: "Second Bedroom", cat: "sobe" },
  { src: "sumskatajna slike/soba2(2).jpg", title: "Udobni ležajevi soba 2", titleEN: "Cozy Beds Bedroom 2", cat: "sobe" },

  { src: "sumskatajna slike/stepenice.jpg", title: "Unutrašnje drveno stepenište", titleEN: "Interior Wooden Staircase", cat: "sobe" },
  { src: "sumskatajna slike/stepenice2.jpg", title: "Stepenište i hodnik", titleEN: "Staircase & Hallway", cat: "sobe" },
  
  { src: "sumskatajna slike/kuhinja.jpg", title: "Kompletno opremljena kuhinja", titleEN: "Fully Equipped Kitchen", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kuhinja2.jpg", title: "Kuhinjski elementi i šporet", titleEN: "Kitchen Cabinets & Stove", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kuhinja3.jpg", title: "Trpezarijski deo kuhinje", titleEN: "Dining Area", cat: "kuhinja-kupatilo" },
  
  { src: "sumskatajna slike/kupatilo.jpg", title: "Moderno kupatilo", titleEN: "Modern Bathroom", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo2.jpg", title: "Tuš kabina", titleEN: "Shower Cabin", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo3.jpg", title: "Kupatilski ormarić i lavabo", titleEN: "Bathroom Vanity & Sink", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo4.jpg", title: "Kupatilo detalji", titleEN: "Bathroom Details", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo5.jpg", title: "Čisto kupatilo", titleEN: "Clean Bathroom", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo6.jpg", title: "Opremljenost kupatila", titleEN: "Bathroom Amenities", cat: "kuhinja-kupatilo" },
  { src: "sumskatajna slike/kupatilo7.jpg", title: "Pribor i fen", titleEN: "Toiletries & Hairdryer", cat: "kuhinja-kupatilo" },
  
  { src: "sumskatajna slike/letnjikovac.jpg", title: "Letnjikovac kraj reke", titleEN: "Gazebo by the River", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac2.jpg", title: "Odmaralište u dvorištu", titleEN: "Outdoor Yard Seating", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac3.jpg", title: "Dvorište i hladovina", titleEN: "Shaded Yard Area", cat: "eksterijer" },
  { src: "sumskatajna slike/letnjikovac4.jpg", title: "Pogled na letnjikovac", titleEN: "View of the Gazebo", cat: "eksterijer" },

  { src: "sumskatajna slike/reka.jpg", title: "Čista planinska reka", titleEN: "Clean Mountain River", cat: "reka" },
  { src: "sumskatajna slike/reka1.jpg", title: "Koritom reke pored kuće", titleEN: "Riverbed Next to the House", cat: "reka" },
  { src: "sumskatajna slike/reka2.jpg", title: "Žubor reke i priroda", titleEN: "Rushing River & Nature", cat: "reka" },
  { src: "sumskatajna slike/reka3.jpg", title: "Zeleno okruženje rečice", titleEN: "Lush River Surroundings", cat: "reka" }
];

let currentLightboxIndex = 0;
let currentLanguage = 'sr';

// Initialize defaults on DOM load
document.addEventListener('DOMContentLoaded', () => {
  setupNavbarScroll();
  setupMobileMenu();
  setupLightboxKeys();
  setupLazyMap();
});

// Deferred Google Map Lazy Loading for Speed & Performance
function setupLazyMap() {
  const mapWrapper = document.getElementById('mapWrapper');
  if (!mapWrapper) return;

  const iframe = mapWrapper.querySelector('iframe');
  if (!iframe) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
          }
          observer.unobserve(mapWrapper);
        }
      });
    }, { rootMargin: '300px' });

    observer.observe(mapWrapper);
  } else {
    if (iframe.dataset.src) iframe.src = iframe.dataset.src;
  }
}

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

// Close mobile menu (called from nav-link onclick)
function closeMenu() {
  const navMenu = document.getElementById('navMenu');
  if (navMenu) navMenu.classList.remove('active');
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
let lbTouchStartX = 0;

function openLightbox(index) {
  currentLightboxIndex = index;
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  _lbLoadImage(index);
  _lbSetupSwipe(modal);
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function lightboxBackdropClick(e) {
  if (e.target === document.getElementById('lightboxModal')) {
    closeLightbox();
  }
}

function changeLightboxImg(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + galleryData.length) % galleryData.length;
  _lbLoadImage(currentLightboxIndex);
}

function _lbLoadImage(index) {
  const img     = document.getElementById('lightboxImg');
  const caption = document.getElementById('lightboxCaption');
  const counter = document.getElementById('lightboxCounter');
  const spinner = document.getElementById('lightboxSpinner');
  const data    = galleryData[index];
  if (!data) return;

  // Show spinner, fade out current image
  img.classList.add('fading');
  spinner.classList.add('visible');

  // Update counter immediately
  if (counter) counter.textContent = `${index + 1} / ${galleryData.length}`;

  const newImg = new Image();
  newImg.src = data.src;
  newImg.onload = () => {
    img.src = data.src;
    img.alt = data.title;
    caption.textContent = currentLanguage === 'en'
      ? (data.titleEN || data.title)
      : data.title;

    spinner.classList.remove('visible');
    img.classList.remove('fading');
  };
  newImg.onerror = () => {
    spinner.classList.remove('visible');
    img.classList.remove('fading');
  };
}

function _lbSetupSwipe(modal) {
  // Prevent duplicate listeners
  if (modal._swipeReady) return;
  modal._swipeReady = true;

  modal.addEventListener('touchstart', (e) => {
    lbTouchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - lbTouchStartX;
    if (Math.abs(dx) > 50) {
      changeLightboxImg(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}

function setupLightboxKeys() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightboxModal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  changeLightboxImg(-1);
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
  
  const allLangBtns = document.querySelectorAll('.lang-btn');
  allLangBtns.forEach(btn => {
    const isSr = btn.id.toLowerCase().includes('sr') || btn.textContent.trim() === 'SR';
    if ((lang === 'sr' && isSr) || (lang === 'en' && !isSr)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

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
