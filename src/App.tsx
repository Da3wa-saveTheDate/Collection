import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Showcase from './components/sections/Showcase';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Process from './components/sections/Process';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark overflow-x-clip">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Showcase />
        <WhyChooseUs />
        <Process />
      </main>
      <Footer />
    </div>
  );
}

export default App;
