# Stickerfy

🎨 Turn any selfie into a custom sticker set with AI-powered Gemini technology

## Features

- 📸 **Camera & Upload Support**: Take photos with your device camera or upload existing images
- 🎨 **Multiple Art Styles**: Choose from 12 unique styles including Pop Art, Pixel Art, Claymation, and more
- 😊 **8 Emotions**: Generate stickers for Happy, Sad, Angry, Surprised, Laughing, Love, Winking, and Confused
- 📱 **Mobile Optimized**: Works seamlessly on iOS, Android, and desktop devices
- 🌍 **Multi-language**: Supports English, Japanese, and Chinese
- 📄 **Sticker Sheets**: Generate and download complete sticker sheets
- 📦 **Bulk Download**: Download all stickers as a ZIP file

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 2.5 Flash Image Preview
- **Deployment**: Vercel
- **Build Tools**: ESLint, Prettier

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

### Manual Deployment

```bash
vercel --prod
```

## Environment Setup

To use the AI features, you'll need to set up your Gemini API key:

1. **Get your API key**: Visit [Google AI Studio](https://ai.google.dev/) and create a new API key

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Add your API key** to `.env`:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **For Vercel deployment**, add the environment variable in your Vercel dashboard:
   - Go to your project settings in Vercel
   - Navigate to "Environment Variables"
   - Add `VITE_GEMINI_API_KEY` with your API key value
   - Make sure to add it for all environments (Production, Preview, Development)
   - Redeploy your application after adding the environment variable

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