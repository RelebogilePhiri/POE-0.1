/* main_enhanced.js — Interactive Enhancements for Phiri's Whiskful Treats
   Features:
   - Dark/Light Mode Toggle (neutral color for dark mode)
   - Accordion for FAQ or info sections
   - Animated Tabs
   - Modal Popup
   - Image Gallery with Lightbox
   - Dynamic Content Loading (latest posts or specials)
   - Smooth animations and transitions
   - Uses basic jQuery for simplicity
*/

document.addEventListener("DOMContentLoaded", () => {
  console.log("✨ Phiri's Whiskful Treats enhancements active!");

  /* ------------------ 1. DARK/LIGHT MODE TOGGLE ------------------ */
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "theme-toggle";
  toggleBtn.textContent = "🌙 Toggle Theme";
  toggleBtn.setAttribute("aria-label", "Toggle theme");
  toggleBtn.style.cssText = "position:fixed;bottom:1rem;right:1rem;padding:8px 14px;border:none;border-radius:20px;cursor:pointer;z-index:999;";
  document.body.appendChild(toggleBtn);

  const applyTheme = (theme) => {
    document.body.classList.toggle("dark-theme", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  toggleBtn.addEventListener("click", () => {
    const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
    applyTheme(newTheme);
  });

  // Style for dark theme
  const darkStyle = document.createElement("style");
  darkStyle.textContent = `
    body.dark-theme {
      background-color: #e6d7c3;
      color: #3a2f25;
      transition: background 0.4s ease, color 0.4s ease;
    }
    body.dark-theme header, body.dark-theme footer {
      background-color: #d4bfa7;
    }
  `;
  document.head.appendChild(darkStyle);

  /* ------------------ 2. GALLERY LIGHTBOX ------------------ */
  const gallery = document.querySelectorAll(".gallery img");
  let lastFocused = null;
  if (gallery.length > 0) {
    const overlay = document.createElement("div");
    overlay.id = "lightbox-overlay";
    overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:9999;";
    overlay.innerHTML = `
      <button id="close-overlay" style="position:absolute;top:1rem;right:1rem;font-size:1.5rem;background:none;color:white;border:none;cursor:pointer;">✖</button>
      <img id="overlay-img" style="max-width:90%;max-height:85%;border-radius:12px;box-shadow:0 0 20px rgba(0,0,0,0.6)">
    `;
    document.body.appendChild(overlay);
    const overlayImg = overlay.querySelector("#overlay-img");
    const closeBtn = overlay.querySelector("#close-overlay");

    gallery.forEach((img) => {
      img.style.cursor = "pointer";
      img.addEventListener("click", () => {
        lastFocused = document.activeElement;
        overlayImg.src = img.src;
        overlay.style.display = "flex";
        closeBtn.focus();
      });
    });

    const closeOverlay = () => {
      overlay.style.display = "none";
      if (lastFocused) lastFocused.focus();
    };
    closeBtn.addEventListener("click", closeOverlay);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeOverlay();
    });
  }

  /* ------------------ 3. DEBOUNCED SEARCH ------------------ */
  function debounce(fn, delay = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  const navSearch = document.getElementById("nav-search");
  const filterContent = (q) => {
    document.querySelectorAll(".product-card").forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  };
  if (navSearch) {
    navSearch.addEventListener("input", debounce((e) => {
      filterContent(e.target.value.toLowerCase());
    }, 300));
  }

  /* ------------------ 4. LAZY-LOADING IMAGES ------------------ */
  function initLazyImages(selector = "img[data-src]") {
    const imgs = document.querySelectorAll(selector);
    if ("IntersectionObserver" in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(ent => {
          if (!ent.isIntersecting) return;
          const img = ent.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        });
      }, { rootMargin: "200px" });
      imgs.forEach(img => obs.observe(img));
    } else {
      imgs.forEach(img => (img.src = img.dataset.src));
    }
  }
  initLazyImages();

  /* ------------------ 5. DYNAMIC POSTS (mock content) ------------------ */
  const postsContainer = document.getElementById("posts-list");
  if (postsContainer) {
    const posts = [
      { title: "New Pastry Line!", content: "Try our flaky butter croissants 🍰" },
      { title: "Holiday Specials", content: "Festive cakes available now!" },
      { title: "Baker's Tips", content: "Secrets behind our perfect sponge!" },
    ];
    posts.forEach(p => {
      const item = document.createElement("li");
      item.innerHTML = `<strong>${p.title}</strong> — ${p.content}`;
      postsContainer.appendChild(item);
    });
  }

  /* ------------------ 6. SEO JSON-LD SCHEMA ------------------ */
  (function injectJSONLD() {
    const ld = {
      "@context": "https://schema.org",
      "@type": "Bakery",
      "name": "Phiri's Whiskful Treats",
      "url": window.location.origin,
      "description": "A cozy bakery offering cakes, pastries and catering in South Africa.",
      "telephone": "+27-81-327-5815",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bloomfield Gardens",
        "addressCountry": "ZA"
      }
    };
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.text = JSON.stringify(ld);
    document.head.appendChild(s);
  })();

  /* ------------------ 7. FORM VALIDATION ------------------ */
  (function initFormValidation() {
    const form = document.getElementById("enquiry-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      const hp = form.querySelector('input[name="hp"]');
      if (hp && hp.value.trim() !== "") {
        e.preventDefault();
        return;
      }
      const email = form.querySelector('input[type="email"]');
      if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        email.focus();
      }
    });
  })();

  /* ------------------ 8. SERVICE WORKER ------------------ */
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
      .then(reg => console.log("Service Worker registered:", reg.scope))
      .catch(err => console.warn("SW registration failed:", err));
  }

  /* ------------------ 9. ACCESSIBILITY: SKIP LINK ------------------ */
  (function addSkipLink() {
    const skip = document.createElement("a");
    skip.href = "#maincontent";
    skip.className = "skip-link";
    skip.textContent = "Skip to main content";
    skip.style.cssText = "position:absolute;left:-999px;top:auto;background:#fff;padding:8px;border-radius:6px;z-index:9999;";
    skip.addEventListener("focus", () => skip.style.left = "8px");
    skip.addEventListener("blur", () => skip.style.left = "-999px");
    document.body.insertBefore(skip, document.body.firstChild);
    const main = document.querySelector(".container");
    if (main) main.id = "maincontent";
  })();

  /* ------------------ 10. ANALYTICS TRACKER ------------------ */
  function trackEvent(category, action, label) {
    console.info("TRACK_EVENT", { category, action, label, time: new Date().toISOString() });
  }
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a, [data-track]");
    if (t) trackEvent("ui", "click", t.getAttribute("data-track") || t.textContent.trim());
  });

  /* ------------------ 11. OPTIONAL MAP (Leaflet ready) ------------------ */
  function initMap(lat = -26.2041, lng = 28.0473) {
    if (typeof L === "undefined") return;
    const mapEl = document.getElementById("map");
    if (!mapEl) return;
    const map = L.map(mapEl).setView([lat, lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);
    L.marker([lat, lng]).addTo(map).bindPopup("Phiri's Whiskful Treats").openPopup();
  }
  if (document.getElementById("map")) initMap();

  /* ------------------ 12. PRODUCT CAROUSEL ------------------ */
  function createCarousel() {
    const featured = document.querySelector('.featured .cards');
    if (!featured) return;

    const cards = featured.querySelectorAll('.card');
    let currentIndex = 0;

    // Add navigation buttons
    const nav = document.createElement('div');
    nav.className = 'carousel-nav';
    nav.innerHTML = `
      <button class="prev" aria-label="Previous">←</button>
      <button class="next" aria-label="Next">→</button>
    `;
    featured.parentElement.appendChild(nav);

    // Add indicators
    const indicators = document.createElement('div');
    indicators.className = 'carousel-indicators';
    for (let i = 0; i < cards.length; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.dataset.index = i;
      indicators.appendChild(dot);
    }
    featured.parentElement.appendChild(indicators);

    // Navigation functions
    function showSlide(index) {
      const offset = index * -100;
      featured.style.transform = `translateX(${offset}%)`;
      currentIndex = index;
      
      // Update indicators
      indicators.querySelectorAll('button').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      // Update button states
      nav.querySelector('.prev').disabled = index === 0;
      nav.querySelector('.next').disabled = index === cards.length - 1;
    }

    // Event listeners
    nav.querySelector('.prev').addEventListener('click', () => {
      if (currentIndex > 0) showSlide(currentIndex - 1);
    });

    nav.querySelector('.next').addEventListener('click', () => {
      if (currentIndex < cards.length - 1) showSlide(currentIndex + 1);
    });

    indicators.querySelectorAll('button').forEach(dot => {
      dot.addEventListener('click', () => {
        showSlide(parseInt(dot.dataset.index));
      });
    });

    // Initialize
    featured.style.display = 'flex';
    featured.style.transition = 'transform 0.4s ease';
    cards.forEach(card => card.style.flex = '0 0 100%');
    showSlide(0);

    // Add swipe support for mobile
    let touchStartX = 0;
    featured.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    });

    featured.addEventListener('touchend', e => {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEnd;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && currentIndex < cards.length - 1) {
          showSlide(currentIndex + 1);
        } else if (diff < 0 && currentIndex > 0) {
          showSlide(currentIndex - 1);
        }
      }
    });
  }

  /* ------------------ 13. FLOATING ACTION MENU ------------------ */
  function createFloatingMenu() {
    const menu = document.createElement('div');
    menu.className = 'floating-menu';
    menu.innerHTML = `
      <button class="menu-toggle" aria-label="Toggle quick menu">+</button>
      <div class="menu-items">
        <a href="cakes.html" class="menu-item" data-tooltip="View our cakes">🎂</a>
        <a href="cookies.html" class="menu-item" data-tooltip="Check cookies">🍪</a>
        <a href="enquiry.html" class="menu-item" data-tooltip="Make an enquiry">📝</a>
        <button class="menu-item scroll-top" data-tooltip="Scroll to top">⬆️</button>
      </div>
    `;
    document.body.appendChild(menu);

    const toggle = menu.querySelector('.menu-toggle');
    const items = menu.querySelector('.menu-items');
    let isOpen = false;

    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      menu.classList.toggle('open', isOpen);
      toggle.textContent = isOpen ? '×' : '+';
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Scroll to top functionality
    menu.querySelector('.scroll-top').addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Hide menu when clicking outside
    document.addEventListener('click', e => {
      if (!menu.contains(e.target) && isOpen) {
        toggle.click();
      }
    });
  }

  /* ------------------ 14. PRODUCT QUICK VIEW ------------------ */
  function setupQuickView() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const quickViewBtn = document.createElement('button');
      quickViewBtn.className = 'quick-view-btn';
      quickViewBtn.textContent = '🔍 Quick View';
      card.appendChild(quickViewBtn);

      quickViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productInfo = {
          title: card.querySelector('h3').textContent,
          image: card.querySelector('img').src,
          description: card.querySelector('p').textContent
        };
        showQuickViewModal(productInfo);
      });
    });
  }

  function showQuickViewModal(product) {
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <button class="close-modal">×</button>
        <div class="product-preview">
          <img src="${product.image}" alt="${product.title}">
          <div class="product-info">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="actions">
              <button class="add-to-favorites">❤️ Save</button>
              <a href="enquiry.html" class="enquire-now">📝 Enquire</a>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Animation
    requestAnimationFrame(() => {
      modal.classList.add('show');
    });

    // Close handlers
    const closeModal = () => {
      modal.classList.remove('show');
      setTimeout(() => modal.remove(), 300);
    };

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });

    // Favorites functionality
    modal.querySelector('.add-to-favorites').addEventListener('click', function() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const isAlreadyFavorite = favorites.some(fav => fav.title === product.title);
      
      if (!isAlreadyFavorite) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.textContent = '❤️ Saved!';
        this.disabled = true;
        showToast('Added to favorites! 💖');
      }
    });
  }

  /* ------------------ 15. PAGE TRANSITIONS ------------------ */
  function setupPageTransitions() {
    const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"])');
    links.forEach(link => {
      link.addEventListener('click', e => {
        if (link.pathname === window.location.pathname) return;
        
        e.preventDefault();
        document.body.classList.add('page-transition');
        
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      });
    });
  }

  /* ------------------ Initialize New Features ------------------ */
  createCarousel();
  createFloatingMenu();
  setupQuickView();
  setupPageTransitions();

  // Add necessary styles
  const additionalStyles = `
    /* Carousel Styles */
    .featured .cards {
      overflow: hidden;
      position: relative;
    }
    .carousel-nav {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
    .carousel-nav button {
      background: #f4d7c7;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
    }
    .carousel-indicators {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }
    .carousel-indicators button {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background: #ddd;
      cursor: pointer;
    }
    .carousel-indicators button.active {
      background: #f4d7c7;
    }

    /* Floating Menu */
    .floating-menu {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 1000;
    }
    .menu-toggle {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #f4d7c7;
      border: none;
      font-size: 24px;
      cursor: pointer;
      transition: transform 0.3s ease;
    }
    .menu-items {
      position: absolute;
      bottom: 60px;
      right: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      pointer-events: none;
    }
    .floating-menu.open .menu-items {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
    .menu-item {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      position: relative;
    }
    .menu-item[data-tooltip]:hover:before {
      content: attr(data-tooltip);
      position: absolute;
      right: 100%;
      margin-right: 10px;
      background: #333;
      color: white;
      padding: 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    /* Quick View */
    .quick-view-btn {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(255,255,255,0.9);
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .card:hover .quick-view-btn {
      opacity: 1;
    }
    .quick-view-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .quick-view-modal.show {
      opacity: 1;
    }
    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      max-width: 90%;
      width: 600px;
      position: relative;
      transform: translateY(20px);
      transition: transform 0.3s ease;
    }
    .quick-view-modal.show .modal-content {
      transform: translateY(0);
    }
    .close-modal {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .product-preview {
      display: flex;
      gap: 2rem;
    }
    .product-preview img {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }

    /* Page Transitions */
    .page-transition {
      animation: fadeOut 0.3s ease forwards;
    }
    @keyframes fadeOut {
      to { opacity: 0; }
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
});
 
//-- Enqyiry.html -->

// ------------------ Enquiry page enhancements ------------------
document.addEventListener('DOMContentLoaded', () => {
  try {
    const form = document.querySelector('#enquiry-form');
    if (!form) return;

    // Simple toast helper
    function toast(msg, ms = 3000) {
      let t = document.getElementById('pwt-toast');
      if (!t) { t = document.createElement('div'); t.id = 'pwt-toast'; document.body.appendChild(t); Object.assign(t.style, { position: 'fixed', right: '16px', bottom: '16px', background: '#fff', padding: '10px 14px', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', zIndex: 10050 }); }
      t.textContent = msg; t.style.opacity = '1';
      clearTimeout(t._hide);
      t._hide = setTimeout(() => { t.style.opacity = '0'; }, ms);
    }

    const FORM_KEY = 'pwt_enquiry_draft';

    // Restore draft if available
    const saved = localStorage.getItem(FORM_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        Object.keys(data).forEach(k => {
          const el = form.elements[k];
          if (!el) return;
          try { el.value = data[k]; } catch (e) {}
        });
        toast('Restored your saved enquiry draft');
      } catch (e) { console.warn('Failed to restore draft', e); }
    }

    // Auto-save on changes (debounced)
    let saveTimer = null;
    function autosave() {
      const payload = {};
      Array.from(form.elements).forEach(el => {
        if (!el.name) return;
        if (el.type === 'submit' || el.type === 'button' || el.type === 'file') return;
        payload[el.name] = el.value;
      });
      localStorage.setItem(FORM_KEY, JSON.stringify(payload));
    }
    form.addEventListener('input', () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(autosave, 700);
      form.dataset.dirty = '1';
    });

    // Set date inputs' min to today
    const today = new Date();
    const isoMin = today.toISOString().split('T')[0];
    form.querySelectorAll('input[type="date"]').forEach(d => d.setAttribute('min', isoMin));

    // Honeypot field: create if missing (hidden to users but bots may fill)
    let hp = form.querySelector('input[name="hp"]');
    if (!hp) {
      hp = document.createElement('input'); hp.type = 'text'; hp.name = 'hp'; hp.tabIndex = -1; hp.autocomplete = 'off'; hp.style.cssText = 'position:absolute;left:-9999px;opacity:0;'; form.appendChild(hp);
    }

    // Enhanced submit handler
    form.addEventListener('submit', (e) => {
      // Honeypot check
      if (hp && hp.value.trim() !== '') {
        e.preventDefault();
        toast('Spam detected — submission blocked');
        return;
      }

      // Basic validation for required fields
      const required = Array.from(form.querySelectorAll('[required]'));
      for (const r of required) {
        if (!r.value || r.value.trim() === '') {
          e.preventDefault();
          r.focus();
          toast('Please complete all required fields');
          return;
        }
      }

      // Email validation if present
      const email = form.querySelector('input[type="email"]');
      if (email && email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
        e.preventDefault();
        email.focus();
        toast('Please enter a valid email address');
        return;
      }

      // At this point, proceed — clear draft
      localStorage.removeItem(FORM_KEY);
      form.dataset.dirty = '0';
      toast('Enquiry submitted — thank you!');
      // allow natural submit to proceed
    });

    // Warn on unload if form has unsaved changes
    window.addEventListener('beforeunload', (ev) => {
      if (form.dataset.dirty === '1') {
        const confirmationMessage = 'You have unsaved changes in your enquiry. Are you sure you want to leave?';
        (ev || window.event).returnValue = confirmationMessage; // Gecko + IE
        return confirmationMessage; // Webkit, Chrome
      }
    });

    // Small UX: clear draft button (if form has space for controls)
    const controls = document.createElement('div');
    controls.style.cssText = 'display:flex;gap:8px;margin-top:8px';
    const clearBtn = document.createElement('button'); clearBtn.type = 'button'; clearBtn.textContent = 'Clear draft';
    clearBtn.addEventListener('click', () => { localStorage.removeItem(FORM_KEY); form.reset(); form.dataset.dirty = '0'; toast('Draft cleared'); });
    form.appendChild(controls); controls.appendChild(clearBtn);

  } catch (err) {
    console.error('Enquiry enhancements failed', err);
  }
});

/* ============================================================
   Cakes page enhancements (cards interactivity, lightbox, search, offers, accordion, load-more)
   This block is defensive: it checks for elements before operating and won't error if absent.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. PRODUCT INTERACTIVITY – CARDS, ANIMATIONS, HOVER EFFECTS
    const cards = document.querySelectorAll(".product-card");
    if (cards && cards.length) {
      cards.forEach(card => {
        // Add smooth hover animation
        card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";

        card.addEventListener("mouseenter", () => {
          card.style.transform = "scale(1.05)";
          card.style.boxShadow = "0px 8px 20px rgba(0,0,0,0.2)";
        });

        card.addEventListener("mouseleave", () => {
          card.style.transform = "scale(1)";
          card.style.boxShadow = "none";
        });
      });
    }

    // 2. LIGHTBOX IMAGE VIEWER (Click to enlarge images)
    document.addEventListener("click", (e) => {
      const img = e.target;
      if (img && img.tagName === "IMG" && img.closest('.product-card')) {
        openLightbox(img.src, img.alt);
      }
    });

    function openLightbox(src, alt) {
      // remove existing overlay first
      const existing = document.getElementById('pwt-cakes-lightbox');
      if (existing) existing.remove();

      const overlay = document.createElement("div");
      overlay.id = "pwt-cakes-lightbox";
      overlay.style.position = "fixed";
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = "100%";
      overlay.style.height = "100%";
      overlay.style.background = "rgba(0,0,0,0.85)";
      overlay.style.display = "flex";
      overlay.style.alignItems = "center";
      overlay.style.justifyContent = "center";
      overlay.style.cursor = "zoom-out";
      overlay.style.zIndex = "99999";

      const img = document.createElement("img");
      img.src = src;
      img.alt = alt || "Cake image";
      img.style.maxWidth = "90%";
      img.style.maxHeight = "90%";
      img.style.borderRadius = "10px";
      img.style.boxShadow = "0 0 20px rgba(255,255,255,0.5)";

      overlay.appendChild(img);
      document.body.appendChild(overlay);

      overlay.addEventListener("click", () => overlay.remove());
    }

    // 3. PRODUCT SEARCH & FILTER FUNCTIONALITY
    const mainEl = document.querySelector("main");
    const productGrid = document.querySelector('.product-grid');
    if (mainEl && productGrid) {
      // avoid inserting multiple times
      if (!document.querySelector('.product-search')) {
        const searchInput = document.createElement("input");
        searchInput.placeholder = "Search cakes...";
        searchInput.className = "product-search";
        Object.assign(searchInput.style, { padding: '8px 12px', margin: '8px 0', width: '100%', maxWidth: '420px', boxSizing: 'border-box' });

        mainEl.insertBefore(searchInput, productGrid);

        searchInput.addEventListener("input", function () {
          const filter = this.value.toLowerCase();
          const cards = document.querySelectorAll(".product-card");

          cards.forEach(card => {
            const titleEl = card.querySelector("h3");
            const title = titleEl ? titleEl.innerText.toLowerCase() : card.textContent.toLowerCase();
            card.style.display = title.includes(filter) ? "block" : "none";
          });
        });
      }
    }

    // 4. DYNAMIC CONTENT LOADING – Example: Load offers via JS
    const offers = [
      { title: "🍪 Free Cookies!", desc: "Buy any cake above R300 and get 6 cookies free." },
      { title: "🎂 Birthday Deal", desc: "10% off all birthday cakes this month!" },
      { title: "🧁 Cupcake Bundle", desc: "Buy 2 dozen cupcakes, get 1 dozen free." }
    ];

    const offersContainer = document.querySelector(".offers-grid");
    if (offersContainer) {
      offersContainer.innerHTML = ""; // Clear HTML to insert dynamically

      offers.forEach(offer => {
        const card = document.createElement("div");
        card.classList.add("offer-card");
        card.innerHTML = `
          <h3>${offer.title}</h3>
          <p>${offer.desc}</p>
        `;
        offersContainer.appendChild(card);
      });
    }

    // 5. SEO ENHANCEMENTS – Dynamic Title / Meta Updates
    try { document.title = "Cakes | Phiri’s Whiskful Treats – Fresh, Custom Cakes"; } catch (e) {}

    // Ensure all images have proper alt text
    document.querySelectorAll("img").forEach((imgEl, index) => {
      if (!imgEl.alt || imgEl.alt.trim() === "") {
        imgEl.alt = `Product Image ${index + 1} from Phiri's Whiskful Treats`;
      }
    });

    // 6. ACCORDION SECTION (for FAQs or Offers – optional)
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    if (accordionHeaders && accordionHeaders.length) {
      accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
          header.classList.toggle("active");
          const content = header.nextElementSibling;
          if (!content) return;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      });
    }

    // 7. AJAX LOADING EXAMPLE (Load more cakes dynamically)
    if (mainEl && productGrid && !document.querySelector('.load-more-btn')) {
      const loadMoreBtn = document.createElement("button");
      loadMoreBtn.innerText = "Load More Cakes";
      loadMoreBtn.className = "load-more-btn";
      Object.assign(loadMoreBtn.style, { display: 'block', marginTop: '14px', padding: '10px 14px', cursor: 'pointer' });

      mainEl.appendChild(loadMoreBtn);

      loadMoreBtn.addEventListener("click", () => {
        // try to fetch a local JSON file if present; otherwise show a toast
        fetch("more-cakes.json")
          .then(res => {
            if (!res.ok) throw new Error('not found');
            return res.json();
          })
          .then(data => {
            const grid = document.querySelector(".product-grid");
            data.forEach(cake => {
              const card = document.createElement("div");
              card.classList.add("product-card");
              card.innerHTML = `
                <img src="${cake.image}" alt="${cake.name}">
                <div class="product-info">
                  <h3>${cake.name}</h3>
                  <p>${cake.description}</p>
                  <span class="price">${cake.price}</span>
                  <a href="Enquiry.html" class="order-btn">Order Now</a>
                </div>
              `;
              grid.appendChild(card);
            });
          })
          .catch(err => {
            console.log("Error loading cakes:", err);
            // gentle user feedback (toast) if available
            const t = document.getElementById('pwt-toast');
            if (t) { t.textContent = 'No additional cakes file found (more-cakes.json).'; setTimeout(()=>t.textContent='',3000); }
          });
      });
    }

  } catch (err) {
    console.error('Cakes enhancements failed', err);
  }
});
 ///--- Cookies.html -->
 // ----------------------------------------------------
