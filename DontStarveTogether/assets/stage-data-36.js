(function () {
  window.GUIDE_DATA.stages = [
    {
      id: "before",
      nav: "开始前",
      days: "进入世界前",
      title: "先统一设置、分工和操作",
      sign: "世界尚未创建。",
      goal: "开洞穴、定角色、统一 MOD，并记住高频快捷键。",
      stats: ["洞穴已开启", "MOD 以顶部清单为准", "4 人分工已确认"],
      chapters: {
        setup: {
          label: "开服准备",
          cards: [
            { icon: "🌍", eyebrow: "世界", title: "创建世界", bullets: ["模式：生存", "必须开启洞穴", "其余世界参数先用默认"], footer: "MOD 不参考攻略原文；以顶部「MODs」页面为准。" },
            { icon: "👥", eyebrow: "四人", title: "开局分工", bullets: ["2 人沿海岸反向探图", "1 人找金矿、齿轮与猪王", "1 人找沼泽、洞穴与基地候选点"], footer: "发现关键地点立刻标图，约第 10 天会合建家。" },
            { icon: "🧑", eyebrow: "角色", title: "角色选择", bullets: ["新手可选温蒂、薇洛", "至少 1 人适合战斗或清小怪", "其余按熟练度选，不强制阵容"], footer: "这套 36 天流程对所有角色通用。" }
          ]
        },
        basics: {
          label: "生存基础",
          cards: [
            { icon: "❤️", eyebrow: "状态", title: "生命 / 饥饿 / 理智", bullets: ["生命归零会死亡", "饥饿归零后持续掉血", "理智过低会出现并激怒影怪"], footer: "1 游戏天约 8 分钟；每人随身保留食物。" },
            { icon: "🌑", eyebrow: "必记", title: "黑暗会直接攻击", bullets: ["黄昏前检查火把", "纯黑环境不要整理背包", "每人独立携带光源"], footer: "最少常备：草 ×2、树枝 ×2。" },
            { icon: "📦", eyebrow: "材料表", title: "数量怎么读", bullets: ["材料均按基础原料统计", "绳子、木板、石砖属于中间产物", "四人共用物资按团队总量写"], footer: "制作前再按配方精炼，避免占背包。" }
          ]
        },
        shortcuts: {
          label: "快捷键",
          cards: [
            { icon: "🔎", eyebrow: "制作", title: "C：物品查询与制作", bullets: ["打开制作搜索", "输入物品名快速定位", "再次操作完成制作"], footer: "若与 MOD 热键冲突，在控制设置中改键。" },
            { icon: "⚡", eyebrow: "制作", title: "Ctrl + 数字：快速制作", bullets: ["先给常用配方绑定数字", "推荐绑定火把、工具、护甲", "战斗前确认没有键位冲突"] },
            { icon: "📖", eyebrow: "制作栏", title: "， / .：目录翻页", bullets: ["逗号：上一页", "句号：下一页", "比鼠标逐页找配方更快"] },
            { icon: "🖱️", eyebrow: "ActionQueue", title: "Shift + 单击：加入队列", bullets: ["连续点多个目标", "角色会按顺序执行", "移动或操作键可取消队列"] },
            { icon: "🧺", eyebrow: "ActionQueue", title: "Shift + 双击：同类全选", bullets: ["双击一个目标", "选择范围内同类目标", "适合捡草、树枝和掉落物"] },
            { icon: "⬚", eyebrow: "ActionQueue", title: "Shift + 左键框选", bullets: ["拖出矩形选择区", "批量采集、砍树或挖掘", "危险区不要框得过大"] },
            { icon: "🌱", eyebrow: "ActionQueue", title: "Shift + 右键框选", bullets: ["手持可部署物：批量摆放", "装备工具：只执行该工具动作", "适合种植、铺设和整理基地"], footer: "ActionQueue 不同版本可改键；以游戏内 MOD 设置为准。" }
          ]
        }
      }
    },
    {
      id: "explore",
      nav: "基地前",
      days: "秋季 Day 1–10",
      title: "跑图、预制科技、武装全队",
      sign: "四人进入世界，基地尚未确定。",
      goal: "约第 10 天前带齐科技、齿轮与基础物资，准备落地。",
      stats: ["草 / 树枝各 40", "金子 20", "齿轮至少 1"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "1", eyebrow: "Day 1", title: "基础工具与分路", bullets: ["采草、树枝、燧石", "做斧头和火把", "沿海岸与道路分头探图"] },
            { icon: "2", eyebrow: "科技", title: "临时科学机器", bullets: ["找陨石区或金矿", "解锁背包、长矛、木甲、锤子", "敲掉机器回收材料，再预制一台"] },
            { icon: "3", eyebrow: "战利品", title: "猪人、蜘蛛与发条", bullets: ["拆猪屋拿猪皮、木板、石砖", "陷阱引蜘蛛拿蛛丝", "杀发条或翻垃圾场拿齿轮"] },
            { icon: "4", eyebrow: "地下", title: "光源与魔法科技", bullets: ["抓萤火虫 ×1", "下洞采荧光果 ×2", "抓活兔 ×4，预制灵子分解器"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "🌿", eyebrow: "常备", title: "基础资源", materials: ["草 ×40", "树枝 ×40", "木头 ×20", "燧石至少 ×3"] },
            { icon: "⛏️", eyebrow: "矿物", title: "科技资源", materials: ["金子 ×20", "石头 ×40", "齿轮至少 ×1"], footer: "齿轮优先留给冰箱。" },
            { icon: "🐷", eyebrow: "战利品", title: "猪人与蜘蛛", materials: ["猪皮 ×10", "大肉 ×2", "蛛丝 ×10", "拆屋所得木板 ×10、石砖 ×10"] },
            { icon: "💡", eyebrow: "特殊", title: "光源与魔法", materials: ["荧光果 ×2", "萤火虫 ×1", "活兔 ×4", "木炭 ×40"] }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "🪓", eyebrow: "全员", title: "采集与照明", materials: ["斧头：树枝 ×1 + 燧石 ×1", "石镐：树枝 ×2 + 燧石 ×2", "火把：草 ×2 + 树枝 ×2", "背包：草 ×4 + 树枝 ×4"] },
            { icon: "🔬", eyebrow: "预制", title: "两级科技", materials: ["科学机器：木头 ×4 + 石头 ×4 + 金子 ×1", "炼金引擎：木板 ×4 + 石砖 ×2 + 电子元件 ×2", "灵子分解器：活兔 ×4 + 木板 ×4 + 礼帽 ×1"] },
            { icon: "🛡️", eyebrow: "战斗", title: "护甲与武器", materials: ["木甲：木头 ×8 + 草 ×6", "猪皮帽：猪皮 ×1 + 草 ×3", "火腿棒：猪皮 ×1 + 树枝 ×2 + 大肉 ×2", "长矛：树枝 ×2 + 燧石 ×1 + 草 ×3"] },
            { icon: "🏮", eyebrow: "移动光源", title: "提灯与矿工帽", materials: ["提灯：树枝 ×3 + 草 ×6 + 荧光果 ×2", "矿工帽：草 ×12 + 金子 ×1 + 萤火虫 ×1", "礼帽：蛛丝 ×6"] }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "📍", eyebrow: "标图", title: "必须标记", bullets: ["试金石", "猪王与格罗姆雕像", "海象营地", "洞穴、沼泽、沙漠与牛群"] },
            { icon: "🔥", eyebrow: "技巧", title: "安全烧树", bullets: ["选隔离的约 20 棵树", "点燃后离开易燃资源", "失控可跳虫洞卸载区域"], footer: "木炭用于烹饪锅和晾肉架。" },
            { icon: "⚠️", eyebrow: "风险", title: "不要贪战", bullets: ["高脚鸟追来就跑", "发条战先穿护甲", "沼泽只快速采芦苇", "每人保留备用火把"] }
          ]
        }
      }
    },
    {
      id: "base",
      nav: "建立基地",
      days: "秋季 Day 10–20",
      title: "落地厨房、农场与食物循环",
      sign: "科技已预制，关键地形基本找到。",
      goal: "第 20 天前完成厨房、鸟笼、农场和牛群防线。",
      stats: ["冰箱 1", "烹饪锅 3", "种子 36"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "🏕️", eyebrow: "落地", title: "确定基地与清包", bullets: ["地图中心或资源交界优先", "附近有虫洞、落水洞更好", "放炼金引擎、灵子分解器和木箱"] },
            { icon: "🌕", eyebrow: "Day 11 满月", title: "格罗姆与疯猪", bullets: ["取格罗姆花", "去猪王换金", "喂猪 4 怪物肉刷粪与战利品"] },
            { icon: "🌱", eyebrow: "农场", title: "种下 36 粒种子", bullets: ["耕地机开 2×2 农地", "每阶段聊天、浇水、除草", "土豆与番茄最终各留 16 粒种子"] },
            { icon: "🐂", eyebrow: "防线", title: "牵一只牛到基地外", bullets: ["夜晚剪牛毛", "取得牛角", "牛铃绑定后放在基地外 1–2 屏"], footer: "猎犬来时引向牛群，不要贴着基地。" },
            { icon: "🐦", eyebrow: "食物链", title: "鸟笼开始换蛋", bullets: ["沼泽采芦苇", "捕鸟陷阱抓鸟", "喂熟肉换蛋做饺子"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "🍲", eyebrow: "厨房", title: "厨房材料", materials: ["3 锅：木炭 ×18、树枝 ×18、石砖 ×9", "1 冰箱：金子 ×2、齿轮 ×1、石砖 ×1", "1 火坑：木头 ×2、石头 ×12"] },
            { icon: "🐦", eyebrow: "鸟笼", title: "鸟笼材料", materials: ["芦苇 ×8", "金子 ×6", "种子 ×2", "蛛丝 ×4"] },
            { icon: "🌾", eyebrow: "农场", title: "耕种材料", materials: ["普通种子 ×36，另留 ×5", "粪 ×3", "骨渣 ×2", "木头至少 ×16"] },
            { icon: "🐂", eyebrow: "牛", title: "保暖与牵引", materials: ["牛毛 ×8", "牛角 ×1", "金子 ×3", "燧石 ×1"] }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "🍳", eyebrow: "核心", title: "厨房组", materials: ["冰箱 ×1", "烹饪锅 ×3", "石头火坑 ×1", "木箱至少 ×4"] },
            { icon: "🐦", eyebrow: "食物", title: "肉蛋循环", materials: ["鸟笼 ×1", "捕鸟陷阱 ×1", "晾肉架若干"], footer: "饺子：肉 + 蛋 + 蔬菜 + 填充物。" },
            { icon: "🌱", eyebrow: "农场", title: "耕作组", materials: ["耕地机 ×1", "锄头 ×1", "喷壶 ×1", "粪盆 ×1", "园艺帽 ×1"] },
            { icon: "🔔", eyebrow: "防御", title: "皮弗娄牛铃", materials: ["金子 ×3", "燧石 ×1"], footer: "牛停在基地外，不要把发情牛牵进厨房。" }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "📐", eyebrow: "布局", title: "控制在 7×7 地皮", bullets: ["去掉四角", "厨房靠冰箱", "农场与树林分区", "给雪球发射器留覆盖位置"] },
            { icon: "🥘", eyebrow: "常用料理", title: "先记 4 个", bullets: ["肉丸：1 肉 + 3 填充", "肉汤：肉度达到 3", "饺子：肉 + 蛋 + 菜 + 填充", "大肉干：大肉晾 2 天"] },
            { icon: "⚠️", eyebrow: "风险", title: "厨房与火分开", bullets: ["不要在建筑群烧树", "不要让牛群贴基地", "单锅怪物肉通常不超过 1 份"] }
          ]
        }
      }
    },
    {
      id: "prewinter",
      nav: "入冬准备",
      days: "秋季末 Day 20",
      title: "第 21 天前完成全队保暖",
      sign: "基地食物循环已运转，接近第 20 天。",
      goal: "每人至少一套稳定保暖方案，并携带应急火源。",
      stats: ["皮牛帽 1+", "热能石每人 1", "火把随身"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "🌡️", eyebrow: "Day 20", title: "全队保暖验收", bullets: ["每人领取热能石", "至少安排 1 顶皮牛帽", "全员补足火把与引火材料"] },
            { icon: "🔥", eyebrow: "用法", title: "把热能石烧到橙色", bullets: ["放火坑旁加热", "橙色后再出门", "变灰就找火源重新加热"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "🐂", eyebrow: "皮牛帽", title: "牛材料", materials: ["牛角 ×1 / 顶", "牛毛 ×8 / 顶"] },
            { icon: "🪨", eyebrow: "每块热能石", title: "矿物材料", materials: ["石头 ×10", "树枝 ×2", "燧石 ×5"] },
            { icon: "🔥", eyebrow: "随身", title: "应急燃料", materials: ["木头若干", "草若干", "树枝若干"], footer: "每个人单独带，不要集中在一人身上。" }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "🐂", eyebrow: "高保暖", title: "皮牛帽", materials: ["牛角 ×1", "牛毛 ×8", "炼金引擎解锁"] },
            { icon: "🪨", eyebrow: "每人 1", title: "热能石", materials: ["石头 ×10", "石镐 ×1", "燧石 ×3", "炼金引擎解锁"] },
            { icon: "🔥", eyebrow: "备用", title: "火把", materials: ["草 ×2", "树枝 ×2"], footer: "冬季远征至少带 2 把或等量材料。" }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "🥶", eyebrow: "风险", title: "看到结霜立即回温", bullets: ["不要硬赶路", "点燃孤立树应急", "回基地先加热热能石"] },
            { icon: "🧢", eyebrow: "替代", title: "没有牛角怎么办", bullets: ["每人先做冬帽", "牛毛 ×4 + 蛛丝 ×4 / 顶", "之后再升级皮牛帽"] }
          ]
        }
      }
    },
    {
      id: "winter",
      nav: "冬季",
      days: "冬季 Day 21–35",
      title: "刷海象、囤冰、补洞穴光源",
      sign: "第 21 天降温，草和浆果停止生长。",
      goal: "拿到海象牙、贝雷帽，囤足冰与荧光果并持续探图。",
      stats: ["海象牙 1", "冰 55+", "荧光果 20"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "🐘", eyebrow: "优先", title: "反复刷海象营地", bullets: ["逼海象爸爸逃跑后回头击杀", "再处理两只冰犬", "约每 2.5 天刷新，刷到牙和贝雷帽"] },
            { icon: "🧊", eyebrow: "企鹅", title: "跟企鹅找冰川", bullets: ["采冰至少 55", "留 15 过夏", "其余作为烹饪锅填充"] },
            { icon: "🕳️", eyebrow: "洞穴", title: "囤荧光果", bullets: ["进洞采荧光果 ×20", "放冰箱保存", "用于提灯和矿工帽充能"] },
            { icon: "🗺️", eyebrow: "探图", title: "找到两种沙漠", bullets: ["圆形仙人掌：龙蝇沙漠", "长条仙人掌：绿洲沙漠", "沿途继续标记海象营地"] },
            { icon: "🐕", eyebrow: "袭击", title: "把猎犬引向牛群", bullets: ["听到警告后离开基地", "绕牛群让猎犬转火", "冰猎犬死亡时保持距离"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "🐘", eyebrow: "海象", title: "核心掉落", materials: ["海象牙 ×1", "贝雷帽 ×1", "怪物肉若干"] },
            { icon: "🧊", eyebrow: "冬季限定", title: "冰块", materials: ["做菜约 ×40", "过夏预留 ×15", "有余力继续囤积"] },
            { icon: "💡", eyebrow: "地下", title: "照明补给", materials: ["荧光果 ×20"] },
            { icon: "🐕", eyebrow: "猎犬", title: "后续材料", materials: ["犬牙若干", "蓝宝石若干", "怪物肉若干"] }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "🦯", eyebrow: "移动", title: "步行手杖", materials: ["海象牙 ×1", "金子 ×2", "树枝 ×4"], footer: "全队第一根优先给探图或拉怪成员。" },
            { icon: "🍹", eyebrow: "理智", title: "蔬菜鸡尾酒", materials: ["番茄 ×2", "另一份蔬菜或番茄 ×1", "冰 ×1"], footer: "单份恢复 33 理智。" }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "❄️", eyebrow: "环境", title: "冬季变化", bullets: ["蜜蜂、蝴蝶等停止刷新", "草、树苗、浆果停止生长", "食物腐坏速度变慢", "猎犬群可能出现冰猎犬"] },
            { icon: "🐷", eyebrow: "补给", title: "疯猪循环", bullets: ["喂猪 4 怪物肉变疯猪", "获得大肉和猪皮", "地上放非肉食物换粪便"] },
            { icon: "🔥", eyebrow: "小技巧", title: "低耐久木甲当燃料", bullets: ["先做完战斗再回收", "不要烧仍可用的备用甲", "远离可燃建筑投火"] }
          ]
        }
      }
    },
    {
      id: "deerclops",
      nav: "独眼巨鹿",
      days: "冬季 Day 30 夜",
      title: "离开基地，用战场包处理巨鹿",
      sign: "约第 30 天夜听到咆哮与角色警告。",
      goal: "远离建筑击杀独眼巨鹿，取得眼球。",
      stats: ["护甲 2 套 / 人", "仙人掌 15", "新鲜火腿棒 1+"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "🏃", eyebrow: "开战前", title: "全队离开基地", bullets: ["去预定半岛或锐角地形", "告示牌放在远离顶点处", "营火与补给放战场边缘"] },
            { icon: "👁️", eyebrow: "拉怪", title: "让巨鹿先砸告示牌", bullets: ["听到咆哮后等待生成", "告示牌被砸后接近触发仇恨", "把它引回营火旁"] },
            { icon: "⚔️", eyebrow: "战斗", title: "站桩或统一走位", bullets: ["站桩：轮换 2 套甲并吃饺子", "走位：攻击前摇时后退侧移", "全队站同侧，不要包围"] },
            { icon: "🧠", eyebrow: "精神", title: "及时吃烤仙人掌", bullets: ["不要站在巨鹿正下方", "影怪出现前补精神", "低血先退，不要边翻包边挨打"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "🛡️", eyebrow: "每人", title: "战斗装备", materials: ["木甲或猪皮帽共 2 套", "主武器 ×1", "备用武器 ×1"] },
            { icon: "🥟", eyebrow: "补给", title: "生命与理智", materials: ["饺子或烤土豆若干", "仙人掌 ×15", "火坑燃料至少 ×3"] },
            { icon: "🪵", eyebrow: "战场", title: "诱导材料", materials: ["木头 ×4 做告示牌", "木头 ×2 + 草 ×3 做营火"] }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "🪧", eyebrow: "诱饵", title: "告示牌", materials: ["木板 ×1", "即基础木头 ×4"] },
            { icon: "🔥", eyebrow: "战场", title: "营火", materials: ["木头 ×2", "草 ×3"] },
            { icon: "🥩", eyebrow: "临战制作", title: "新鲜火腿棒", materials: ["猪皮 ×1", "树枝 ×2", "大肉 ×2"] }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "🎁", eyebrow: "掉落", title: "战后收获", bullets: ["独眼巨鹿眼球 ×1", "大肉若干", "眼球留给春季眼球伞"] },
            { icon: "⚠️", eyebrow: "风险", title: "最常见失误", bullets: ["留在基地等 Boss", "护甲破了没换", "四人围怪导致技能方向混乱", "低理智时继续贪刀"] }
          ]
        }
      }
    },
    {
      id: "spring",
      nav: "春季准备",
      days: "冬末 Day 35–36",
      title: "在入春前解决防雨与防雷",
      sign: "独眼巨鹿已处理，接近第 36 天。",
      goal: "做眼球伞与避雷针；眼球不足时准备替代雨具。",
      stats: ["眼球伞 1", "避雷针 1+", "替代雨具 3 套"],
      chapters: {
        events: {
          label: "重要事件",
          cards: [
            { icon: "☂️", eyebrow: "雨具", title: "分配独眼巨鹿眼球", bullets: ["优先做眼球伞", "给长期外出的成员", "其余人使用猪皮帽 + 雨伞"] },
            { icon: "⚡", eyebrow: "基地", title: "检查避雷针覆盖", bullets: ["覆盖科技、厨房与仓库", "边缘建筑也要检查", "必要时补第二根"] },
            { icon: "🧵", eyebrow: "维护", title: "犬牙留给针线包", bullets: ["春季修雨具", "不要把犬牙全部做陷阱", "战斗装备统一放维护箱"] }
          ]
        },
        materials: {
          label: "收集材料",
          cards: [
            { icon: "👁️", eyebrow: "眼球伞", title: "Boss 掉落与基础材料", materials: ["独眼巨鹿眼球 ×1", "树枝 ×15", "骨片 ×4"] },
            { icon: "⚡", eyebrow: "避雷针", title: "矿物", materials: ["金子 ×4", "石头 ×3"] },
            { icon: "☂️", eyebrow: "替代雨具", title: "备用材料", materials: ["猪皮若干", "蛛丝若干", "树枝若干", "触手皮 ×2 / 雨衣"] }
          ]
        },
        crafts: {
          label: "制作物品",
          cards: [
            { icon: "👁️", eyebrow: "最佳方案", title: "眼球伞", materials: ["独眼巨鹿眼球 ×1", "树枝 ×15", "骨片 ×4"], footer: "100% 防雨并防雷。" },
            { icon: "⚡", eyebrow: "基地必做", title: "避雷针", materials: ["金子 ×4", "石砖 ×1"], footer: "单根未必覆盖全部扩建区。" },
            { icon: "☂️", eyebrow: "多人替代", title: "猪皮帽 + 雨伞", materials: ["猪皮帽 ×1", "雨伞 ×1"], footer: "防雨足够，但不防雷。" },
            { icon: "🧥", eyebrow: "替代", title: "雨衣", materials: ["触手皮 ×2", "绳子 ×2", "骨片 ×2"], footer: "100% 防雨并防雷，占身体栏。" }
          ]
        },
        other: {
          label: "其他",
          cards: [
            { icon: "🌧️", eyebrow: "春季", title: "第 36 天后的威胁", bullets: ["频繁降雨与雷电", "淋湿会持续掉理智", "青蛙雨与麋鹿鹅", "湿装备可能从手中滑落"] },
            { icon: "🧵", eyebrow: "维护", title: "针线包用途", bullets: ["修眼球伞", "修冬帽和皮牛帽", "团队维护箱常备 1–2 个"] },
            { icon: "⚠️", eyebrow: "验收", title: "入春前检查", bullets: ["避雷针已通电覆盖", "每人有雨具", "箱中有干燥燃料", "农场与战斗物资已归位"] }
          ]
        }
      }
    }
  ];
})();
