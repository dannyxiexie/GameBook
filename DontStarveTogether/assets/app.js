(function () {
  const data = window.GUIDE_DATA;
  const body = document.body;
  const page = body.dataset.page || "stages";
  const content = document.querySelector("#content");
  const stageNav = document.querySelector("#stage-nav");
  const searchInput = document.querySelector("#search-input");
  const searchClear = document.querySelector("#search-clear");
  const searchScope = document.querySelector("#search-scope");
  const planData = window.CRAFTING_PLAN_DATA || { components: {}, materials: {}, stages: {} };
  const planStorageKey = "dst-four-player-crafting-plan-v1";
  const foodStageStorageKey = "dst-food-stages-v1";
  const foodFavoritesStorageKey = "dst-food-favorites-v1";
  let planStore = loadPlanStore();
  let foodStageStore = loadStoredValue(foodStageStorageKey, {});
  let foodFavorites = new Set(loadStoredValue(foodFavoritesStorageKey, []));
  const foodFilters = { stage: "全部", effects: new Set(), favoritesOnly: false };
  let planNoticeStage = null;
  const iconByTitle = {
    "肉丸": "meatballs.png", "波兰水饺": "pierogi.png", "蜜汁火腿": "honey-ham.png",
    "培根煎蛋": "bacon-eggs.png", "太妃糖": "taffy.png", "烤仙人掌": "cooked-cactus.png",
    "大肉干": "jerky.png", "什锦干果": "trail-mix.png", "肉汤": "meaty-stew.png", "火龙果派": "dragonpie.png",
    "火把储备": "torch.png", "铲子": "shovel.png", "草叉": "pitchfork.png",
    "科学机器": "science-machine.png", "炼金引擎": "alchemy-engine.png", "冰火坑": "endothermic-fire-pit.png", "火坑": "fire-pit.png",
    "烹饪锅": "crock-pot.png", "冰箱": "ice-box.png", "避雷针": "lightning-rod.png", "木箱": "chest.png",
    "晒肉架": "drying-rack.png", "鸟笼": "birdcage.png", "灵子分解器": "prestihatitator.png",
    "雪球发射器": "ice-flingomatic.png", "蜂箱": "bee-box.png", "背包": "backpack.png", "木甲": "log-suit.png",
    "猪皮帽": "football-helmet.png", "火腿棒": "ham-bat.png", "保暖石": "thermal-stone.png", "冬帽": "winter-hat.png",
    "针线包": "sewing-kit.png", "牛角帽": "beefalo-hat.png", "花衬衫": "floral-shirt.png", "鱼竿": "fishing-rod.png",
    "雨具": "umbrella.png", "雨伞": "umbrella.png", "眼球伞": "eyebrella.png", "提灯": "lantern.png",
    "矿工帽": "miner-hat.png", "暗夜剑": "dark-sword.png", "步行手杖": "walking-cane.png",
    "猪王": "pig-king.png", "牛群": "beefalo.png", "沼泽": "reeds.png", "龙蝇沙漠": "tumbleweed.png",
    "绿洲沙漠": "oasis.png", "蜂后区": "gigantic-beehive.png", "发条区": "clockwork-knight.png",
    "矿区": "boulder.png", "洞穴入口": "sinkhole.png", "月岛": "lunar-island.png", "海象营地": "mactusk.png", "墓地": "grave.png",
    "独眼巨鹿战场包": "sign.png", "海象刷取包": "mactusk.png"
  };
  let currentStage = getInitialStage();
  let currentChapter = defaultChapter(currentStage);

  function getInitialStage() {
    const id = new URLSearchParams(location.search).get("stage");
    return data.stages.some((stage) => stage.id === id) ? id : "before";
  }

  function defaultChapter(stageId) {
    const stage = data.stages.find((item) => item.id === stageId);
    return stage ? Object.keys(stage.chapters)[0] : "setup";
  }

  function normalize(value) {
    return String(value || "").toLocaleLowerCase("zh-CN").replace(/\s+/g, "");
  }

  function matches(card, query) {
    return normalize(JSON.stringify(card)).includes(normalize(query));
  }

  function getBank(stageId, chapterKey) {
    const bank = window.STAGE_BANKS?.[stageId]?.[chapterKey] || null;
    if (!bank) return null;
    if (chapterKey === "materials") return buildMaterialRows(stageId, bank);
    if (chapterKey === "crafts") {
      const counts = getPlan(stageId);
      return bank.map((row) => ({ ...row, quantity: counts[row.name] ?? 0 }));
    }
    return bank;
  }

  function loadPlanStore() {
    try { return JSON.parse(localStorage.getItem(planStorageKey)) || {}; }
    catch (_error) { return {}; }
  }

  function loadStoredValue(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (_error) { return fallback; }
  }

  function saveStoredValue(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch (_error) { /* Keep the current session usable when storage is unavailable. */ }
  }

  function getPlan(stageId) {
    const defaults = planData.stages[stageId]?.defaults || {};
    return { ...defaults, ...(planStore[stageId] || {}) };
  }

  function savePlan(stageId, counts) {
    planStore = { ...planStore, [stageId]: counts };
    try { localStorage.setItem(planStorageKey, JSON.stringify(planStore)); }
    catch (_error) { /* Private browsing may disable storage; current page still updates. */ }
  }

  function canonicalMaterialName(name) {
    return ({ "普通种子": "种子", "骨渣": "骨片" })[name] || name;
  }

  function numericTarget(value) {
    const text = String(value || "");
    const numbers = text.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
    if (!numbers.length) return 0;
    return text.includes("+") ? numbers.reduce((sum, value) => sum + value, 0) : numbers[0];
  }

  function addIngredient(totals, name, amount, trail = []) {
    const component = planData.components[name];
    if (component && !trail.includes(name)) {
      Object.entries(component).forEach(([part, count]) => addIngredient(totals, part, amount * count, [...trail, name]));
      return;
    }
    const material = canonicalMaterialName(name);
    totals[material] = (totals[material] || 0) + amount;
  }

  function calculateMaterials(stageId) {
    const stagePlan = planData.stages[stageId];
    if (!stagePlan) return {};
    const totals = {};
    const counts = getPlan(stageId);
    Object.entries(stagePlan.recipes).forEach(([item, recipe]) => {
      const quantity = Math.max(0, Number(counts[item]) || 0);
      Object.entries(recipe).forEach(([material, amount]) => addIngredient(totals, material, quantity * amount));
    });
    return totals;
  }

  function buildMaterialRows(stageId, baselineRows) {
    const calculated = calculateMaterials(stageId);
    if (!Object.keys(calculated).length) return baselineRows;
    const baseline = {};
    baselineRows.forEach((row) => {
      const name = canonicalMaterialName(row.name);
      baseline[name] ||= { amount: 0, details: [], icon: row.icon };
      baseline[name].amount += numericTarget(row.quantity);
      if (row.detail && !baseline[name].details.includes(row.detail)) baseline[name].details.push(row.detail);
    });
    const rows = Object.entries(calculated).map(([name, amount]) => {
      const fixed = baseline[name]?.amount || 0;
      const total = Math.max(amount, fixed);
      return {
        name,
        quantity: Number.isInteger(total) ? total : total.toFixed(1),
        detail: baseline[name]?.details.join("；") || "按制作计划自动汇总",
        note: fixed > amount ? `固定目标不低于 ${fixed}` : "制作计划自动汇总",
        icon: planData.materials[name]?.icon || baseline[name]?.icon
      };
    });
    const calculatedNames = new Set(Object.keys(calculated));
    baselineRows.forEach((row) => {
      if (!calculatedNames.has(canonicalMaterialName(row.name))) rows.push({ ...row, note: row.group || "固定目标" });
    });
    return rows;
  }

  function renderBankTable(rows, showChapter = false, editable = false) {
    return `
      <div class="item-bank-wrap">
        <table class="item-bank">
          <thead><tr><th>物品</th><th>数量</th><th>配方 / 获取</th><th>${showChapter ? "页签" : "分类 / 提醒"}</th></tr></thead>
          <tbody>
            ${rows.map((row) => `
              <tr data-search-card>
                <td>
                  <div class="item-bank__item">
                    <span class="item-bank__icon" aria-hidden="true">${row.icon ? `<img src="assets/icons/${row.icon}" alt="" loading="lazy">` : "✦"}</span>
                    <strong>${row.name}</strong>
                  </div>
                </td>
                <td>${editable ? `
                  <div class="quantity-stepper" data-plan-item="${escapeHtml(row.name)}">
                    <button type="button" data-qty-action="minus" aria-label="减少 ${escapeHtml(row.name)}">−</button>
                    <input type="number" min="0" max="99" step="1" value="${row.quantity}" aria-label="${escapeHtml(row.name)}数量">
                    <button type="button" data-qty-action="plus" aria-label="增加 ${escapeHtml(row.name)}">+</button>
                  </div>` : `<b class="item-bank__quantity">${row.quantity ?? "—"}</b>`}</td>
                <td><span class="item-bank__detail">${row.detail || "—"}</span></td>
                <td><span class="item-bank__meta">${showChapter ? row.chapter : row.note || row.group || "—"}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      ${editable ? `<div class="plan-submit"><span>默认按四人总量；修改只在点击提交后生效</span><button type="button" id="submit-crafting-plan">提交计划并更新材料</button></div>` : ""}
    `;
  }

  function wireCraftPlanner(stageId) {
    const steppers = content.querySelectorAll("[data-plan-item]");
    steppers.forEach((stepper) => {
      const input = stepper.querySelector("input");
      stepper.querySelectorAll("[data-qty-action]").forEach((button) => {
        button.addEventListener("click", () => {
          const delta = button.dataset.qtyAction === "plus" ? 1 : -1;
          input.value = Math.min(99, Math.max(0, (Number(input.value) || 0) + delta));
        });
      });
      input.addEventListener("change", () => {
        input.value = Math.min(99, Math.max(0, Math.round(Number(input.value) || 0)));
      });
    });
    content.querySelector("#submit-crafting-plan")?.addEventListener("click", () => {
      const counts = {};
      steppers.forEach((stepper) => {
        counts[stepper.dataset.planItem] = Math.min(99, Math.max(0, Math.round(Number(stepper.querySelector("input").value) || 0)));
      });
      savePlan(stageId, counts);
      planNoticeStage = stageId;
      currentChapter = "materials";
      renderStagePage();
    });
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
    currentChapter = defaultChapter(id);
    planNoticeStage = null;
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
      const cardResults = [];
      const bankResults = [];
      Object.entries(stage.chapters).forEach(([key, chapter]) => {
        const bank = getBank(stage.id, key);
        if (bank) {
          bank.filter((row) => matches(row, query)).forEach((row) => bankResults.push({ ...row, chapter: chapter.label }));
        } else {
          chapter.cards.filter((card) => matches(card, query)).forEach((card) => cardResults.push({ card, label: chapter.label }));
        }
      });
      const resultCount = bankResults.length + cardResults.length;
      content.innerHTML = `
        ${renderStageHero(stage)}
        <section class="search-report">
          <div><span>关键词</span><strong>“${escapeHtml(query)}”</strong></div>
          <p>在「${stage.nav}」阶段找到 ${resultCount} 项</p>
        </section>
        ${bankResults.length ? renderBankTable(bankResults, true) : ""}
        ${cardResults.length ? `<div class="card-grid search-grid">${cardResults.map(({ card, label }) => renderCard(card, label)).join("")}</div>` : ""}
        ${resultCount ? "" : renderEmpty(query)}
      `;
      return;
    }

    const chapter = stage.chapters[currentChapter];
    const bank = getBank(stage.id, currentChapter);
    const editableBank = Boolean(bank && currentChapter === "crafts" && planData.stages[stage.id]);
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
        ${planNoticeStage === stage.id && currentChapter === "materials" ? `<div class="plan-updated" role="status">已按刚提交的制作数量更新材料总量。</div>` : ""}
        ${bank ? renderBankTable(bank, false, editableBank) : `<div class="card-grid">${chapter.cards.map((card) => renderCard(card)).join("")}</div>`}
      </section>
    `;

    content.querySelectorAll("[data-chapter]").forEach((button) => {
      button.addEventListener("click", () => {
        planNoticeStage = null;
        currentChapter = button.dataset.chapter;
        renderStagePage();
      });
    });
    if (editableBank) wireCraftPlanner(stage.id);
  }

  function renderQuickPage() {
    const quick = data.quick[page];
    if (!quick) return;
    if (page === "food") {
      renderFoodPage(quick);
      return;
    }
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

  function foodStage(card) {
    return ["前期", "中期", "后期"].includes(foodStageStore[card.id]) ? foodStageStore[card.id] : card.stage;
  }

  function foodMatchesFilters(card, query) {
    if (query && !matches({ ...card, stage: foodStage(card) }, query)) return false;
    if (foodFilters.stage !== "全部" && foodStage(card) !== foodFilters.stage) return false;
    if (foodFilters.favoritesOnly && !foodFavorites.has(card.id)) return false;
    return [...foodFilters.effects].every((effect) => Number(card[effect]) > 0);
  }

  function foodStageOptions(selected) {
    return ["前期", "中期", "后期"].map((stage) => `<option value="${stage}" ${stage === selected ? "selected" : ""}>${stage}</option>`).join("");
  }

  function effectValue(label, value, key) {
    const number = Number(value) || 0;
    const sign = number > 0 ? "+" : "";
    return `<span class="food-effect food-effect--${key} ${number < 0 ? "is-negative" : ""}"><small>${label}</small><b>${sign}${number}</b></span>`;
  }

  function renderFoodTable(cards) {
    return `
      <div class="food-bank-wrap">
        <table class="food-bank">
          <thead><tr><th>食物</th><th>阶段（可改）</th><th>回复</th><th>吃法 / 做法</th><th>获取 / 提醒</th><th><span class="sr-only">收藏</span>★</th></tr></thead>
          <tbody>
            ${cards.map((card) => {
              const favorite = foodFavorites.has(card.id);
              return `<tr data-search-card>
                <td><div class="food-name"><span><img src="assets/icons/${card.image}" alt="" loading="lazy"></span><div><strong>${card.title}</strong><small>${card.badge}</small></div></div></td>
                <td><select class="food-stage-select" data-food-stage="${card.id}" aria-label="修改${card.title}的阶段">${foodStageOptions(foodStage(card))}</select></td>
                <td><div class="food-effects">${effectValue("饥", card.hunger, "hunger")}${effectValue("精", card.sanity, "sanity")}${effectValue("命", card.health, "health")}</div></td>
                <td><strong class="food-recipe">${card.recipe}</strong></td>
                <td><span class="food-source">${card.source}</span></td>
                <td><button type="button" class="favorite-button ${favorite ? "is-favorite" : ""}" data-food-favorite="${card.id}" aria-pressed="${favorite}" aria-label="${favorite ? "取消收藏" : "收藏"}${card.title}">${favorite ? "★" : "☆"}</button></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function renderFoodPage(quick) {
    const query = searchInput.value.trim();
    const cards = quick.cards.filter((card) => foodMatchesFilters(card, query));
    const hasFilters = foodFilters.stage !== "全部" || foodFilters.effects.size || foodFilters.favoritesOnly;
    searchScope.textContent = "搜索范围：食物";
    document.title = `${quick.title}｜饥荒联机版四人开荒指南`;
    content.innerHTML = `
      <section class="quick-hero content-top">
        <div class="eyebrow"><span>QUICK CHECK</span> / ${quick.eyebrow}</div>
        <div class="quick-hero__row">
          <div><h1>${quick.title}</h1><p class="food-intro">${quick.intro}</p></div>
          <div class="count-stamp"><strong>${quick.cards.length}</strong><span>份常用食谱</span></div>
        </div>
      </section>
      <section class="food-filterbar" aria-label="食物筛选">
        <label class="food-stage-filter"><span>阶段</span><select id="food-stage-filter"><option value="全部">全部</option>${["前期", "中期", "后期"].map((stage) => `<option value="${stage}" ${foodFilters.stage === stage ? "selected" : ""}>${stage}</option>`).join("")}</select></label>
        <div class="food-effect-filters" role="group" aria-label="按回复效果筛选">
          ${[["hunger", "饥饿"], ["sanity", "精神"], ["health", "生命"]].map(([key, label]) => `<label><input type="checkbox" data-food-effect="${key}" ${foodFilters.effects.has(key) ? "checked" : ""}><span>${label}</span></label>`).join("")}
        </div>
        <button type="button" id="food-favorites-filter" class="favorites-filter ${foodFilters.favoritesOnly ? "is-active" : ""}" aria-pressed="${foodFilters.favoritesOnly}"><span>${foodFilters.favoritesOnly ? "★" : "☆"}</span> 只看收藏</button>
        ${hasFilters ? `<button type="button" id="food-filter-reset" class="food-filter-reset">清除筛选</button>` : ""}
        <strong class="food-result-count">显示 ${cards.length} / ${quick.cards.length}</strong>
      </section>
      ${query ? `<section class="search-report"><div><span>关键词</span><strong>“${escapeHtml(query)}”</strong></div><p>找到 ${cards.length} 份食谱</p></section>` : ""}
      ${cards.length ? renderFoodTable(cards) : `<section class="empty-state"><span>☆</span><h2>没有符合条件的食谱</h2><p>换个阶段或减少勾选条件。</p><button type="button" id="food-empty-reset">清除筛选</button></section>`}
    `;
    wireFoodPage();
  }

  function resetFoodFilters(clearQuery = false) {
    foodFilters.stage = "全部";
    foodFilters.effects.clear();
    foodFilters.favoritesOnly = false;
    if (clearQuery) {
      searchInput.value = "";
      updateSearchClear();
    }
    renderFoodPage(data.quick.food);
  }

  function wireFoodPage() {
    content.querySelector("#food-stage-filter")?.addEventListener("change", (event) => {
      foodFilters.stage = event.target.value;
      renderFoodPage(data.quick.food);
    });
    content.querySelectorAll("[data-food-effect]").forEach((input) => {
      input.addEventListener("change", () => {
        if (input.checked) foodFilters.effects.add(input.dataset.foodEffect);
        else foodFilters.effects.delete(input.dataset.foodEffect);
        renderFoodPage(data.quick.food);
      });
    });
    content.querySelector("#food-favorites-filter")?.addEventListener("click", () => {
      foodFilters.favoritesOnly = !foodFilters.favoritesOnly;
      renderFoodPage(data.quick.food);
    });
    content.querySelectorAll("[data-food-stage]").forEach((select) => {
      select.addEventListener("change", () => {
        foodStageStore = { ...foodStageStore, [select.dataset.foodStage]: select.value };
        saveStoredValue(foodStageStorageKey, foodStageStore);
        renderFoodPage(data.quick.food);
      });
    });
    content.querySelectorAll("[data-food-favorite]").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.dataset.foodFavorite;
        if (foodFavorites.has(id)) foodFavorites.delete(id);
        else foodFavorites.add(id);
        saveStoredValue(foodFavoritesStorageKey, [...foodFavorites]);
        renderFoodPage(data.quick.food);
      });
    });
    content.querySelector("#food-filter-reset")?.addEventListener("click", () => resetFoodFilters(false));
    content.querySelector("#food-empty-reset")?.addEventListener("click", () => resetFoodFilters(true));
  }

  function renderEmpty(query) {
    return `<section class="empty-state"><span>🪶</span><h2>没有找到相关卡片</h2><p>换个更短的关键词试试，比如“齿轮”“冬天”或“治疗”。</p><button type="button" id="empty-clear">清除“${escapeHtml(query)}”</button></section>`;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
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
    currentChapter = defaultChapter(currentStage);
    renderStageNav();
    renderStagePage();
  });

  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) link.classList.add("is-active");
  });

  renderStageNav();
  rerender();
})();
