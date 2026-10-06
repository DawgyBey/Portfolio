import Crosshair from '../components/Crosshair'
import Marquee from '../components/Marquee'
import Nav from '../sections/Nav'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Timeline from '../sections/Timeline'
import Work from '../sections/Work'
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
        <Marquee
          items={[
            'Machine Learning',
            'Neural Networks',
            'Python',
            'Data Science',
            'Clean Code',
            'Open Source',
            'Class of 2026',
          ]}
        />
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
        <Work />
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
