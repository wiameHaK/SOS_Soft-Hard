"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jean Dupont",
    company: "Tech Solutions, Belgique",
    quote:
      "SOS Hard and Soft a transformé notre infrastructure IT. Leur expertise et leur réactivité ont été essentielles pour notre transition vers le cloud. Un partenaire de confiance que je recommande vivement.",
  },
  {
    id: 2,
    name: "Marie Laurent",
    company: "Innovate Digital, France",
    quote:
      "Depuis que nous travaillons avec SOS Hard and Soft pour notre maintenance informatique, les temps d'arrêt ont été réduits de 80%. Leur service proactif nous permet d'anticiper les problèmes avant qu'ils n'affectent notre activité.",
  },
  {
    id: 3,
    name: "Anders Johansson",
    company: "Nordic Tech, Suède",
    quote:
      "La solution d'archivage mise en place par SOS Hard and Soft nous a permis de respecter les exigences du RGPD tout en optimisant notre gestion documentaire. Un travail remarquable.",
  },
]

export default function Testimonials() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="h-full">
          <CardContent className="p-6">
            <Quote className="h-8 w-8 text-red-200 mb-4" />
            <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
            <div className="mt-auto">
              <h3 className="text-lg font-semibold text-gray-900">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.company}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
