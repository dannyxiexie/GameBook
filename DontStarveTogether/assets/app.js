(function () {
  const data = window.GUIDE_DATA;
  const body = document.body;
  const page = body.dataset.page || "stages";
  const content = document.querySelector("#content");
  const stageNav = document.querySelector("#stage-nav");
  const searchInput = document.querySelector("#search-input");
  const searchClear = document.querySelector("#search-clear");
  const searchScope = document.querySelector("#search-scope");
  const iconByTitle = {
    "肉丸": "meatballs.png", "波兰水饺": "pierogi.png", "蜜汁火腿": "honey-ham.png",
    "培根煎蛋": "bacon-eggs.png", "太妃糖": "taffy.png", "烤仙人掌": "cooked-cactus.png",
    "大肉干": "jerky.png", "什锦干果": "trail-mix.png", "肉汤": "meaty-stew.png", "火龙果派": "dragonpie.png",
    "科学机器": "science-machine.png", "炼金引擎": "alchemy-engine.png", "火坑": "fire-pit.png",
    "烹饪锅": "crock-pot.png", "冰箱": "ice-box.png", "避雷针": "lightning-rod.png", "木箱": "chest.png",
    "晒肉架": "drying-rack.png", "鸟笼": "birdcage.png", "灵子分解器": "prestihatitator.png",
    "雪球发射器": "ice-flingomatic.png", "蜂箱": "bee-box.png", "背包": "backpack.png", "木甲": "log-suit.png",
    "猪皮帽": "football-helmet.png", "火腿棒": "ham-bat.png", "保暖石": "thermal-stone.png", "冬帽": "winter-hat.png",
    "雨具": "umbrella.png", "雨伞": "umbrella.png", "眼球伞": "eyebrella.png", "提灯": "lantern.png",
    "矿工帽": "miner-hat.png", "暗夜剑": "dark-sword.png", "步行手杖": "walking-cane.png",
    "猪王": "pig-king.png", "牛群": "beefalo.png", "沼泽": "reeds.png", "龙蝇沙漠": "tumbleweed.png",
    "绿洲沙漠": "oasis.png", "蜂后区": "gigantic-beehive.png", "发条区": "clockwork-knight.png",
    "矿区": "boulder.png", "洞穴入口": "sinkhole.png", "月岛": "lunar-island.png", "海象营地": "mactusk.png", "墓地": "grave.png"
  };
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
    const iconFile = Object.entries(iconByTitle).find(([title]) => card.title.includes(title))?.[1];
    const icon = iconFile
      ? `<img src="assets/icons/${iconFile}" alt="" loading="lazy">`
      : card.icon || "✦";
    const listLabel = page === "stages" ? "步骤" : "要点";
    return `
      <article class="guide-card${tone}" data-search-card>
        <div class="guide-card__top">
          <span class="guide-card__icon" aria-hidden="true">${icon}</span>
          <div>
            ${card.eyebrow || card.badge || chapterLabel ? `<span class="card-kicker">${card.eyebrow || card.badge || chapterLabel}</span>` : ""}
            <h3>${card.title}</h3>
          </div>
        </div>
        ${card.stats ? `<div class="stat-row">${card.stats.map((stat) => `<span>${stat}</span>`).join("")}</div>` : ""}
        ${card.recipe ? `<div class="recipe"><span>配方</span><strong>${card.recipe}</strong></div>` : ""}
        ${card.materials ? `<div class="materials"><span>需要</span><ul>${card.materials.map((item) => `<li>${item}</li>`).join("")}</ul></div>` : ""}
        ${card.bullets ? `<div class="steps"><span>${listLabel}</span><ol>${card.bullets.map((item) => `<li>${item}</li>`).join("")}</ol></div>` : ""}
        ${card.source ? `<p class="card-source"><span>获取</span>${card.source}</p>` : ""}
        ${card.footer ? `<p class="card-footer"><span>注意</span>${card.footer}</p>` : ""}
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
          <div><span>CHAPTER</span><h2>${chapter.label}</h2></div>
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
          <div><h1>${quick.title}</h1></div>
          <div class="count-stamp"><strong>${quick.cards.length}</strong><span>张速查卡</span></div>
        </div>
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
