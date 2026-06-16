import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HeroIntro } from "@/components/HeroIntro";
import { FounderQuote } from "@/components/FounderQuote";
import { WorkflowShowcase } from "@/components/WorkflowShowcase";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { TechStack } from "@/components/TechStack";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustBento } from "@/components/TrustBento";
import { AutomationAnimation } from "@/components/AutomationAnimation";
import { AboutAgLabs } from "@/components/AboutAgLabs";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <HeroIntro />
      <HowItWorks />
      <WorkflowShowcase />
      <ProjectsGallery />
      <TechStack />
      <TrustBento />
      <FounderQuote />
      <AboutAgLabs />
      <AutomationAnimation />
      <CtaSection />
      <Footer />
    </main>
  );
}
