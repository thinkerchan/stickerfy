# Stickerfy

🎨 Turn any selfie into a custom sticker set with AI

## 项目结构

此项目使用标准的 Vercel 部署结构：

```
stickerfy/
├── src/               # React 前端源码
├── api/               # Vercel Functions 后端 API
├── public/            # 静态资源
├── package.json       # 前端依赖配置
└── vercel.json        # Vercel 部署配置
```

## 功能特性

- 🖼️ 上传自拍照片或使用摄像头拍照
- 🎨 选择多种艺术风格（波普艺术、像素艺术、黏土动画等）
- 😊 生成 8 种不同情绪的贴纸
- 📱 支持移动端和桌面端
- 🌐 多语言支持（中文、英文、日文）
- 📥 单个或批量下载贴纸
- 🎯 生成贴纸合集图片

## 安全改进

### 之前的安全问题
- ❌ 前端明文传输 Gemini API Key
- ❌ API Key 暴露在客户端代码中
- ❌ 无服务端验证和限流

### 现在的安全特性
- ✅ API Key 安全存储在 Vercel 环境变量中
- ✅ 使用 Vercel Functions 作为后端
- ✅ 实现了 API 限流和防护
- ✅ 添加了 CORS 和安全头
- ✅ 输入验证和错误处理
- ✅ 前后端分离架构

## 技术栈

### 前端
- **React 18**: 用户界面框架
- **Vite**: 构建工具和开发服务器
- **Tailwind CSS**: 样式框架
- **JSZip**: 批量下载功能
- **html2canvas**: 贴纸合集生成

### 后端
- **Vercel Functions**: 无服务器函数
- **Node.js**: 运行时环境
- **Express**: Web 应用框架
- **CORS**: 跨域资源共享
- **Helmet**: 安全头设置
- **express-rate-limit**: API 限流
- **dotenv**: 环境变量管理

## 快速开始

### 环境要求
- Node.js >= 18.0.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

开发模式下需要使用 Vercel 的开发服务器来模拟 API Functions：

```bash
# 启动 Vercel 开发服务器（包含前端和 API）
npm run dev

# 或者单独启动 Vite 开发服务器（仅前端）
npm run dev:vite
```

**注意**: 使用 `npm run dev` 能同时启动前端和后端 API，推荐使用这种方式开发。

### 生产构建

```bash
npm run build
```

### 本地预览

```bash
npm run preview
```

## Vercel 部署

项目已配置为适合 Vercel 部署的 monorepo 结构：

1. **前端**：构建为静态文件，部署到 Vercel 的边缘网络
2. **后端**：部署为 Vercel Functions（无服务器函数）

### 部署步骤

1. Fork 或 clone 此仓库
2. 在 Vercel 中导入项目
3. 设置环境变量：
   - `GEMINI_API_KEY`: 你的 Gemini API Key
   - `NODE_ENV`: production
4. 部署

### 环境变量设置

在 Vercel 项目设置中添加以下环境变量：

- `GEMINI_API_KEY`: 从 [Google AI Studio](https://ai.google.dev/) 获取
- `NODE_ENV`: `production`

### 部署故障排除

如果遇到 404 错误：

1. **检查构建日志**：确保前端和后端都构建成功
2. **验证环境变量**：确保 `GEMINI_API_KEY` 已设置
3. **重新部署**：有时需要触发重新部署
4. **检查函数日志**：在 Vercel 控制台查看函数执行日志

如果 API 请求失败：

1. **检查 CORS 配置**：确保你的域名在后端 CORS 配置中
2. **验证路由**：确保 `/api/*` 路由正确指向后端函数
3. **检查函数超时**：确保 API 调用在函数超时限制内完成

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers with camera support

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Powered by Google Gemini AI
- Icons from Lucide React
- Fonts from Google Fonts