#!/usr/bin/env node
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.API_PORT || process.env.PORT || 8787;

app.use(cors());
app.use(express.json({ limit: '20mb' }));

// Dynamically import ESM handlers
const importHandler = async (relPath) => {
  const modPath = path.resolve(__dirname, '..', relPath);
  const modUrl = pathToFileURL(modPath).href;
  const mod = await import(modUrl);
  return mod.default || mod;
};

const asyncWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res);
  } catch (err) {
    next(err);
  }
};

const bootstrap = async () => {
  const styles = await importHandler('api/styles.js');
  const generateStickers = await importHandler('api/generate-stickers.js');
  const generateSingleSticker = await importHandler('api/generate-single-sticker.js');

  app.all('/api/styles', asyncWrapper(styles));
  app.all('/api/generate-stickers', asyncWrapper(generateStickers));
  app.all('/api/generate-single-sticker', asyncWrapper(generateSingleSticker));

  app.use((err, req, res, _next) => {
    console.error('Dev API error:', err);
    res.status(500).json({ error: 'Internal Server Error', detail: String(err?.message || err) });
  });

  app.listen(PORT, () => {
    console.log(`Dev API running at http://localhost:${PORT}`);
  });
};

bootstrap();
