// === Whiskful Treats — Cute Interactive Script ===
// Adds playful animations and smooth behavior 💖

document.addEventListener('DOMContentLoaded', () => {
  // === Dynamic Styling ===
  document.body.style.margin = "0";
  document.body.style.fontFamily = "'Quicksand', sans-serif";
  document.body.style.background = "linear-gradient(135deg, #fff0f5, #ffe4e1)";
  document.body.style.color = "#444";

  // Header
  const header = document.querySelector("header");
  if (header) Object.assign(header.style, {
    textAlign: "center",
    background: "#ffe6eb",
    padding: "1rem 2rem",
    borderRadius: "0 0 20px 20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: "0",
    zIndex: "1000"
  });

  // Logo container
  const logoContainer = document.querySelector(".logo-container");
  if (logoContainer) Object.assign(logoContainer.style, {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  });

  // Logo image
  const logo = document.querySelector(".logo");
  if (logo) Object.assign(logo.style, {
    width: "70px",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  });

  // Navigation
  const navList = document.querySelector("nav ul");
  if (navList) Object.assign(navList.style, {
    listStyle: "none",
    margin: "1rem 0 0 0",
    padding: "0",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap"
  });

  document.querySelectorAll("nav a").forEach(link => {
    Object.assign(link.style, {
      textDecoration: "none",
      color: "#444",
      fontWeight: "600",
      padding: "6px 14px",
      borderRadius: "20px",
      transition: "all 0.3s ease"
    });
    link.addEventListener("mouseover", () => {
      link.style.background = "#ffb6c1";
      link.style.color = "#fff";
    });
    link.addEventListener("mouseout", () => {
      link.style.background = "";
      link.style.color = "#444";
    });
  });

  // Main section
  const main = document.querySelector("main");
  if (main) Object.assign(main.style, {
    padding: "2rem",
    textAlign: "center"
  });

  // Headings
  document.querySelectorAll("h1, h2").forEach(heading => {
    heading.style.fontFamily = "'Baloo 2', cursive";
    heading.style.color = "#ff6b81";
  });
  document.querySelectorAll("h2").forEach(h2 => {
    h2.style.fontSize = "2rem";
  });

  // Tagline
  const tagline = document.querySelector(".tagline");
  if (tagline) Object.assign(tagline.style, {
    fontStyle: "italic",
    color: "#666",
    marginTop: "-10px"
  });

  // Intro paragraph
  const intro = document.querySelector("p.intro");
  if (intro) Object.assign(intro.style, {
    maxWidth: "700px",
    margin: "20px auto 40px auto",
    fontSize: "1.1rem",
    color: "#333"
  });

  // === SEO Enhancements ===
  // Meta tags
  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content = "Interactive bakery website with dynamic content and SEO optimization.";
  document.head.appendChild(metaDescription);

  const metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1.0";
  document.head.appendChild(metaViewport);

  // Alt attributes for images
  document.querySelectorAll("img").forEach(img => {
    if (!img.alt) img.alt = "Bakery image";
  });

  // Robots.txt simulation (for dev environments only)
  const robotsMeta = document.createElement("meta");
  robotsMeta.name = "robots";
  robotsMeta.content = "index, follow";
  document.head.appendChild(robotsMeta);

  // === 1. Accordion (Smooth + Cute) ===
  document.querySelectorAll('.accordion-toggle').forEach(toggle => {
    const content = toggle.nextElementSibling;
    content.style.maxHeight = '0';
    content.style.overflow = 'hidden';
    content.style.transition = 'max-height 0.4s ease, opacity 0.4s ease';
    content.style.opacity = '0';

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      const isActive = toggle.classList.contains('active');
      if (isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.opacity = '1';
      } else {
        content.style.maxHeight = '0';
        content.style.opacity = '0';
      }
    });
  });

  // === 2. Lightbox Gallery (with Fade + Esc close) ===
  document.querySelectorAll('.card img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="close" title="Close">&times;</span>
          <img src="${img.src}" alt="${img.alt}">
        </div>
      `;
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      // Close when clicking background or "x"
      const closeBox = () => {
        lightbox.classList.add('fade-out');
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      lightbox.querySelector('.close').addEventListener('click', closeBox);
      lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeBox();
      });

      // Close on ESC key
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') {
          closeBox();
          document.removeEventListener('keydown', esc);
        }
      });
    });
  });

  // === 3. Dynamic Product Loader (Now with Cute Delay Animation) ===
  const productSection = document.querySelector('.cards');
  const products = [
    { name: 'Brownies 🍫', desc: 'Rich and fudgy chocolate squares.', img: 'brownie.jpg', link: 'brownies.html' },
    { name: 'Tarts 🥧', desc: 'Sweet and fruity pastry delights.', img: 'tart.jpg', link: 'tarts.html' },
    { name: 'Cupcakes 🧁', desc: 'Fluffy vanilla topped with love.', img: 'cupcake.jpg', link: 'cupcakes.html' }
  ];

  function loadProducts() {
    products.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'card fade-in';
      card.style.animationDelay = `${i * 0.1}s`; // cute staggered delay
      card.innerHTML = `
        <img src="../Images/POE pics/${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="${p.link}" class="button">Order Now 💕</a>
      `;
      productSection.appendChild(card);
    });
  }
  loadProducts();

  // === 4. Search Filter (Cute Placeholder + Live Filter) ===
  const searchInput = document.createElement('input');
  searchInput.placeholder = 'Search sweet treats... 🍰';
  searchInput.className = 'search-bar';
  document.querySelector('.featured').prepend(searchInput);

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.card').forEach(card => {
      const name = card.querySelector('h3').textContent.toLowerCase();
      const match = name.includes(query);
      card.style.display = match ? 'block' : 'none';
      card.style.transition = 'opacity 0.3s ease';
      card.style.opacity = match ? '1' : '0';
    });
  });

  // === 5. SEO Enhancements (Same but with Emoji in log) ===
  const metaKeywords = document.createElement('meta');
  metaKeywords.name = 'keywords';
  metaKeywords.content = 'cakes, cookies, bakery, custom treats, Whiskful Treats, Phiri';
  document.head.appendChild(metaKeywords);
  console.log('🧁 SEO ready! Remember to include robots.txt & sitemap.xml');

  // === 6. Page Speed Log (Cute Console Log) ===
  window.addEventListener('load', () => {
    const perf = window.performance.timing;
    const loadTime = perf.loadEventEnd - perf.navigationStart;
    console.log(`✨ Page loaded in ${loadTime}ms — smooth and sweet!`);
  });

  // === 7. Security Reminder ===
  console.log('🔒 Always use HTTPS and validate user inputs for a secure website.');
});

// === About Us ===
/* app-enhanced.js
   Strictly JavaScript output — this script:
   1) Injects a "cute" upgraded CSS version (based on your provided CSS)
   2) Adds interactive behavior: accordion, accessible lightbox, dynamic product loader,
      debounced search, "Order Now" confetti, SEO meta injection, page-load log, and security tip.
   3) Keeps your original visual choices but enhances them (pastels, rounded shapes, micro-interactions).
   Save as app-enhanced.js and include with: <script src="app-enhanced.js" defer></script>
*/


  const styleTag = document.createElement('style');
  styleTag.id = 'cute-enhanced-styles';
  styleTag.textContent = cuteCss;
  document.head.appendChild(styleTag);

  // --- 2. Inject a floating dessert (visual flair) if not already present
  function ensureFloatingDessert() {
    if (document.querySelector('.floating-dessert')) return;
    const fd = document.createElement('div');
    fd.className = 'floating-dessert';
    fd.setAttribute('aria-hidden', 'true');
    fd.innerText = '🧁'; // cupcake emoji
    document.body.appendChild(fd);
  }
  ensureFloatingDessert();

  // --- 4. Create product grid container if missing (keeps separation of concerns)
  function ensureCardsContainer() {
    let cards = document.querySelector('.cards');
    if (!cards) {
      // place after any .featured or at end of main
      const wrapper = document.createElement('section');
      wrapper.className = 'cards-section';
      cards = document.createElement('div');
      cards.className = 'cards';
      wrapper.appendChild(cards);
      const featured = document.querySelector('.featured') || document.querySelector('main') || document.body;
      featured.insertAdjacentElement('afterend', wrapper);
    }
    return cards;
  }
  const productSection = ensureCardsContainer();

  // --- 5. Load products dynamically with cute staggered animation
  function loadProducts() {
    productSection.innerHTML = ''; // clear
    products.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.setAttribute('data-name', p.name.toLowerCase());
      // animation delay via inline style for stagger
      card.style.animationDelay = `${i * 0.08}s`;
      card.innerHTML = `
        <img src="../Images/POE pics/${p.img}" alt="${p.name}" loading="lazy" />
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <a href="${p.link}" class="button" data-product="${p.name}">Order Now 💕</a>
      `;
      productSection.appendChild(card);
    });
    attachImageLightboxes(); // attach handlers to newly created images
    attachOrderButtons();    // attach order handlers
  }
  loadProducts();

  // --- 6. Accessible Lightbox (open on image click, close on background/escape)
  function attachImageLightboxes() {
    const imgs = Array.from(document.querySelectorAll('.card img'));
    imgs.forEach(img => {
      // guard: don't attach twice
      if (img._cute_lightbox_attached) return;
      img._cute_lightbox_attached = true;
      img.addEventListener('click', () => {
        openLightbox(img);
      });
    });
  }

  function openLightbox(img) {
    // build DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.tabIndex = -1;
    lightbox.innerHTML = `
      <div class="lightbox-content" role="dialog" aria-modal="true" aria-label="Image preview">
        <button class="close" aria-label="Close preview">&times;</button>
        <img src="${img.src}" alt="${img.alt || 'Image preview'}">
      </div>
    `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // handlers
    const closeBtn = lightbox.querySelector('.close');
    const remove = () => {
      // fade-out via CSS class (we added fade animation earlier)
      lightbox.style.transition = 'opacity 220ms ease';
      lightbox.style.opacity = '0';
      setTimeout(() => {
        if (lightbox && lightbox.parentNode) lightbox.parentNode.removeChild(lightbox);
        document.body.style.overflow = '';
      }, 240);
    };
    closeBtn.addEventListener('click', remove);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) remove();
    });
    const escHandler = (e) => { if (e.key === 'Escape') { remove(); document.removeEventListener('keydown', escHandler); } };
    document.addEventListener('keydown', escHandler);
    // focus the lightbox for accessibility
    lightbox.focus();
  }

  // --- 7. Search filter (debounced)
  function createSearchBar() {
    if (document.querySelector('.search-bar')) return; // do not duplicate
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.className = 'search-bar';
    searchInput.placeholder = 'Search sweet treats... 🍰';
    searchInput.setAttribute('aria-label', 'Search treats');
    // prefer to place inside .featured if exists
    const container = document.querySelector('.featured') || document.querySelector('main') || document.body;
    container.prepend(searchInput);

    let debounceTimer = null;
    searchInput.addEventListener('input', () => {
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const q = searchInput.value.trim().toLowerCase();
        const cards = Array.from(document.querySelectorAll('.card'));
        cards.forEach(card => {
          const name = (card.getAttribute('data-name') || '').toLowerCase();
          const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
          const match = !q || name.includes(q) || desc.includes(q);
          card.style.display = match ? 'block' : 'none';
          // subtle opacity transition
          card.style.transition = 'opacity 260ms var(--ease)';
          card.style.opacity = match ? '1' : '0';
        });
      }, 160);
    });
  }
  createSearchBar();

  // --- 8. "Order Now" buttons: small confetti burst (emoji based) + subtle success state
  function attachOrderButtons() {
    const orderButtons = Array.from(document.querySelectorAll('.card .button'));
    orderButtons.forEach(btn => {
      if (btn._cute_order_attached) return;
      btn._cute_order_attached = true;
      btn.addEventListener('click', (e) => {
        // prevent navigating during demo (if link is '#'), but if it's a real link we let it proceed after effect
        e.preventDefault();
        const product = btn.dataset.product || 'treat';
        // visual micro-feedback
        btn.textContent = 'Added to cart ✓';
        btn.style.pointerEvents = 'none';
        btn.style.transform = 'translateY(-2px) scale(1.01)';
        setTimeout(() => {
          btn.textContent = 'Order Now 💕';
          btn.style.pointerEvents = '';
          btn.style.transform = '';
        }, 1200);

        // tiny emoji confetti burst
        confettiBurstAt(btn, 14);
      });
    });
  }

  // confetti function using emoji elements that fade and float out
  function confettiBurstAt(targetElement, count = 12) {
    const rect = targetElement.getBoundingClientRect();
    const originX = rect.left + rect.width / 2 + window.scrollX;
    const originY = rect.top + window.scrollY;
    const emojis = ['✨','🎉','🧁','🍰','🍪','💖','🌸','🍓'];
    for (let i = 0; i < count; i++) {
      const span = document.createElement('div');
      span.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.position = 'absolute';
      span.style.left = `${originX}px`;
      span.style.top = `${originY}px`;
      span.style.fontSize = `${10 + Math.floor(Math.random() * 14)}px`;
      span.style.pointerEvents = 'none';
      span.style.zIndex = 20000;
      span.style.opacity = '1';
      span.style.transform = `translate3d(0,0,0) rotate(${Math.random()*90-45}deg)`;
      document.body.appendChild(span);

      // random trajectory
      const dx = (Math.random() - 0.5) * 160;
      const dy = -80 - Math.random() * 160;
      const rot = (Math.random() - 0.5) * 720;

      // animate via requestAnimationFrame for smoothness
      const duration = 900 + Math.random() * 500;
      const start = performance.now();
      (function animate(now){
        const t = Math.min(1, (now - start) / duration);
        const ease = 1 - Math.pow(1 - t, 3); // ease out
        span.style.left = `${originX + dx * ease}px`;
        span.style.top = `${originY + dy * ease}px`;
        span.style.opacity = `${1 - ease}`;
        span.style.transform = `translate3d(0,0,0) rotate(${rot * ease}deg) scale(${1 - 0.2 * ease})`;
        if (t < 1) requestAnimationFrame(animate);
        else span.remove();
      })(performance.now());
    }
  }

  // --- 9. Accordion behaviors (smooth + accessible)
  function setupAccordion() {
    const toggles = Array.from(document.querySelectorAll('.accordion-toggle'));
    toggles.forEach(toggle => {
      const content = toggle.nextElementSibling;
      if (!content) return;
      // initial ARIA state setup
      toggle.setAttribute('aria-expanded', 'false');
      content.setAttribute('aria-hidden', 'true');
      content.style.maxHeight = '0';
      content.style.overflow = 'hidden';
      content.style.transition = 'max-height 360ms var(--ease), opacity 320ms var(--ease)';

      // avoid double-binding
      if (toggle._cute_accordion) return;
      toggle._cute_accordion = true;

      toggle.addEventListener('click', () => {
        const active = toggle.classList.toggle('active');
        toggle.setAttribute('aria-expanded', String(active));
        if (active) {
          content.hidden = false;
          const sh = content.scrollHeight;
          content.style.maxHeight = sh + 'px';
          content.style.opacity = '1';
          content.setAttribute('aria-hidden', 'false');
        } else {
          content.style.maxHeight = '0';
          content.style.opacity = '0';
          setTimeout(() => { content.hidden = true; }, 360);
          content.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }
  setupAccordion();

  // --- 10. SEO meta injection (minimal)
  (function addSeoMeta(){
    if (!document.head.querySelector('meta[name="keywords"]')) {
      const m = document.createElement('meta');
      m.name = 'keywords';
      m.content = 'cakes, cookies, bakery, custom treats, Phiri, Whiskful Treats';
      document.head.appendChild(m);
    }
    // nice console note
    console.log('🧁 SEO meta injected. Don\'t forget robots.txt and sitemap.xml at project root.');
  })();

  // --- 11. Page speed logging (friendly)
  window.addEventListener('load', () => {
    try {
      const t = performance.timing;
      const loadTime = Math.max(0, (t.loadEventEnd || Date.now()) - (t.navigationStart || Date.now()));
      console.log(`✨ Page loaded in ~${loadTime}ms — consider optimizing images and enabling compression.`);
    } catch (e) {
      console.log('✨ Page loaded — performance API unavailable.');
    }
  });

  // --- 12. Security reminder
  console.log('🔒 Tip: Use HTTPS, sanitize inputs server-side, and validate uploads to keep the site secure.');

  // --- 13. Re-attach dynamic behaviors if content changes (useful when instructor tests with dynamic content)
  // Simple mutation observer to re-run binding on newly added .card elements
  const mo = new MutationObserver((mutations) => {
    let needsRebind = false;
    for (const m of mutations) {
      if (m.addedNodes && m.addedNodes.length) {
        needsRebind = true;
        break;
      }
    }
    if (needsRebind) {
      attachImageLightboxes();
      attachOrderButtons();
      setupAccordion();
    }
  });
  mo.observe(document.body, { childList: true, subtree: true });

  // --- 14. Expose small API for debugging in console (optional)
  window.Whiskful = {
    reloadProducts: loadProducts,
    addProduct: (p) => { products.push(p); loadProducts(); },
    confettiAt: confettiBurstAt
  };

  // === Products Page ===

  