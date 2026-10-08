<!-- Nuxt 3 / Vue 3 projects section with the portfolio-style animations.
     Usage: <ProjectsSection :projects="projects" /> -->
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { initReveal, initCrosshair } from '~/assets/motion.js'

defineProps({
  projects: { type: Array, required: true }
  // { id, name, kind, year, desc, stack: string[], link, image?, video? }
})

const root = ref(null)
let stopReveal = () => {}, stopCursor = () => {}
onMounted(() => { stopReveal = initReveal(root.value); stopCursor = initCrosshair() })
onBeforeUnmount(() => { stopReveal(); stopCursor() })
</script>

<template>
  <section ref="root" id="work" style="background:#eceae5;color:#0e0e0e">
    <div data-reveal style="max-width:1400px;margin:0 auto;padding:96px 40px">
      <h2 class="mask-line" style="margin-bottom:64px"><span>Selected Work</span></h2>

      <div class="projects-grid">
        <div v-for="(p, i) in projects" :key="p.id" class="fade-up" :style="{ '--reveal-delay': i * 120 + 'ms' }">
          <a :href="p.link" target="_blank" rel="noreferrer" class="project-card" data-cursor>
            <div class="project-card__viewer">
              <div class="project-card__media">
                <video v-if="p.video" :src="p.video" autoplay muted loop playsinline />
                <img v-else-if="p.image" :src="p.image" :alt="p.name" loading="lazy" />
              </div>
              <span class="project-card__id">{{ p.id }}</span>
              <span class="project-card__cta">View project ↗</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:24px">
              <div>
                <h3 class="project-card__title">{{ p.name }}</h3>
                <p style="margin-top:12px;max-width:28rem;opacity:.6">{{ p.desc }}</p>
                <div class="project-card__tags"><span v-for="s in p.stack" :key="s">{{ s }}</span></div>
              </div>
              <span style="font:10px ui-monospace,monospace;letter-spacing:.2em;text-transform:uppercase;opacity:.5;text-align:right">
                {{ p.kind }}<br />{{ p.year }}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
