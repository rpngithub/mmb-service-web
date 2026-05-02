import HeroSection from '@/components/home/HeroSection'
import ClientLogos from '@/components/home/ClientLogos'
import ProblemSolution from '@/components/home/ProblemSolution'
import FeaturesSection from '@/components/home/FeaturesSection'
import PricingSection from '@/components/home/PricingSection'
import FreeTrial from '@/components/home/FreeTrial'
import SampleWork from '@/components/home/SampleWork'
import Testimonials from '@/components/home/Testimonials'
import VisionSection from '@/components/home/VisionSection'
import FaqSection from '@/components/home/FaqSection'
import FinalCTA from '@/components/home/FinalCTA'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <ClientLogos />
      <ProblemSolution />
      <FeaturesSection />
      <PricingSection />
      <FreeTrial />
      <SampleWork />
      <Testimonials />
      <VisionSection />
      <FaqSection />
      <FinalCTA />
    </main>
  )
}
