import Image from "next/image"
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-10 w-10 mr-2">
                <Image src="/logo.png" alt="SOS Hard and Soft Logo" width={40} height={40} />
              </div>
              <div>
                <h1 className="font-bold text-red-500 text-lg">SOS</h1>
                <p className="text-xs text-gray-400">Hard and Soft</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour tous vos besoins en infrastructure, maintenance et archivage
              informatique.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2">Liens Rapides</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">
                  Nos Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-red-500 transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#maintenance" className="text-gray-400 hover:text-red-500 transition-colors">
                  Maintenance
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-red-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2">Nos Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">
                  Infrastructure
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">
                  Maintenance
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">
                  Archivage
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-red-500 transition-colors">
                  Support 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 border-b border-gray-800 pb-2">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  123 Avenue de l'Informatique
                  <br />
                  75000 Paris, France
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-red-500 mr-2" />
                <a href="tel:0661474617" className="text-gray-400 hover:text-red-500 transition-colors">
                  06 61 47 46 17
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-red-500 mr-2" />
                <a
                  href="mailto:contact@soshardandsoft.com"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  contact@soshardandsoft.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} SOS Hard and Soft. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
