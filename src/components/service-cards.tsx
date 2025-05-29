"use client"


import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Server, PenToolIcon as Tool, Database, ArrowRight, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Solutions d'infrastructure informatique complètes et sécurisées pour votre entreprise.",
    icon: <Server className="h-12 w-12 text-red-600" />,
    details:
      "Notre équipe d'experts conçoit, déploie et gère des infrastructures informatiques adaptées à vos besoins spécifiques. Nous proposons des solutions sur mesure pour optimiser votre environnement IT, améliorer la sécurité et garantir la continuité de vos activités. Nos services comprennent la mise en place de serveurs, de réseaux, de solutions de stockage et de systèmes de sauvegarde.",
    heroDescription:
      "Solutions sur mesure pour optimiser votre environnement IT, améliorer la sécurité et garantir la continuité de vos activités.",
    features: [
      "Conception et déploiement d'infrastructures sur mesure",
      "Solutions de virtualisation et cloud computing",
      "Mise en place de réseaux sécurisés",
      "Systèmes de stockage et de sauvegarde",
      "Audit et optimisation d'infrastructures existantes",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description: "Services de maintenance préventive et corrective pour assurer la continuité de vos opérations.",
    icon: <Tool className="h-12 w-12 text-red-600" />,
    details:
      "Nous offrons des services de maintenance informatique complets pour prévenir les pannes et résoudre rapidement les problèmes techniques. Notre équipe est disponible 24/7 pour vous assister et minimiser les temps d'arrêt. Nos contrats de maintenance incluent des visites régulières, la surveillance proactive des systèmes, les mises à jour de sécurité et l'assistance technique à distance ou sur site.",
    heroDescription:
      "Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos besoins urgents et minimiser les temps d'arrêt.",
    features: [
      "Maintenance préventive et corrective",
      "Support technique 24/7",
      "Surveillance proactive des systèmes",
      "Mises à jour de sécurité régulières",
      "Assistance à distance et sur site",
    ],
  },
  {
    id: "archivage",
    title: "Archivage",
    description: "Solutions d'archivage sécurisées pour la gestion et la conservation de vos données importantes.",
    icon: <Database className="h-12 w-12 text-red-600" />,
    details:
      "Nos solutions d'archivage vous permettent de stocker, organiser et protéger vos données critiques. Nous mettons en place des systèmes d'archivage conformes aux réglementations en vigueur, avec des options de récupération rapide en cas de besoin. Nos services comprennent l'archivage électronique, la numérisation de documents, la gestion des sauvegardes et la mise en place de politiques de conservation des données.",
    heroDescription:
      "Systèmes conformes aux réglementations en vigueur, avec des options de récupération rapide en cas de besoin.",
    features: [
      "Archivage électronique sécurisé",
      "Numérisation de documents physiques",
      "Gestion des sauvegardes automatisées",
      "Politiques de conservation des données",
      "Solutions conformes au RGPD",
    ],
  },
]

export default function ServiceCards() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscapeKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isModalOpen])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  const openModal = (service: (typeof services)[0]) => {
    console.log("openModal called with:", service);
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredCard(service.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className="relative"
          >
            <Card className="h-full transition-all duration-300 hover:shadow-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-red-50 to-transparent opacity-0 pointer-events-none"
                animate={{ opacity: hoveredCard === service.id ? 0.5 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <CardHeader className="flex flex-col items-center text-center pt-8">
                <motion.div
                  animate={{
                    y: hoveredCard === service.id ? -5 : 0,
                    scale: hoveredCard === service.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {service.icon}
                </motion.div>
                <CardTitle className="mt-4 text-2xl">{service.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-center">
                <CardDescription className="text-lg text-gray-600">{service.description}</CardDescription>
              </CardContent>

              <CardFooter className="flex justify-center pb-6">
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 hover:text-red-700 group text-base"
                  onClick={() => openModal(service)}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Custom Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header with icon */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-red-100 p-3 rounded-full mr-4">{selectedService.icon}</div>
                  <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-700 mb-6 leading-relaxed">{selectedService.details}</p>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Nos prestations incluent :</h3>
                <ul className="space-y-3 mb-6">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Pourquoi nous choisir ?</h4>
                  <p className="text-gray-700">
                    Notre équipe d'experts qualifiés s'engage à fournir des solutions adaptées à vos besoins
                    spécifiques, avec un support réactif et personnalisé pour garantir votre satisfaction.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Fermer
                </Button>
                <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                  <a href="#contact">Nous contacter</a>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
