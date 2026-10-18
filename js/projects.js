/**
 * SOUMYADEEP DEY — FEATURED PROJECTS DATA & CONTROLLER
 * Data-driven architecture supporting dynamic filtering and modal inspection
 */

const PROJECTS_DATA = [
  {
    id: 'trailmind-ai',
    title: 'TrailMind AI',
    subtitle: 'AI-Powered Outdoor Companion & Mission Engine',
    category: ['ai-ml', 'full-stack'],
    description:
      'An AI-assisted outdoor exploration platform featuring personalized missions, adventure tracking, sensory reflections, and memory workflows. Built with a decoupled local/cloud AI architecture allowing offline and online mission intelligence.',
    image: './assets/projects/trailmind.png',
    tags: ['React', 'TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Ollama', 'REST APIs', 'Vercel'],
    features: [
      'AI-assisted outdoor missions with dynamic difficulty adaptation',
      'Continuous adventure trajectory tracking and waypoint checkpointing',
      'Multi-modal sensory reflection workflows with automated summarization',
      'Dual-tier AI architecture supporting both local Ollama LLMs and cloud APIs',
      'High-performance asynchronous FastAPI REST backend with relational PostgreSQL storage'
    ],
    github: 'https://github.com/SOUMYADEEPDEY1217/TrailMind-AI',
    demo: null,
    badge: 'AI + Full-Stack'
  },
  {
    id: 'pitchcraft-ai',
    title: 'PitchCraft AI',
    subtitle: 'AI Business Pitch Generator & Strategy Suite',
    category: ['ai-ml', 'web-dev'],
    description:
      'A browser-based AI platform that empowers entrepreneurs and freelancers to transform raw business ideas into structured, high-conviction pitch content, reusable presentation templates, and executive summaries.',
    image: './assets/projects/pitchcraft.png',
    tags: ['Generative AI', 'LLM Workflows', 'JavaScript', 'HTML5/CSS3', 'Vercel'],
    features: [
      'Interactive pitch-generation workflows based on venture stage and target audience',
      'Reusable presentation-oriented slide deck templates (Y-Combinator, Guy Kawasaki, One-Pager)',
      'Structured content generation including Problem/Solution framing and Traction metrics',
      'Responsive, instant-render web interface deployed live on Vercel'
    ],
    github: 'https://github.com/SOUMYADEEPDEY1217/PitchCraft-AI',
    demo: 'https://pitchcraft-ai-seven.vercel.app/',
    badge: 'Live Application'
  },
  {
    id: 'stationery-store',
    title: 'Stationery Store Management System',
    subtitle: 'Inventory & Sales Management Architecture',
    category: ['academic', 'web-dev'],
    description:
      'An academic software engineering project featuring retail inventory management workflows, an administrative control dashboard, relational data modeling, and rigorous system engineering documentation.',
    image: './assets/projects/stationery.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'SQL', 'SRS', 'ER Diagrams', 'DFD Modeling'],
    features: [
      'Administrative dashboard for catalog management, stock ledger, and supplier logs',
      'Retail sales transaction workflows with automated low-stock threshold triggers',
      'Complete Software Requirements Specification (SRS) and IEEE-aligned system models',
      'Entity-Relationship Diagrams (ERD) normalized to 3NF and Data-Flow Diagrams (DFD Level 0/1/2)'
    ],
    github: null,
    demo: null,
    badge: 'Software Engineering'
  }
];

// Controller
(function () {
  'use strict';

  let activeFilter = 'all';

  function initProjects() {
    renderProjects(activeFilter);
    setupFilterButtons();
    setupModalListeners();
  }

  function renderProjects(filter) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    const filtered =
      filter === 'all'
        ? PROJECTS_DATA
        : PROJECTS_DATA.filter((p) => p.category.includes(filter));

    grid.innerHTML = filtered
      .map(
        (project) => `
        <article class="project-card" data-id="${project.id}">
          <div class="project-image-wrapper">
            <img src="${project.image}" alt="${project.title} Preview" class="project-image" loading="lazy" />
            <div class="project-overlay">
              <button class="btn-project-action view-details-btn" data-id="${project.id}" aria-label="View details of ${project.title}">
                <span>VIEW SPECS</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg>
              </button>
            </div>
            ${project.badge ? `<span class="project-badge">${project.badge}</span>` : ''}
          </div>
          <div class="project-content">
            <div class="project-header">
              <h3 class="project-title">${project.title}</h3>
              <p class="project-subtitle">${project.subtitle}</p>
            </div>
            <p class="project-desc">${project.description}</p>
            <div class="project-tags">
              ${project.tags
                .slice(0, 4)
                .map((tag) => `<span class="project-tag">${tag}</span>`)
                .join('')}
              ${project.tags.length > 4 ? `<span class="project-tag-more">+${project.tags.length - 4}</span>` : ''}
            </div>
            <div class="project-footer">
              <button class="btn-text-action view-details-trigger" data-id="${project.id}">
                Details &amp; Architecture →
              </button>
              <div class="project-links">
                ${
                  project.github
                    ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link-icon" title="View Source on GitHub" aria-label="GitHub Repository">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                      </a>`
                    : ''
                }
                ${
                  project.demo
                    ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-link-icon active" title="Open Live Deployment" aria-label="Live Demo">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      </a>`
                    : ''
                }
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');
  }

  function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects(activeFilter);
      });
    });
  }

  function setupModalListeners() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.view-details-btn, .view-details-trigger');
      if (target) {
        const id = target.getAttribute('data-id');
        openProjectModal(id);
      }
    });

    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeProjectModal();
    });
  }

  function openProjectModal(id) {
    const project = PROJECTS_DATA.find((p) => p.id === id);
    const modal = document.getElementById('project-modal');
    if (!project || !modal) return;

    const modalBody = document.getElementById('modal-content-slot');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-project-view">
        <div class="modal-banner">
          <img src="${project.image}" alt="${project.title}" class="modal-image" />
        </div>
        <div class="modal-header-info">
          <div class="modal-title-row">
            <h2 class="modal-title">${project.title}</h2>
            ${project.badge ? `<span class="modal-badge">${project.badge}</span>` : ''}
          </div>
          <p class="modal-subtitle">${project.subtitle}</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-heading">Executive Overview</h4>
          <p class="modal-text">${project.description}</p>
        </div>
        <div class="modal-section">
          <h4 class="modal-heading">Technical Highlights &amp; Architecture</h4>
          <ul class="modal-feature-list">
            ${project.features.map((f) => `<li><span class="feature-bullet">✦</span> ${f}</li>`).join('')}
          </ul>
        </div>
        <div class="modal-section">
          <h4 class="modal-heading">Technology Stack</h4>
          <div class="modal-tags">
            ${project.tags.map((t) => `<span class="modal-tag">${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-actions">
          ${
            project.github
              ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
                  <span>Explore Repository</span>
                </a>`
              : ''
          }
          ${
            project.demo
              ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  <span>Launch Live Demo</span>
                </a>`
              : ''
          }
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Self-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjects);
  } else {
    initProjects();
  }
})();
