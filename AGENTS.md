# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── chapters/       # 课程章节页面
│   │   │   └── [slug]/     # 章节详情页（动态路由）
│   │   ├── tools/          # 化工计算工具
│   │   │   ├── reynolds/   # 雷诺数计算器
│   │   │   ├── friction/   # 流体阻力计算器
│   │   │   └── heat-transfer/ # 传热系数估算器
│   │   ├── quiz/           # 自测练习
│   │   ├── layout.tsx      # 根布局
│   │   ├── page.tsx        # 首页
│   │   └── globals.css     # 全局样式
│   ├── components/
│   │   ├── ui/             # Shadcn UI 组件库
│   │   └── site-layout.tsx # 网站导航栏与页脚
│   ├── hooks/              # 自定义 Hooks
│   └── lib/
│       ├── chapters.ts     # 章节数据（9大章节核心内容）
│       └── utils.ts        # 通用工具函数
├── DESIGN.md               # 设计规范文档
├── next.config.ts          # Next.js 配置
└── package.json            # 项目依赖管理
```

## 页面路由

| 路由 | 说明 | 类型 |
|------|------|------|
| `/` | 首页 - 课程概览与导航 | 静态 |
| `/chapters` | 章节列表页 | 静态 |
| `/chapters/[slug]` | 章节详情页（含知识点Tab） | 动态路由 |
| `/tools` | 计算工具列表页 | 静态 |
| `/tools/reynolds` | 雷诺数计算器 | 客户端交互 |
| `/tools/friction` | 流体阻力计算器 | 客户端交互 |
| `/tools/heat-transfer` | 传热系数估算器 | 客户端交互 |
| `/quiz` | 自测练习（10题选择题） | 客户端交互 |

## 9大课程章节

1. 流体流动 - 静力学、伯努利方程、雷诺数、阻力计算
2. 流体输送机械 - 离心泵、风机、压缩机
3. 非均相物系分离 - 沉降、过滤、离心分离
4. 传热 - 热传导、对流传热、换热器
5. 蒸发 - 单效/多效蒸发
6. 蒸馏 - 汽液平衡、精馏计算、McCabe-Thiele
7. 吸收 - 亨利定律、双膜理论、吸收塔
8. 萃取 - 液液萃取、相图、级数计算
9. 干燥 - 湿空气、干燥速率、恒速/降速段

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。

## 开发规范

- TypeScript strict 模式
- 禁止隐式 any 和 as any
- 客户端交互组件使用 'use client' 指令
- Hydration 预防：动态数据使用 useEffect + useState 确保仅在客户端挂载后渲染
- UI 采用 shadcn/ui 组件规范