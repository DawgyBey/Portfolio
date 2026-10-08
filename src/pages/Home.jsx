import Crosshair from '../components/Crosshair'
import Marquee from '../components/Marquee'
import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Timeline from '../sections/Timeline'
import { lazy, Suspense } from 'react'
const Work = lazy(() => import('../sections/SpiralWork'))
import Papers from '../sections/Papers'
import Github from '../sections/Github'
import Hire from '../sections/Hire'
import Contact from '../sections/Contact'

export default function Home() {
  return (
    <div className="grain relative">
      <Crosshair />
      <Nav />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Marquee
          light
          items={[
            'Computer Vision',
            'Predictive Modeling',
            'NumPy',
            'Pandas',
            'UI/UX',
            'React',
            'FastAPI curious',
          ]}
        />
        <Suspense fallback={<section id="work" className="h-screen bg-[#0e0e0e]" />}>
          <Work />
        </Suspense>
        <Papers />
        <Github />
        <Marquee
          items={[
            'Open to internships',
            'Junior developer roles',
            'Hackathons',
            'Research',
            'Collaboration',
          ]}
        />
        <Hire />
        <Contact />
      </main>
    </div>
  )
}
