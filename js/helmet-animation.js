/**
 * SOUMYADEEP DEY — HERO 3D HELMET ANIMATION CONTROLLER
 * High-performance Canvas frame sequence renderer with smooth LERP scrubbing,
 * progressive preloading, nearest-frame fallback, and IntersectionObserver pausing.
 */

(function () {
  'use strict';

  const TOTAL_FRAMES = 240;
  const LERP_FACTOR = 0.085;
  const CONCURRENCY_LIMIT = 8;

  // DOM Elements
  const canvas = document.getElementById('hero-helmet-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  const heroSection = document.getElementById('home');

  // State
  const images = new Array(TOTAL_FRAMES);
  const loadedMap = new Uint8Array(TOTAL_FRAMES); // 0: unrequested, 1: loading, 2: loaded, 3: error
  let loadedCount = 0;
  let isFirstFrameRendered = false;
  let isHeroVisible = true;

  // Physics / Scrub State
  let targetProgress = 0; // [0, 1]
  let currentProgress = 0; // [0, 1] smoothed
  let renderedFrameIndex = -1;
  let isDirty = true;

  // Viewport Layout Cache
  let drawX = 0, drawY = 0, drawW = 0, drawH = 0;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function getFrameUrl(index) {
    const frameNum = String(index + 1).padStart(4, '0');
    return `./assets/helmet-frames/frame_${frameNum}.webp`;
  }

  function getFallbackFrameUrl(index) {
    const frameNum = String(index + 1).padStart(4, '0');
    return `./assets/helmet-frames/frame_${frameNum}.png`;
  }

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Source aspect ratio is 1920 / 1080 (16:9)
    const sourceAspect = 1920 / 1080;
    const canvasAspect = canvas.width / canvas.height;

    if (canvasAspect > sourceAspect) {
      drawW = canvas.width;
      drawH = Math.round(canvas.width / sourceAspect);
      drawX = 0;
      drawY = Math.round((canvas.height - drawH) * 0.35); // Focus slightly towards helmet crown
    } else {
      drawH = canvas.height;
      drawW = Math.round(canvas.height * sourceAspect);
      drawX = Math.round((canvas.width - drawW) / 2);
      drawY = 0;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    isDirty = true;
  }

  function loadSingleFrame(index) {
    if (loadedMap[index] !== 0) return Promise.resolve(images[index]);

    loadedMap[index] = 1;
    return new Promise((resolve) => {
      const img = new Image();
      img.decoding = 'async';

      img.onload = () => {
        images[index] = img;
        loadedMap[index] = 2;
        loadedCount++;
        onFrameReady(index);
        resolve(img);
      };

      img.onerror = () => {
        const fallback = new Image();
        fallback.decoding = 'async';
        fallback.onload = () => {
          images[index] = fallback;
          loadedMap[index] = 2;
          loadedCount++;
          onFrameReady(index);
          resolve(fallback);
        };
        fallback.onerror = () => {
          loadedMap[index] = 3;
          resolve(null);
        };
        fallback.src = getFallbackFrameUrl(index);
      };

      img.src = getFrameUrl(index);
    });
  }

  function onFrameReady(index) {
    if (index === 0 && !isFirstFrameRendered) {
      isFirstFrameRendered = true;
      drawFrame(0);
      renderedFrameIndex = 0;
    }
  }

  async function preloadFrames() {
    // 1. Initial visual
    await loadSingleFrame(0);

    // If reduced motion, stop after first frame
    if (prefersReducedMotion) return;

    // 2. Coarse keyframes (every 8th) for instant scrubbing
    const keyframePromises = [];
    for (let i = 8; i < TOTAL_FRAMES; i += 8) {
      keyframePromises.push(loadSingleFrame(i));
    }
    await Promise.all(keyframePromises);

    // 3. Queue remaining frames with worker pool
    const queue = [];
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      if (loadedMap[i] === 0) queue.push(i);
    }

    const worker = async () => {
      while (queue.length > 0) {
        const next = queue.shift();
        await loadSingleFrame(next);
      }
    };

    const pool = [];
    for (let w = 0; w < CONCURRENCY_LIMIT; w++) {
      pool.push(worker());
    }
    await Promise.all(pool);
  }

  function getNearestLoadedFrame(targetIndex) {
    if (loadedMap[targetIndex] === 2 && images[targetIndex]) {
      return images[targetIndex];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && loadedMap[prev] === 2 && images[prev]) return images[prev];
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && loadedMap[next] === 2 && images[next]) return images[next];
    }
    return images[0] || null;
  }

  function drawFrame(index) {
    const img = getNearestLoadedFrame(index);
    if (!img) return;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }

  function animate() {
    if (!isPageVisible) {
      requestAnimationFrame(animate);
      return;
    }

    if (!prefersReducedMotion) {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * LERP_FACTOR;
      } else {
        currentProgress = targetProgress;
      }
    }

    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1)))
    );

    if (frameIndex !== renderedFrameIndex || isDirty) {
      drawFrame(frameIndex);
      renderedFrameIndex = frameIndex;
      isDirty = false;
    }

    requestAnimationFrame(animate);
  }

  // Scroll mapping: maps scroll across the entire website from top to bottom
  function handleScroll() {
    if (prefersReducedMotion) return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const maxScroll = Math.max(1, docHeight - winHeight);
    
    // Map scroll down the entire website into full 3D rotation sequence
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
    targetProgress = progress;
  }

  // Interactive Drag on any background area
  let isDragging = false;
  let startX = 0;
  let startProgress = 0;

  function setupInteractiveDrag() {
    window.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking on interactive elements
      if (e.target.closest('a, button, input, textarea, select, .project-card, .cert-card, .contact-card, .timeline-content, .nav-menu')) return;
      isDragging = true;
      startX = e.clientX;
      startProgress = targetProgress;
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging || prefersReducedMotion) return;
      const deltaX = e.clientX - startX;
      const progressDelta = (deltaX / (window.innerWidth || 1000)) * 0.75;
      targetProgress = Math.min(1, Math.max(0, startProgress + progressDelta));
    });

    const stopDrag = () => {
      if (isDragging) isDragging = false;
    };

    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
  }

  let isPageVisible = true;

  function setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) isDirty = true;
    });
  }

  function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    setupInteractiveDrag();
    setupVisibilityListener();

    requestAnimationFrame(animate);
    preloadFrames();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
