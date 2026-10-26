import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import PlatformRibbon from "@/components/PlatformRibbon";
import ConstellationMount from "@/components/ConstellationMount";
import Systems from "@/components/Systems";
import Capabilities from "@/components/Capabilities";
import Archive from "@/components/Archive";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <PlatformRibbon />
      <ConstellationMount />
      <Systems />
      <Capabilities />
      <Archive />
      <Team />
      <Contact />
    </main>
  );
}