// COOKIE PRODUCT DATA (Dynamic Content)
// ----------------------------------------------------
const cookies = [
  {
    name: "Chocolate Chip Cookies 🍫",
    description: "Golden cookies loaded with gooey chocolate chips. Crispy outside, chewy inside – pure bliss!",
    price: "R60 (6 pack)",
    image: "../Images/POE pics/chococolate chip cookie.webp"
  },
  {
    name: "Oat & Raisin Cookies 🌾",
    description: "Soft cookies with plump raisins and cinnamon.",
    price: "R55 (6 pack)",
    image: "../Images/POE pics/Oat and Raisin.webp"
  },
  {
    name: "Butter Biscuits 🧈",
    description: "Decorated buttery biscuits with melt-in-mouth texture.",
    price: "R70 (Dozen)",
    image: "../Images/POE pics/Butter Biscuits.webp"
  },
  {
    name: "Vegan Cookies 🌱",
    description: "Delightful vegan cookies, dairy-free & guilt-free.",
    price: "R65 (5 pack)",
    image: "../Images/POE pics/Vegan cookies.webp"
  },
  {
    name: "Strawberry Cookies 🍓",
    description: "Soft, fruity strawberry goodness.",
    price: "R78 (5 pack)",
    image: "../Images/POE pics/Strawberry cookie.jpeg"
  },
  {
    name: "Blueberry Cookies 🫐",
    description: "Blueberry cookies with a fruity burst.",
    price: "R78 (5 pack)",
    image: "../Images/POE pics/Blueberry cookie.jpeg"
  }
];

