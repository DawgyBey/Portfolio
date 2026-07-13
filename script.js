(function () {
      const STORAGE_KEY = 'portfolio-data-v6';

      if (!window.storage) {
        window.storage = {
          get: function (key) {
            return Promise.resolve({ value: localStorage.getItem(key) });
          },
          set: function (key, value) {
            localStorage.setItem(key, value);
            return Promise.resolve();
          }
        };
      }

      const ICONS = {
        code: '<polyline points="8,6 3,12 8,18"/><polyline points="16,6 21,12 16,18"/>',
        web: '<rect x="3" y="4" width="18" height="14" rx="1"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="18" x2="12" y2="21"/>',
        network: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><line x1="6" y1="8" x2="12" y2="16"/><line x1="18" y1="8" x2="12" y2="16"/>',
        brain: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>',
        chip: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><rect x="14" y="14" width="6" height="6"/><line x1="10" y1="7" x2="14" y2="7"/><line x1="10" y1="17" x2="14" y2="17"/><line x1="7" y1="10" x2="7" y2="14"/><line x1="17" y1="10" x2="17" y2="14"/>',
        grid: '<circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="6" r="2.2"/><circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="18" r="2.2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="6" y1="8" x2="6" y2="16"/><line x1="18" y1="8" x2="18" y2="16"/><line x1="8" y1="18" x2="16" y2="18"/>',
        cloud: '<path d="M6 17a4 4 0 0 1 0-8 5 5 0 0 1 9.6-1.6A4.5 4.5 0 0 1 18 17H6z"/>',
        signal: '<path d="M4 12h4l2-6 4 12 2-6h4"/>',
        star: '<path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/>',
        clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
        folder: '<path d="M3 6h6l2 3h10v10H3z"/>',
        doc: '<path d="M6 3h9l5 5v13H6z"/><path d="M15 3v5h5"/>',
        branch: '<circle cx="6" cy="6" r="2"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="15" r="2"/><path d="M6 8v8"/><path d="M6 8a6 6 0 0 0 12 6"/>'
      };

      const DEFAULT_DATA = {
        profile: {
          firstName: 'Sulav',
          lastName: 'Nepal',
          monogram: 'SN',
          role: 'Student & Aspiring Software Developer (Class of 2026)',
          verticalText: 'The Builders — Class Of 2026'
        },
        about: {
          lede: 'Aspiring <span class="signal-text">software developer</span> focused on building clean web applications and learning data science.',
          bio: [
            'I am a passionate computer science student who started coding with basic programming concepts and quickly fell in love with software development. I enjoy building functional websites and exploring data analysis libraries.',
            'Currently pursuing my degree, I am focused on mastering core software engineering practices, learning Python, and collaborating on academic and open-source projects to solve real-world problems.'
          ],
          stats: [
            { num: '4', label: 'Years learning' },
            { num: '12', label: 'Projects built' },
            { num: '500+', label: 'GitHub commits' }
          ]
        },
        contact: {
          email: 'sulavinjob@gmail.com',
          linkedin: 'https://www.linkedin.com/in/sulav-nepal/',
          twitter: 'https://x.com/Dawgybey',
          githubUser: 'DawgyBey'
        },
        timeline: [
          { year: '2022', title: 'Intro to C programming', desc: 'Learned fundamental concepts like variables, loops, conditional logic, and memory allocation.', icon: 'code' },
          { year: '2023', title: 'HTML, CSS, JS', desc: 'Started building dynamic web pages, learning about DOM manipulation, responsive layouts, and CSS styling.', icon: 'web' },
          { year: '2024', title: 'Python Basic', desc: 'Learned Python programming, writing automation scripts, sorting algorithms, and working with CLI apps.', icon: 'network' },
          { year: '2025', title: 'UI/UX Design', desc: 'Discovered wireframing, layout hierarchy, and user-centric design principles in Figma.', icon: 'star' },
          { year: '2026', title: 'Pandas, Numpy model training', desc: 'Exploring data science, training basic regression models, and data visualization.', icon: 'brain' }
        ],
        projects: [
          { title: 'Lumina', desc: 'A seamless fusion of computer vision and architectural glass. Designed to empower the modern campus with Invisible Intelligence.', tag: 'Academic Project · 2026', link: 'https://github.com/sunwaycollege-research/lumina_smart_mirror' },
          { title: 'Incanto', desc: 'An AI-powered gift and product finder that helps users discover personalized recommendations using intelligent matching and real-time e-commerce data.', tag: 'Personal Project · 2026', link: 'https://github.com/DawgyBey/Incanto' }
        ],
        papers: [
          { title: 'Optimizing High-Altitude Logistics through AI-Driven Predictive Modeling', desc: 'An exploration into how machine learning can revolutionize trekking logistics in the Himalayas, predicting weather patterns and resource requirements for safer expeditions.', tag: 'Research Paper · 2024', link: 'assets/GuardNet Final Research Paper.pdf' }
        ],
        github: [
          { title: 'sorting-visualizer', desc: 'Visual animation of basic sorting algorithms built with Javascript and HTML5 canvas.', tag: 'MIT license', link: '' },
          { title: 'task-tracker-cli', desc: 'Python command line application for tracking tasks and to-do lists.', tag: 'Apache 2.0', link: '' },
          { title: 'housing-predictor', desc: 'Python Jupyter Notebook containing the NumPy/Pandas analysis of real estate datasets.', tag: 'MIT license', link: '' }
        ]
      };

      function esc(s) {
        const d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
      }

      function clone(o) { return JSON.parse(JSON.stringify(o)); }

      let state = clone(DEFAULT_DATA);
      let editMode = false;
      let saveTimer = null;

      async function loadState() {
        try {
          const res = await window.storage.get(STORAGE_KEY, false);
          if (res && res.value) {
            const parsed = JSON.parse(res.value);
            state = Object.assign(clone(DEFAULT_DATA), parsed);
          }
        } catch (e) {
          state = clone(DEFAULT_DATA);
        }
      }

      function queueSave() {
        clearTimeout(saveTimer);
        saveTimer = setTimeout(async () => {
          try {
            await window.storage.set(STORAGE_KEY, JSON.stringify(state), false);
          } catch (e) {
            console.error('Could not save portfolio data', e);
          }
        }, 400);
      }

      function iconSelectHtml(section, index, current) {
        let opts = '';
        Object.keys(ICONS).forEach(key => {
          opts += '<option value="' + key + '"' + (key === current ? ' selected' : '') + '>' + key + '</option>';
        });
        return '<select class="icon-select" data-section="' + section + '" data-index="' + index + '" data-icon-picker>' + opts + '</select>';
      }

      function renderTimeline() {
        const el = document.getElementById('timeline-list');
        el.innerHTML = state.timeline.map((item, i) => (
          '<div class="t-item" data-index="' + i + '">' +
          '<button class="del-btn" data-section="timeline" data-index="' + i + '" type="button" aria-label="Remove entry">&times;</button>' +
          '<span class="t-year" contenteditable="true" data-section="timeline" data-index="' + i + '" data-field="year">' + esc(item.year) + '</span>' +
          '<span class="t-dot"></span>' +
          iconSelectHtml('timeline', i, item.icon) +
          '<svg class="t-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' + (ICONS[item.icon] || ICONS.star) + '</svg>' +
          '<div class="t-title" contenteditable="true" data-section="timeline" data-index="' + i + '" data-field="title">' + esc(item.title) + '</div>' +
          '<div class="t-desc" contenteditable="true" data-section="timeline" data-index="' + i + '" data-field="desc">' + esc(item.desc) + '</div>' +
          '</div>'
        )).join('');
      }

      function cardHtml(section, item, i, indexLabel, iconKey) {
        const linkHtml = (item.link || editMode)
          ? '<a class="card-link" data-section="' + section + '" data-index="' + i + '" data-field="link" contenteditable="true" href="' + esc(item.link || '#') + '" onclick="return window.__pf_linkClick(event,this)">' + (item.link ? esc(item.link) : 'add a link') + '</a>'
          : '';
        return (
          '<div class="card" data-index="' + i + '">' +
          '<button class="del-btn" data-section="' + section + '" data-index="' + i + '" type="button" aria-label="Remove entry">&times;</button>' +
          '<div class="card-index"><svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' + ICONS[iconKey] + '</svg>' + indexLabel + '</div>' +
          '<div>' +
          '<div class="card-title" contenteditable="true" data-section="' + section + '" data-index="' + i + '" data-field="title">' + esc(item.title) + '</div>' +
          '<div class="card-desc" contenteditable="true" data-section="' + section + '" data-index="' + i + '" data-field="desc">' + esc(item.desc) + '</div>' +
          linkHtml +
          '</div>' +
          '<div class="card-tag" contenteditable="true" data-section="' + section + '" data-index="' + i + '" data-field="tag">' + esc(item.tag) + '</div>' +
          '</div>'
        );
      }

      function renderCards(section, containerId, iconKey) {
        const el = document.getElementById(containerId);
        const items = state[section];
        el.innerHTML = items.map((item, i) => cardHtml(section, item, i, String(i + 1).padStart(2, '0'), iconKey)).join('')
          + '<div class="add-card"><button class="add-btn" data-add="' + section + '" type="button">+ Add entry</button></div>';
      }

      function renderProfile() {
        const p = state.profile || DEFAULT_DATA.profile;
        const monogramEl = document.getElementById('monogram-logo');
        if (monogramEl) monogramEl.innerHTML = esc(p.monogram) + '<span class="dot"></span>';
        const mastheadEl = document.getElementById('hero-masthead');
        if (mastheadEl) mastheadEl.textContent = p.verticalText;
        const nameEl = document.getElementById('hero-name');
        if (nameEl) nameEl.innerHTML = '<span class="first-name">' + esc(p.firstName) + '</span> <span class="last-name">' + esc(p.lastName) + '</span>';
        const roleEl = document.getElementById('hero-role');
        if (roleEl) roleEl.innerHTML = esc(p.role) + ' <em></em>';
        const footerNameEl = document.getElementById('footer-profile-name');
        if (footerNameEl) footerNameEl.innerHTML = '<span class="dot"></span>' + esc(p.firstName) + ' ' + esc(p.lastName) + ' — ' + esc(p.role);
      }

      function renderAbout() {
        const ab = state.about || DEFAULT_DATA.about;
        const ledeEl = document.getElementById('about-lede');
        if (ledeEl) ledeEl.innerHTML = ab.lede;
        const bioEl = document.getElementById('about-bio');
        if (bioEl) bioEl.innerHTML = ab.bio.map(para => '<p>' + esc(para) + '</p>').join('');
        const statsEl = document.getElementById('about-stats');
        if (statsEl) {
          statsEl.innerHTML = ab.stats.map(s => 
            '<div>' +
              '<div class="stat-num">' + esc(s.num) + '</div>' +
              '<div class="stat-label">' + esc(s.label) + '</div>' +
            '</div>'
          ).join('');
        }
      }

      function renderContact() {
        const c = state.contact || DEFAULT_DATA.contact;
        const ctaBtn = document.getElementById('cta-email-btn');
        if (ctaBtn) ctaBtn.setAttribute('href', 'mailto:' + esc(c.email) + '?subject=Collaborating%20together');
        const contactLinks = document.getElementById('contact-links');
        if (contactLinks) {
          contactLinks.innerHTML = 
            '<a href="mailto:' + esc(c.email) + '">' + esc(c.email) + '</a>' +
            '<a href="' + esc(c.linkedin) + '" target="_blank">LinkedIn</a>' +
            '<a href="' + esc(c.twitter) + '" target="_blank">Twitter / X</a>';
        }
      }

      function renderAll() {
        renderProfile();
        renderAbout();
        renderContact();
        renderTimeline();
        renderCards('projects', 'projects-list', 'folder');
        renderCards('papers', 'papers-list', 'doc');
        renderCards('github', 'github-list', 'branch');
      }

      window.__pf_linkClick = function (ev, el) {
        if (editMode) { ev.preventDefault(); return false; }
        return true;
      };

      document.addEventListener('blur', function (e) {
        const t = e.target;
        if (!t.matches || !t.matches('[data-field]')) return;
        const section = t.getAttribute('data-section');
        const index = parseInt(t.getAttribute('data-index'), 10);
        const field = t.getAttribute('data-field');
        if (!state[section] || !state[section][index]) return;
        let val = t.textContent.trim();
        state[section][index][field] = val;
        if (field === 'link' && t.tagName === 'A') {
          t.setAttribute('href', val || '#');
        }
        queueSave();
      }, true);

      document.addEventListener('click', function (e) {
        const del = e.target.closest('.del-btn');
        if (del) {
          const section = del.getAttribute('data-section');
          const index = parseInt(del.getAttribute('data-index'), 10);
          state[section].splice(index, 1);
          queueSave();
          renderAll();
          return;
        }
        const addBtn = e.target.closest('[data-add]');
        if (addBtn) {
          const section = addBtn.getAttribute('data-add');
          if (section === 'timeline') {
            state.timeline.push({ year: '20XX', title: 'New skill', desc: 'Describe what you learned or built.', icon: 'star' });
          } else {
            state[section].push({ title: 'New entry', desc: 'Add a short description.', tag: 'Add a tag', link: '' });
          }
          queueSave();
          renderAll();
          return;
        }
      });

      document.addEventListener('change', function (e) {
        const picker = e.target.closest('[data-icon-picker]');
        if (picker) {
          const section = picker.getAttribute('data-section');
          const index = parseInt(picker.getAttribute('data-index'), 10);
          state[section][index].icon = picker.value;
          queueSave();
          renderAll();
        }
      });

      document.getElementById('add-timeline').addEventListener('click', function () {
        state.timeline.push({ year: '20XX', title: 'New skill', desc: 'Describe what you learned or built.', icon: 'star' });
        queueSave();
        renderAll();
      });

      function setEditMode(on) {
        editMode = on;
        document.body.classList.toggle('edit-mode', editMode);
        const editBtn = document.getElementById('edit-toggle');
        if (editBtn) editBtn.textContent = editMode ? 'Done' : 'Edit';
        const panelToggle = document.getElementById('panel-edit-toggle');
        if (panelToggle) panelToggle.textContent = editMode ? 'Turn off inline editing' : 'Turn on inline editing';
        renderAll();
        
        if (!on) {
          const url = new URL(window.location.href);
          if (url.searchParams.has('edit')) {
            url.searchParams.delete('edit');
            window.history.replaceState({}, '', url.pathname + url.search);
          }
        }
      }

      const editBtn = document.getElementById('edit-toggle');
      if (editBtn) {
        editBtn.addEventListener('click', function () {
          setEditMode(!editMode);
        });
      }

      const panelEditBtn = document.getElementById('panel-edit-toggle');
      if (panelEditBtn) {
        panelEditBtn.addEventListener('click', function () {
          setEditMode(!editMode);
        });
      }

      async function resetAllContent() {
        if (!confirm('Reset all timeline, project, paper and github content back to the defaults?')) return;
        state = clone(DEFAULT_DATA);
        try { await window.storage.set(STORAGE_KEY, JSON.stringify(state), false); } catch (e) { }
        renderAll();
      }
      document.getElementById('panel-reset-btn').addEventListener('click', resetAllContent);

      const cmsPanel = document.getElementById('cms-panel');
      const cmsBackdrop = document.getElementById('cms-backdrop');
      function openPanel() { cmsPanel.classList.add('open'); cmsBackdrop.classList.add('open'); }
      function closePanel() { cmsPanel.classList.remove('open'); cmsBackdrop.classList.remove('open'); }
      document.getElementById('cms-open').addEventListener('click', openPanel);
      document.getElementById('cms-close').addEventListener('click', closePanel);
      cmsBackdrop.addEventListener('click', closePanel);
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePanel();
      });

      const sectionAnchors = { timeline: 'timeline', projects: 'work', papers: 'papers', github: 'github' };
      cmsPanel.querySelectorAll('[data-add]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (!editMode) setEditMode(true);
          closePanel();
          const anchorId = sectionAnchors[this.getAttribute('data-add')];
          setTimeout(function () {
            const target = document.getElementById(anchorId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 260);
        });
      });

      async function syncGitHubRepos() {
        const username = (state.contact && state.contact.githubUser) ? state.contact.githubUser : 'DawgyBey';
        const syncBtn = document.getElementById('github-sync-btn');
        const syncStatus = document.getElementById('github-sync-status');
        
        if (syncBtn) {
          syncBtn.disabled = true;
          syncBtn.classList.add('spinning');
        }
        if (syncStatus) {
          syncStatus.textContent = 'Syncing...';
          syncStatus.style.color = 'var(--smoke)';
        }

        try {
          const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
          if (res.ok) {
            const repos = await res.json();
            if (Array.isArray(repos)) {
              state.github = repos.map(repo => {
                const isLumina = repo.name.toLowerCase() === 'lumina';
                return {
                  title: repo.name,
                  desc: repo.description || 'No description provided.',
                  tag: repo.license ? repo.license.name : (repo.language || 'GitHub Repo'),
                  link: isLumina ? 'https://github.com/sunwaycollege-research/lumina_smart_mirror' : repo.html_url
                };
              });
              queueSave();
              renderCards('github', 'github-list', 'branch');
              
              if (syncStatus) {
                syncStatus.textContent = 'Synced successfully';
                syncStatus.style.color = 'green';
              }
            } else {
              throw new Error('Invalid response format');
            }
          } else {
            if (res.status === 403) {
              throw new Error('GitHub API rate limit exceeded. Please try again later.');
            } else {
              throw new Error(`GitHub API returned status ${res.status}`);
            }
          }
        } catch (e) {
          console.warn('Failed to sync GitHub repositories:', e);
          if (syncStatus) {
            syncStatus.textContent = e.message || 'Sync failed';
            syncStatus.style.color = 'var(--signal)';
          }
        } finally {
          if (syncBtn) {
            syncBtn.disabled = false;
            syncBtn.classList.remove('spinning');
          }
        }
      }

      loadState().then(() => {
        const isAuthorized = sessionStorage.getItem('portfolio-admin-auth') === 'true';
        const urlParams = new URLSearchParams(window.location.search);
        const isEditParam = urlParams.get('edit') === 'true';

        if (isEditParam) {
          if (isAuthorized) {
            document.body.classList.add('admin-authorized');
            setEditMode(true);
          } else {
            window.location.href = 'admin.html';
            return;
          }
        } else if (isAuthorized) {
          document.body.classList.add('admin-authorized');
        }

        // Easter egg: click monogram 5 times in 2s to open admin panel
        let monogramClickCount = 0;
        const monogram = document.querySelector('.monogram');
        if (monogram) {
          monogram.style.cursor = 'pointer';
          monogram.addEventListener('click', () => {
            monogramClickCount++;
            if (monogramClickCount >= 5) {
              window.location.href = 'admin.html';
            }
            setTimeout(() => { monogramClickCount = 0; }, 2000);
          });
        }

        renderAll();
        syncGitHubRepos();
        
        const syncBtn = document.getElementById('github-sync-btn');
        if (syncBtn) {
          syncBtn.addEventListener('click', syncGitHubRepos);
        }
      });
    })();