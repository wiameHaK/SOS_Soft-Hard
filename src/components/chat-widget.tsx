"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react"

type Message = {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

// Sample bot responses
const botResponses = [
  "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
  "Merci pour votre message. Un de nos experts vous contactera prochainement.",
  "Nous proposons des services d'infrastructure, de maintenance et d'archivage informatique. Souhaitez-vous en savoir plus sur l'un de ces services ?",
  "Notre équipe est disponible 24h/24 et 7j/7 pour répondre à vos besoins urgents.",
  "Vous pouvez réserver une maintenance préventive via notre planificateur en ligne.",
  "N'hésitez pas à nous contacter par téléphone au 06 61 47 46 17 pour une assistance immédiate.",
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Add initial bot message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: "Bonjour ! Je suis l'assistant virtuel de SOS Hard and Soft. Comment puis-je vous aider aujourd'hui ?",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)

    // Simulate bot response after a delay
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-colors ${
          isOpen ? "bg-red-700 text-white" : "bg-red-600 text-white hover:bg-red-700"
        }`}
        aria-label={isOpen ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[500px] border border-gray-200">
          {/* Chat Header */}
          <div className="bg-red-600 text-white p-4">
            <div className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              <h3 className="font-medium">Chat SOS Hard and Soft</h3>
            </div>
            <p className="text-xs text-white/80 mt-1">Notre assistant est là pour vous aider</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.sender === "user" ? <User className="h-4 w-4 mr-1" /> : <Bot className="h-4 w-4 mr-1" />}
                      <span className="text-xs font-medium">{message.sender === "user" ? "Vous" : "Assistant"}</span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-gray-800 rounded-lg p-3 border border-gray-200 max-w-[80%]">
                    <div className="flex items-center">
                      <Bot className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">Assistant</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span className="text-sm">En train d'écrire...</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Tapez votre message..."
                value={inputValue}
                onChange={handleInputChange}
                className="flex-1 mr-2"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
