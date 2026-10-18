import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 3000,
    host: true,
    open: false,
  },
  plugins: [
    {
      name: 'serve-frames-middleware',
      configureServer(server) {
        server.middlewares.use('/Frames', (req, res, next) => {
          const rawUrl = req.url || '';
          const cleanPath = decodeURIComponent(rawUrl.split('?')[0].replace(/^\/+/, ''));
          const framePath = path.resolve(process.cwd(), 'Frames', cleanPath);

          if (fs.existsSync(framePath) && fs.statSync(framePath).isFile()) {
            const ext = path.extname(framePath).toLowerCase();
            const mime = ext === '.webp' ? 'image/webp' : 'image/png';
            res.setHeader('Content-Type', mime);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            fs.createReadStream(framePath).pipe(res);
            return;
          }
          next();
        });
      }
    }
  ]
});
