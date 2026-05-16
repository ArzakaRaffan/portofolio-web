import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { SelectedWork } from "./components/SelectedWork";
import { Highlights } from "./components/Highlights";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <span id="top"></span>
        <Hero />
        <SelectedWork />
        <Highlights />
        <Skills />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
