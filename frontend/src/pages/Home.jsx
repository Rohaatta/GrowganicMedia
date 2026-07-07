import HeroSection from "../components/HeroSection";
//import ClientsMarquee from "../components/ClientsMarquee";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";

import FaqSection from "../components/FaqSection";
import FinalCta from "../components/FinalCta";
import ComparisonSection from "../components/ComparisonSection";
import TextTestimonials from "../components/TextTestimonials";
import BookACallSection from "../components/BookACallSection";
import CustomCursor from "../components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <HeroSection />
      <TestimonialsSection />
      <ServicesSection />
      <TextTestimonials />
      <ComparisonSection />
      <BookACallSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}