"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    id: 1,
    title: "Migration Infrastructure Cloud pour Tech Solutions",
    location: "Belgique",
    image: "/case-study-1.png",
    description:
      "Déploiement d'une infrastructure cloud hybride avec migration de données sensibles pour une entreprise de technologie en pleine croissance.",
    challenge:
      "L'entreprise faisait face à des problèmes de scalabilité et de sécurité avec son infrastructure existante.",
    solution:
      "Nous avons conçu et déployé une solution cloud hybride personnalisée, en migrant progressivement les applications critiques tout en maintenant la continuité des opérations.",
    results: [
      "Réduction des coûts d'infrastructure de 35%",
      "Amélioration de la performance des applications de 60%",
      "Temps d'arrêt réduit à zéro pendant la migration",
      "Conformité RGPD renforcée",
    ],
  },
  {
    id: 2,
    title: "Système de Maintenance Préventive pour Innovate Digital",
    location: "France",
    image: "/case-study-2.png",
    description:
      "Mise en place d'un système de maintenance préventive avec monitoring 24/7 pour une agence digitale gérant des plateformes critiques.",
    challenge:
      "Les pannes imprévues causaient des interruptions de service coûteuses et affectaient la réputation de l'entreprise.",
    solution:
      "Implémentation d'un système de surveillance proactive avec alertes automatisées et maintenance préventive programmée basée sur l'analyse prédictive.",
    results: [
      "Réduction des temps d'arrêt de 80%",
      "Économies annuelles estimées à 120 000€",
      "Détection précoce des problèmes potentiels",
      "Satisfaction client améliorée de 45%",
    ],
  },
  {
    id: 3,
    title: "Solution d'Archivage Conforme pour Nordic Tech",
    location: "Suède",
    image: "/case-study-3.png",
    description:
      "Implémentation d'une solution d'archivage conforme aux normes européennes pour une entreprise technologique nordique.",
    challenge:
      "L'entreprise devait se conformer aux exigences strictes du RGPD tout en optimisant sa gestion documentaire.",
    solution:
      "Déploiement d'une solution d'archivage sécurisée avec chiffrement de bout en bout, politiques de rétention automatisées et audit trail complet.",
    results: [
      "Conformité totale aux exigences du RGPD",
      "Réduction du temps de recherche documentaire de 75%",
      "Économie d'espace de stockage de 40%",
      "Processus d'audit simplifié",
    ],
  },
  {
    id: 4,
    title: "Infrastructure IT pour Centre d'Opérations à Tanger",
    location: "Maroc",
    image: "/case-study-4.png",
    description:
      "Déploiement d'infrastructure IT complète pour un nouveau centre d'opérations à Tanger pour Maroc Digital.",
    challenge:
      "Établir rapidement une infrastructure robuste dans un nouveau marché avec des contraintes locales spécifiques.",
    solution:
      "Conception et implémentation d'une infrastructure sur mesure avec support local et formation du personnel, intégrant des solutions adaptées au contexte régional.",
    results: [
      "Mise en service 2 semaines avant la date prévue",
      "Réduction des coûts de 25% par rapport au budget initial",
      "Formation réussie de l'équipe locale",
      "Infrastructure évolutive pour accompagner la croissance prévue",
    ],
  },
]

export default function CaseStudiesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + caseStudies.length) % caseStudies.length)
  }, [])

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        nextSlide()
      }, 8000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, nextSlide])

  const pauseAutoPlay = () => setIsAutoPlaying(false)
  const resumeAutoPlay = () => setIsAutoPlaying(true)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const currentCase = caseStudies[currentIndex]

  return (
    <div className="relative max-w-6xl mx-auto" onMouseEnter={pauseAutoPlay} onMouseLeave={resumeAutoPlay}>
      <div className="overflow-hidden relative rounded-xl bg-white shadow-lg">
        <div className="h-full">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Image Section */}
            <div className="relative h-64 md:h-full min-h-[300px] bg-gray-100">
              <Image
                src={currentCase.image || "/placeholder.svg?height=600&width=800"}
                alt={currentCase.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentCase.location}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{currentCase.title}</h3>
              <p className="text-gray-600 mb-4">{currentCase.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-800">Défi:</h4>
                  <p className="text-gray-600">{currentCase.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Solution:</h4>
                  <p className="text-gray-600">{currentCase.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Résultats:</h4>
                  <ul className="list-disc pl-5 text-gray-600">
                    {currentCase.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto">
                <Button className="bg-red-600 hover:bg-red-700 text-white group" asChild>
                  <a href="#contact">
                    Discuter de votre projet
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md z-10 transition-colors"
        aria-label="Previous case study"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-red-600 p-2 rounded-full shadow-md z-10 transition-colors"
        aria-label="Next case study"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-red-600" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to case study ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
