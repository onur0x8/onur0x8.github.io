(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('notdefteri-theme');
  const preferredDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = savedTheme || (preferredDark ? 'dark' : 'light');

  function updateThemeMeta() {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', root.dataset.theme === 'dark' ? '#171916' : '#f5f4ef');
  }
  updateThemeMeta();
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('notdefteri-theme', root.dataset.theme);
    updateThemeMeta();
  });

  const menuButton = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    nav?.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open');
  }));

  const overlay = document.getElementById('search-overlay');
  const searchInput = document.getElementById('site-search');
  const searchResults = document.getElementById('search-results');
  const searchHint = document.getElementById('search-hint');
  const openSearch = () => { if (!overlay) return; overlay.hidden = false; document.body.classList.add('modal-open'); setTimeout(() => searchInput?.focus(), 20); };
  const closeSearch = () => { if (!overlay) return; overlay.hidden = true; document.body.classList.remove('modal-open'); };
  document.querySelector('.search-open')?.addEventListener('click', openSearch);
  document.querySelector('.search-close')?.addEventListener('click', closeSearch);
  overlay?.addEventListener('click', event => { if (event.target === overlay) closeSearch(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeSearch();
    if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) { event.preventDefault(); openSearch(); }
  });

  let searchIndexPromise;
  function loadSearchIndex() {
    if (!searchIndexPromise) {
      const searchUrl = document.body.dataset.searchUrl || '/search.json';
      searchIndexPromise = fetch(searchUrl).then(response => {
        if (!response.ok) throw new Error('Arama verisi yüklenemedi');
        return response.json();
      });
    }
    return searchIndexPromise;
  }
  function renderSearch(items) {
    if (!searchResults) return;
    searchResults.replaceChildren();
    if (!items.length) { searchHint.textContent = 'Bu aramayla eşleşen bir yazı bulunamadı.'; return; }
    searchHint.textContent = `${items.length} sonuç bulundu.`;
    items.slice(0, 8).forEach(item => {
      const a = document.createElement('a'); a.className = 'search-result'; a.href = item.url;
      const category = document.createElement('span'); category.className = 'search-result-category'; category.textContent = (item.categories || ['Notlar']).join(' · ');
      const title = document.createElement('strong'); title.textContent = item.title;
      const desc = document.createElement('small'); desc.textContent = item.description || '';
      const date = document.createElement('time'); date.textContent = item.date || '';
      a.append(category, title, desc, date); searchResults.append(a);
    });
  }
  let searchTimer;
  searchInput?.addEventListener('input', () => {
    clearTimeout(searchTimer);
    const query = searchInput.value.trim().toLocaleLowerCase('tr-TR');
    if (query.length < 2) { searchResults?.replaceChildren(); if (searchHint) searchHint.textContent = 'Aramak için en az 2 karakter yaz.'; return; }
    if (searchHint) searchHint.textContent = 'Aranıyor…';
    searchTimer = setTimeout(async () => {
      try {
        const index = await loadSearchIndex();
        const hits = index.map(item => ({item, text: `${item.title} ${item.description} ${(item.categories || []).join(' ')}`.toLocaleLowerCase('tr-TR')})).filter(entry => entry.text.includes(query)).map(entry => entry.item);
        renderSearch(hits);
      } catch { if (searchHint) searchHint.textContent = 'Arama şu anda kullanılamıyor.'; }
    }, 140);
  });

  const article = document.getElementById('article-content');
  const toc = document.getElementById('article-toc');
  if (article && toc) {
    const headings = [...article.querySelectorAll('h2, h3')];
    toc.replaceChildren();
    if (!headings.length) { const empty = document.createElement('span'); empty.className = 'toc-empty'; empty.textContent = 'Bu yazıda başlık bulunmuyor.'; toc.append(empty); }
    headings.forEach((heading, index) => {
      if (!heading.id) heading.id = `bolum-${index + 1}`;
      const link = document.createElement('a'); link.href = `#${heading.id}`; link.textContent = heading.textContent; link.className = heading.tagName.toLowerCase() === 'h3' ? 'toc-sub' : '';
      link.addEventListener('click', () => { toc.querySelectorAll('a').forEach(a => a.classList.remove('is-active')); link.classList.add('is-active'); }); toc.append(link);
    });
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const percent = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      const bar = document.getElementById('reading-progress-bar'); if (bar) bar.style.width = `${percent}%`;
    };
    window.addEventListener('scroll', updateProgress, {passive: true}); updateProgress();
    article.querySelectorAll('pre').forEach(pre => {
      const button = document.createElement('button'); button.className = 'code-copy'; button.type = 'button'; button.textContent = 'Kopyala';
      button.addEventListener('click', async () => { try { await navigator.clipboard.writeText(pre.innerText); button.textContent = 'Kopyalandı'; setTimeout(() => button.textContent = 'Kopyala', 1500); } catch { button.textContent = 'Kopyalanamadı'; } });
      pre.append(button);
    });
  }
  const copyLink = async button => {
    if (!button) return;
    try { await navigator.clipboard.writeText(window.location.href); const old = button.innerText; button.innerText = 'Kopyalandı ✓'; setTimeout(() => button.innerText = old, 1600); }
    catch { button.innerText = 'Bağlantı kopyalanamadı'; }
  };
  document.getElementById('copy-article-link')?.addEventListener('click', event => copyLink(event.currentTarget));
  document.getElementById('copy-bottom-link')?.addEventListener('click', event => copyLink(event.currentTarget));
})();
