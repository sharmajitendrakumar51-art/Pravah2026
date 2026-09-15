import Marquee from '../components/Marquee';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Events from '../sections/Events';
import Schedule from '../sections/Schedule';
import Workshops from '../sections/Workshops';
import Prizes from '../sections/Prizes';
import Gallery from '../sections/Gallery';
import Team from '../sections/Team';
import Register from '../sections/Register';
import Contact from '../sections/Contact';

// ============================================================
// HOME — the original single-scroll PRAVAH experience.
// Composition is intentionally unchanged; the homepage remains the
// festival's cinematic entry point while dedicated routes handle
// depth for each section.
// ============================================================
export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Events />
      <Schedule />
      <Workshops />
      <Prizes />
      <Gallery />
      <Team />
      <Register />
      <Contact />
    </>
  );
}
