import { useMemo, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Pricing from './components/sections/Pricing';
import Showcase from './components/sections/Showcase';
import Process from './components/sections/Process';
import InvitationExperience from './components/experience/InvitationExperience';
import { useScrollReveal } from './hooks/useScrollReveal';
import SupportChat from './components/SupportChat';
import { getInvitationTypes, templates } from './data/catalog';
import type { InvitationPackage } from './lib/order';

/**
 * One page, one journey:
 *   what it is → how it works → choose a design → prices → (optional) try your names.
 */
function App() {
  useScrollReveal();
  const types = useMemo(() => getInvitationTypes(), []);
  // The gallery tab; the price list can switch it ("See 11 designs").
  const [activeType, setActiveType] = useState<InvitationPackage>('premium');

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark overflow-x-clip">
      <Navbar />
      <main className="flex-grow">
        <Hero designCount={templates.length} />
        <Process />
        <Showcase types={types} activeType={activeType} onTypeChange={setActiveType} />
        <Pricing types={types} onSeeDesigns={setActiveType} />
        <InvitationExperience />
      </main>
      <Footer />
      <SupportChat />
    </div>
  );
}

export default App;
