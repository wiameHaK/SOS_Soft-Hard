"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { CalendarClock, CheckCircle, Clock } from "lucide-react"

type maintenanceSlots = {
  [key: string]: string[];
};

// Sample maintenance slots organized by date
const maintenanceSlots = {
  "15 Mai 2025": ["09:00", "14:00"],
  "16 Mai 2025": ["10:00", "15:00"],
  "17 Mai 2025": ["09:00", "13:00"],
  "20 Mai 2025": ["11:00", "16:00"],
  "21 Mai 2025": ["10:00", "14:00"],
}

export default function MaintenanceScheduler() {
  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined)
  const [selectedSlot, setSelectedSlot] = useState<string | undefined>(undefined)
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    notes: "",
  })

  // Get available days
  const availableDays = Object.keys(maintenanceSlots)

  // Get available slots for the selected day
  const availableSlots = selectedDay ? maintenanceSlots[selectedDay as keyof typeof maintenanceSlots] || [] : [];
  
  // Function to handle day selection
  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
    setSelectedSlot(undefined) // Reset time slot when day changes
  }

  // Function to handle time slot selection
  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot)
  }

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Function to handle service type selection
  const handleServiceTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  // Function to handle booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBookingDialogOpen(false)
    setIsConfirmationDialogOpen(true)
  }

  // Function to close confirmation and reset form
  const handleConfirmationClose = () => {
    setIsConfirmationDialogOpen(false)
    setSelectedDay(undefined)
    setSelectedSlot(undefined)
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      notes: "",
    })

    toast({
      title: "Réservation confirmée",
      description: "Votre demande de maintenance a été enregistrée. Nous vous contacterons prochainement.",
      duration: 5000,
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Sélectionnez une date</h3>
                <p className="text-sm text-gray-500">Choisissez parmi nos dates disponibles</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="day-select">Jour</Label>
                  <Select value={selectedDay} onValueChange={handleDaySelect}>
                    <SelectTrigger id="day-select" className="w-full border-gray-300 bg-white">
                      <SelectValue placeholder="Sélectionnez un jour" />
                    </SelectTrigger>
                    <SelectContent className="w-full border-gray-300 bg-white">
                      {availableDays.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardContent className="pt-6 h-full flex flex-col">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-1">Créneaux disponibles</h3>
                <p className="text-sm text-gray-500">
                  {selectedDay ? "Sélectionnez un créneau horaire" : "Veuillez d'abord sélectionner une date"}
                </p>
              </div>

              {selectedDay ? (
                <>
                  <div className="space-y-4 m -6">
                    <div className="space-y-2">
                      <Label htmlFor="slot-select">Horaire</Label>
                      <Select value={selectedSlot} onValueChange={handleSlotSelect}>
                        <SelectTrigger id="slot-select" className="w-full border-gray-300">
                          <SelectValue placeholder="Sélectionnez un horaire" />
                        </SelectTrigger>
                        <SelectContent className="w-full border-gray-300 bg-white">
                          {availableSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-red-600" />
                                {slot}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-auto pt-5">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={!selectedSlot}
                      onClick={() => setIsBookingDialogOpen(true)}
                    >
                      Réserver ce créneau
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <CalendarClock className="mx-auto h-12 w-12 text-gray-300 mb-2" />
                    <p>Veuillez sélectionner une date dans le menu déroulant</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Réserver une maintenance</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedDay && selectedSlot
                ? `Le ${selectedDay} à ${selectedSlot}`
                : "Veuillez remplir le formulaire ci-dessous"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Entreprise</Label>
                  <Input id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceType">Type de service</Label>
                <Select value={formData.serviceType} onValueChange={handleServiceTypeChange} required>
                  <SelectTrigger id="serviceType">
                    <SelectValue placeholder="Sélectionnez un type de service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preventive">Maintenance préventive</SelectItem>
                    <SelectItem value="corrective">Maintenance corrective</SelectItem>
                    <SelectItem value="upgrade">Mise à niveau</SelectItem>
                    <SelectItem value="audit">Audit de sécurité</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes / Détails</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Décrivez brièvement vos besoins..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsBookingDialogOpen(false)} className="border-gray-300">
                Annuler
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white">
                Confirmer la réservation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={isConfirmationDialogOpen} onOpenChange={setIsConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Réservation confirmée
            </DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4">
              Votre demande de maintenance a été enregistrée avec succès. Un membre de notre équipe vous contactera
              prochainement pour confirmer votre rendez-vous.
            </p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-2">Détails de la réservation:</h4>
              <ul className="space-y-1 text-sm">
                <li>
                  <span className="font-medium">Date:</span> {selectedDay}
                </li>
                <li>
                  <span className="font-medium">Heure:</span> {selectedSlot}
                </li>
                <li>
                  <span className="font-medium">Type de service:</span>{" "}
                  {formData.serviceType === "preventive"
                    ? "Maintenance préventive"
                    : formData.serviceType === "corrective"
                      ? "Maintenance corrective"
                      : formData.serviceType === "upgrade"
                        ? "Mise à niveau"
                        : formData.serviceType === "audit"
                          ? "Audit de sécurité"
                          : "Autre"}
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleConfirmationClose} className="bg-red-600 hover:bg-red-700 text-white">
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
