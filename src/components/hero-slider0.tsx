"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/hero-1.png",
    title: "SOS HARD AND SOFT",
    description:
      "Une entreprise spécialisée dans les solutions informatiques et électromécaniques. Nous vous accompagnons dans tous vos projets avec expertise et professionnalisme.",
  },
  {
    image: "/hero-2.png",
    title: "IT INFRASTRUCTURE SERVICE ET SOLUTIONS",
    description:
      "Conception, déploiement et gestion d'infrastructures informatiques adaptées à vos besoins. Solutions sur mesure pour optimiser votre environnement IT, améliorer la sécurité et garantir la continuité de vos activités.",
  },
  {
    image: "/hero-3.png",
    title: "MAINTENANCE INFORMATIQUE",
    description:
      "Services de maintenance préventive et corrective pour assurer la continuité de vos opérations. Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos besoins urgents et minimiser les temps d'arrêt.",
  },
  {
    image: "/hero-4.png",
    title: "ARCHIVAGE NUMÉRIQUE",
    description:
      "Solutions d'archivage sécurisées pour la gestion et la conservation de vos données importantes. Systèmes conformes aux réglementations en vigueur, avec des options de récupération rapide en cas de besoin.",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill priority className="object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">{slide.title}</h1>
                <p className="text-xl text-white/90 mb-8 animate-fadeIn animation-delay-200">{slide.description}</p>
                <div className="flex flex-wrap gap-4 animate-fadeIn animation-delay-400">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
                    <a href="#services">Nos Services</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="#contact">Nous Contacter</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-red-600" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
