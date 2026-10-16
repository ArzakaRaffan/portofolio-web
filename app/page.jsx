import { Preloader } from "./_components/Preloader";
import { Nav } from "./_components/Nav";
import { Overlays } from "./_components/Overlays";
import { Hero } from "./_components/Hero";
import { About } from "./_components/About";
import { Work } from "./_components/Work";
import { Highlights } from "./_components/Highlights";
import { Experience } from "./_components/Experience";
import { Ribbon } from "./_components/Ribbon";
import { Contact } from "./_components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Overlays />
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Work />
        <Highlights />
        <Experience />
        <Ribbon />
      </main>
      <Contact />
    </>
  );
}
