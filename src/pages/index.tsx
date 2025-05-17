import HeroSlider from "@/components/hero-slider"
import ServiceCards from "@/components/service-cards"
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
      </main>
  );
}
