"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/hero-1.png",
    title: "",
    fullWidth: true,
  },
  {
    image: "/hero-2.png",
    title: "IT INFRASTRUCTURE SERVICE ET SOLUTIONS",
    fullWidth: false,
  },
  {
    image: "/hero-3.png",
    title: "MAINTENANCE INFORMATIQUE",
    fullWidth: false,
  },
  {
    image: "/hero-4.png",
    title: "ARCHIVAGE NUMÉRIQUE",
    fullWidth: false,
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
    }, 7000)

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
          {slide.fullWidth ? (
            // Full width layout for first slide
            <div className="h-full w-full relative">
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center justify-center text-center">
                <div className="max-w-4xl px-4">
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 animate-fadeIn">{slide.title}</h1>
                  <div className="flex flex-wrap gap-4 justify-center animate-fadeIn animation-delay-400">
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
          ) : (
            // Split layout for other slides
            <div className="h-full w-full flex flex-col md:flex-row">
              {/* Image half */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Content half */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-800 flex items-center justify-center p-8">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 animate-fadeIn">{slide.title}</h1>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-fadeIn animation-delay-400">
                    <Button size="lg" className="bg-red-600 text-white hover:bg-red-600" asChild>
                      <a href="#services">En Savoir Plus</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-10">
        <button
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} className="text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={24} className="text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent ${
              index === currentSlide ? "bg-red-600 w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  )
}
