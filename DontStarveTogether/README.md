# 饥荒联机版四人开荒指南

面向四人联机的新手速查网站。首页按开局阶段原地切换内容，顶部五个分类分别进入独立速查页面；所有页面都支持当前范围内的卡片搜索。

## 页面

- `index.html`：开局、建家、冬天前、中期、Boss 准备
- `mods.html`：服务器 / 客户端 MOD
- `food.html`：常用料理、效果与材料来源
- `buildings.html`：建筑配方与用途
- `gear.html`：装备配方与使用场景
- `locations.html`：关键地点与资源

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 4173
```

打开 `http://localhost:4173/DontStarveTogether/`。

内容基于 `DraftGuide.xlsx` 整理，并参考 [Don't Starve Wiki](https://dontstarve.wiki.gg/) 校正关键配方。
