"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, Phone, Mail } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Top Info Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:0661474617" className="flex items-center text-sm hover:text-red-400 transition-colors">
              <Phone size={16} className="mr-1" /> 06 61 47 46 17
            </a>
            <a
              href="mailto:contact@soshardandsoft.com"
              className="flex items-center text-sm hover:text-red-400 transition-colors"
            >
              <Mail size={16} className="mr-1" /> contact@soshardandsoft.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-14 w-14">
                <Image src="/logo.png" alt="SOS Hard and Soft Logo" width={56} height={56} priority />
              </div>
              <div className="ml-2">
                <h1 className="font-bold text-red-600 text-xl">SOS</h1>
                <p className="text-sm text-gray-600">Hard and Soft</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Nos Services
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Témoignages
              </a>
              <a href="#maintenance" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Maintenance
              </a>
              <a href="#contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 hover:text-red-600 focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
            <nav className="flex flex-col space-y-4">
              <a
                href="#services"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nos Services
              </a>
              <a
                href="#testimonials"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </a>
              <a
                href="#maintenance"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Maintenance
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-red-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
