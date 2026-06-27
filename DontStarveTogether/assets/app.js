(function () {
  const data = window.GUIDE_DATA;
  const body = document.body;
  const page = body.dataset.page || "stages";
  const content = document.querySelector("#content");
  const stageNav = document.querySelector("#stage-nav");
  const searchInput = document.querySelector("#search-input");
  const searchClear = document.querySelector("#search-clear");
  const searchScope = document.querySelector("#search-scope");
  let currentStage = getInitialStage();
  let currentChapter = "overview";

  function getInitialStage() {
    const id = new URLSearchParams(location.search).get("stage");
    return data.stages.some((stage) => stage.id === id) ? id : "start";
  }

  function normalize(value) {
    return String(value || "").toLocaleLowerCase("zh-CN").replace(/\s+/g, "");
  }

  function matches(card, query) {
    return normalize(JSON.stringify(card)).includes(normalize(query));
  }

  function renderStageNav() {
    stageNav.innerHTML = data.stages.map((stage, index) => `
      <button class="stage-nav__item ${page === "stages" && stage.id === currentStage ? "is-active" : ""}"
        type="button" data-stage="${stage.id}" aria-current="${page === "stages" && stage.id === currentStage ? "page" : "false"}">
        <span class="stage-nav__number">0${index + 1}</span>
        <span><strong>${stage.nav}</strong><small>${stage.days}</small></span>
      </button>
    `).join("");

    stageNav.querySelectorAll("[data-stage]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.stage;
        if (page !== "stages") {
          location.href = `index.html?stage=${id}`;
          return;
        }
        setStage(id, true);
      });
    });
  }

  function setStage(id, addHistory) {
    currentStage = id;
    currentChapter = "overview";
    searchInput.value = "";
    updateSearchClear();
    if (addHistory) history.pushState({ stage: id }, "", `?stage=${id}`);
    renderStageNav();
    renderStagePage();
    document.querySelector(".content-top")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderStageHero(stage) {
    return `
      <section class="stage-hero content-top">
        <div class="stage-hero__copy">
          <div class="eyebrow"><span>${stage.days}</span> / ${stage.nav}</div>
          <h1>${stage.title}</h1>
          <p>${stage.tagline}</p>
          <div class="hero-facts">
            <article><span>进入标志</span><strong>${stage.sign}</strong></article>
            <article><span>阶段目标</span><strong>${stage.goal}</strong></article>
          </div>
        </div>
        <aside class="stage-ticket" aria-label="本阶段数字目标">
          <span class="stage-ticket__label">本阶段验收</span>
          ${stage.stats.map((stat) => `<strong>${stat}</strong>`).join("")}
          <em>一起确认，再进下一阶段</em>
        </aside>
      </section>
    `;
  }

  function renderCard(card, chapterLabel) {
    const tone = card.tone ? ` card--${card.tone}` : "";
    return `
      <article class="guide-card${tone}" data-search-card>
        <div class="guide-card__top">
          <span class="guide-card__icon" aria-hidden="true">${card.icon || "✦"}</span>
          <div>
            ${card.eyebrow || card.badge || chapterLabel ? `<span class="card-kicker">${card.eyebrow || card.badge || chapterLabel}</span>` : ""}
            <h3>${card.title}</h3>
          </div>
        </div>
        ${card.stats ? `<div class="stat-row">${card.stats.map((stat) => `<span>${stat}</span>`).join("")}</div>` : ""}
        ${card.text ? `<p>${card.text}</p>` : ""}
        ${card.recipe ? `<div class="recipe"><span>常用配方</span><strong>${card.recipe}</strong></div>` : ""}
        ${card.materials ? `<div class="materials"><span>材料</span><ul>${card.materials.map((item) => `<li>${item}</li>`).join("")}</ul></div>` : ""}
        ${card.bullets ? `<ul class="check-list">${card.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>` : ""}
        ${card.source ? `<p class="card-source"><span>获取</span>${card.source}</p>` : ""}
        ${card.footer ? `<p class="card-footer">${card.footer}</p>` : ""}
        ${card.tags ? `<div class="tag-row">${card.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>` : ""}
      </article>
    `;
  }

  function renderStagePage() {
    const stage = data.stages.find((item) => item.id === currentStage);
    const query = searchInput.value.trim();
    searchScope.textContent = `搜索范围：${stage.nav}`;
    document.title = `${stage.nav}｜饥荒联机版四人开荒指南`;

    if (query) {
      const results = Object.values(stage.chapters).flatMap((chapter) =>
        chapter.cards.filter((card) => matches(card, query)).map((card) => ({ card, label: chapter.label }))
      );
      content.innerHTML = `
        ${renderStageHero(stage)}
        <section class="search-report">
          <div><span>关键词</span><strong>“${escapeHtml(query)}”</strong></div>
          <p>在「${stage.nav}」阶段找到 ${results.length} 张卡片</p>
        </section>
        ${results.length ? `<div class="card-grid search-grid">${results.map(({ card, label }) => renderCard(card, label)).join("")}</div>` : renderEmpty(query)}
      `;
      return;
    }

    const chapter = stage.chapters[currentChapter];
    content.innerHTML = `
      ${renderStageHero(stage)}
      <nav class="chapter-tabs" aria-label="阶段章节">
        ${Object.entries(stage.chapters).map(([key, value], index) => `
          <button type="button" data-chapter="${key}" class="${key === currentChapter ? "is-active" : ""}" aria-selected="${key === currentChapter}">
            <span>0${index + 1}</span>${value.label}
          </button>
        `).join("")}
      </nav>
      <section class="chapter-panel">
        <header class="section-heading">
          <div><span>CHAPTER / ${chapter.label}</span><h2>${chapter.label}</h2></div>
          <p>${chapter.intro}</p>
        </header>
        <div class="card-grid">${chapter.cards.map((card) => renderCard(card)).join("")}</div>
      </section>
    `;

    content.querySelectorAll("[data-chapter]").forEach((button) => {
      button.addEventListener("click", () => {
        currentChapter = button.dataset.chapter;
        renderStagePage();
      });
    });
  }

  function renderQuickPage() {
    const quick = data.quick[page];
    if (!quick) return;
    const query = searchInput.value.trim();
    const cards = query ? quick.cards.filter((card) => matches(card, query)) : quick.cards;
    searchScope.textContent = `搜索范围：${quick.title.replace("速查", "")}`;
    document.title = `${quick.title}｜饥荒联机版四人开荒指南`;
    content.innerHTML = `
      <section class="quick-hero content-top">
        <div class="eyebrow"><span>QUICK CHECK</span> / ${quick.eyebrow}</div>
        <div class="quick-hero__row">
          <div><h1>${quick.title}</h1><p>${quick.intro}</p></div>
          <div class="count-stamp"><strong>${quick.cards.length}</strong><span>张速查卡</span></div>
        </div>
        <p class="quick-note">${quick.note}</p>
      </section>
      ${query ? `<section class="search-report"><div><span>关键词</span><strong>“${escapeHtml(query)}”</strong></div><p>找到 ${cards.length} 张卡片</p></section>` : ""}
      ${cards.length ? `<div class="card-grid quick-grid">${cards.map((card) => renderCard(card)).join("")}</div>` : renderEmpty(query)}
    `;
  }

  function renderEmpty(query) {
    return `<section class="empty-state"><span>🪶</span><h2>没有找到相关卡片</h2><p>换个更短的关键词试试，比如“齿轮”“冬天”或“治疗”。</p><button type="button" id="empty-clear">清除“${escapeHtml(query)}”</button></section>`;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  }

  function updateSearchClear() {
    searchClear.hidden = !searchInput.value;
  }

  function rerender() {
    updateSearchClear();
    if (page === "stages") renderStagePage();
    else renderQuickPage();
    document.querySelector("#empty-clear")?.addEventListener("click", clearSearch);
  }

  function clearSearch() {
    searchInput.value = "";
    searchInput.focus();
    rerender();
  }

  searchInput.addEventListener("input", rerender);
  searchClear.addEventListener("click", clearSearch);
  window.addEventListener("popstate", () => {
    if (page !== "stages") return;
    currentStage = getInitialStage();
    currentChapter = "overview";
    renderStageNav();
    renderStagePage();
  });

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) link.classList.add("is-active");
  });

  renderStageNav();
  rerender();
})();