// ----------------------------------------------------
// RENDER COOKIE CARDS
// ----------------------------------------------------
const cookieGrid = document.getElementById("cookieGrid");

function renderCookies(list) {
  cookieGrid.innerHTML = "";

  list.forEach(c => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${c.image}" alt="${c.name}" class="cookie-img">
      <div class="product-info">
        <h3>${c.name}</h3>
        <p>${c.description}</p>
        <span class="price">${c.price}</span>
        <a href="Enquiry.html" class="order-btn">Order Now</a>
      </div>
    `;

    // Lightbox trigger
    card.querySelector(".cookie-img").addEventListener("click", () => {
      document.getElementById("lightboxImg").src = c.image;
      document.getElementById("lightbox").style.display = "flex";
    });

    cookieGrid.appendChild(card);
  });
}

renderCookies(cookies);

// ----------------------------------------------------
// LIGHTBOX CLOSE
// ----------------------------------------------------
document.getElementById("lightbox").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

// ----------------------------------------------------
// SEARCH FUNCTIONALITY
// ----------------------------------------------------
document.getElementById("searchInput").addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  const filtered = cookies.filter(c => c.name.toLowerCase().includes(value));
  renderCookies(filtered);
});

/// --- contact.html --->
// ---------------------------------------------
// 1. SMOOTH SCROLL FOR NAVIGATION
// ---------------------------------------------
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.hash) {
      e.preventDefault();
      document.querySelector(link.hash).scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ---------------------------------------------
// 2. LIGHTBOX FOR IMAGE ENLARGEMENT
// ---------------------------------------------
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
lightbox.style.cssText = `
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.8); display:none;
  justify-content:center; align-items:center; z-index:9999;
`;
document.body.appendChild(lightbox);

const lightImg = document.createElement("img");
lightImg.style.cssText = `
  max-width:80%; border-radius:12px; animation:zoomIn 0.3s ease;
`;
lightbox.appendChild(lightImg);

document.addEventListener("click", e => {
  if (e.target.classList.contains("enlarge-img")) {
    lightImg.src = e.target.src;
    lightbox.style.display = "flex";
  }
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});


// ---------------------------------------------
// 3. CAKES DYNAMIC CONTENT + LOAD MORE FEATURE
// ---------------------------------------------
const cakes = [
  {name: "Chocolate Cake", image: "../Images/POE pics/chocolateCake.jpg"},
  {name: "Oreo Cake", image: "../Images/POE pics/oreoCake.jpg"},
  {name: "Red Velvet Cake", image: "../Images/POE pics/redVelvet.jpg"},
  {name: "Caramel Cake", image: "../Images/POE pics/caramelCake.jpg"},
  {name: "Vanilla Cake", image: "../Images/POE pics/vanillaCake.jpg"},
  {name: "Rainbow Cake", image: "../Images/POE pics/rainbowCake.jpg"},
];

let cakeIndex = 0;
const cakesPerLoad = 3;
const cakeGrid = document.getElementById("cakeGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");

function loadCakes() {
  const slice = cakes.slice(cakeIndex, cakeIndex + cakesPerLoad);
  slice.forEach(cake => {
    const card = document.createElement("div");
    card.classList.add("cake-card");
    card.innerHTML = `
      <img src="${cake.image}" class="enlarge-img" alt="${cake.name}">
      <h4>${cake.name}</h4>
    `;
    cakeGrid.appendChild(card);
  });
  cakeIndex += cakesPerLoad;
  if (cakeIndex >= cakes.length) loadMoreBtn.style.display = "none";
}

loadMoreBtn.addEventListener("click", loadCakes);
loadCakes();


// ---------------------------------------------
// 4. CONTACT FORM VALIDATION
// ---------------------------------------------
const form = document.querySelector(".contact-form form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let errors = [];

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");
  const branch = document.getElementById("branch");
  const enquiryType = document.getElementById("enquiry-type");

  // REQUIRED FIELD CHECK
  if (name.value.trim() === "") errors.push("Name is required.");
  if (email.value.trim() === "") errors.push("Email is required.");
  if (phone.value.trim().length < 10) errors.push("Phone number is invalid.");
  if (message.value.trim().length < 10) errors.push("Message too short.");
  if (branch.value === "") errors.push("Select a branch.");
  if (enquiryType.value === "") errors.push("Select enquiry type.");

  // DISPLAY ERRORS
  let errorBox = document.getElementById("errorBox");
  if (!errorBox) {
    errorBox = document.createElement("div");
    errorBox.id = "errorBox";
    errorBox.style.cssText = `
      background:#ffb3b3; padding:10px; margin:10px 0;
      border-left:5px solid red; border-radius:8px;
    `;
    form.prepend(errorBox);
  }

  if (errors.length > 0) {
    errorBox.innerHTML = errors.join("<br>");
    return;
  } else {
    errorBox.innerHTML = "";
  }

  // Simulated AJAX Submission
  const submitBtn = form.querySelector("button");
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Your enquiry has been sent successfully! 🎉");
    form.reset();
    submitBtn.innerText = "Submit Enquiry";
    submitBtn.disabled = false;
  }, 1500);
});


// ---------------------------------------------
// 5. SEARCH FUNCTIONALITY (OPTIONAL ADD-ON)
// ---------------------------------------------
const searchInput = document.createElement("input");
searchInput.placeholder = "Search cakes...";
searchInput.style.cssText = `
  width: 60%; padding: 10px; margin: 20px auto; display:block;
  border-radius:8px; border:1px solid #ccc;
`;

document.querySelector(".cakes-page").prepend(searchInput);

searchInput.addEventListener("keyup", () => {
  const filter = searchInput.value.toLowerCase();
  cakeGrid.innerHTML = "";

  const filtered = cakes.filter(c =>
    c.name.toLowerCase().includes(filter)
  );

  filtered.forEach(cake => {
    const card = document.createElement("div");
    card.classList.add("cake-card");
    card.innerHTML = `
      <img src="${cake.image}" class="enlarge-img" alt="${cake.name}">
      <h4>${cake.name}</h4>
    `;
    cakeGrid.appendChild(card);
  });

  // hide load more when searching
  loadMoreBtn.style.display = filter ? "none" : "block";
});
