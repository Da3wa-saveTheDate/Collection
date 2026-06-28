import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Showcase from './components/sections/Showcase';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Process from './components/sections/Process';
import Pricing from './components/sections/Pricing';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark overflow-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Showcase />
        <WhyChooseUs />
        <Process />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

export default App;
