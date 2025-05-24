import HeroSlider from "@/components/hero-slider"
import ServiceCards from "@/components/service-cards"
import Testimonials from "@/components/testimonials"
import CaseStudies from '@/components/case-studies-slider'
import ChatWidget from "@/components/chat-widget"

import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main>
     <HeroSlider />

    <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Nos <span className="text-red-600">Services</span>
          </h2>
          <ServiceCards />
        </div>
      </section>
        {/* Étude de Cas Section */}
      <section id="etude-de-cas" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Étude de <span className="text-red-600">Cas</span>
          </h2>
          <CaseStudies />
        </div>
      </section>
           {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Témoignages & <span className="text-red-600">Cas Clients</span>
          </h2>
          <Testimonials />
        </div>
      </section>
      

         {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Nous <span className="text-red-600">Contacter</span>
          </h2>
          <ContactSection />
        </div>
      </section>
  {/* Chat Widget */}
      <ChatWidget />

          
      </main>
  );
}
