"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  Mail,
  Linkedin,
  Bot,
  Globe,
  Github,
  MapPin,
  Calendar,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react"

export default function PortfolioConceptual() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set())
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Palabras motivadoras para la sección Home
  const palabrasMotivadoras = ["CREATE", "INNOVATE", "DESIGN", "DEVELOP", "INSPIRE", "BUILD"]

  const secciones = [
    { id: "home", nombre: "Home" },
    { id: "projects", nombre: "Projects" },
    { id: "info", nombre: "Info" },
    { id: "contact", nombre: "Contact" },
  ]

  const proyectos = [
    {
      id: 1,
      titulo: "RPG OP - Comunidad Gaming",
      descripcion:
        "Página web completa para comunidad de RPG creada con ForumCommunity, aplicando principios de UX y diseño de comunidades online.",
      url: "https://rpgop.forumcommunity.net",
      tecnologias: ["ForumCommunity", "CSS Custom", "JavaScript", "HTML", "UX Design"],
      categoria: "Web Community",
      concepto: "Front-end Development - Diseño de Comunidades Online y Arquitectura de Foros",
      icono: <Globe className="h-6 w-6" />,
      disponible: true,
    },
    {
      id: 2,
      titulo: "Discord Bot Personalizado",
      descripcion:
        "Bot de Discord desarrollado desde cero con funcionalidades avanzadas para gestión de servidores y automatización de tareas.",
      tecnologias: ["Python", "discord.py", "API Integration", "MongoDB"],
      categoria: "Bot Development",
      concepto: "Desarrollo Backend - Lógica de Programación y APIs",
      icono: <Bot className="h-6 w-6" />,
      disponible: false,
    },
  ]

  // Función para cambiar tema - CORREGIDA
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)

    // Aplicar o quitar la clase inmediatamente
    if (newDarkMode) {
      // Modo oscuro - quitar clase light-theme
      document.body.classList.remove("light-theme")
    } else {
      // Modo claro - añadir clase light-theme
      document.body.classList.add("light-theme")
    }

    console.log("Tema cambiado a:", newDarkMode ? "oscuro" : "claro")
    console.log("Clases del body:", document.body.className)
  }

  // Animación de carga
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Activar animación de la primera sección inmediatamente
      setVisibleSections(new Set([0]))
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  // Animación de máquina de escribir
  useEffect(() => {
    if (isLoading) return

    const currentWord = palabrasMotivadoras[currentWordIndex]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1))
        }, 150)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, 100)
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % palabrasMotivadoras.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, currentWordIndex, isTyping, isLoading])

  // Detección de scroll mejorada con animaciones
  useEffect(() => {
    const sections = document.querySelectorAll(".portfolio-section")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const sectionIndex = secciones.findIndex((s) => s.id === sectionId)
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex)
              // Activar animaciones para esta sección
              setVisibleSections((prev) => new Set([...prev, sectionIndex]))
            }
          }
        })
      },
      {
        threshold: 0.4,
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [secciones])

  // Navegación a sección específica mejorada con scroll más suave
  const scrollToSection = (index: number) => {
    const sectionId = secciones[index].id
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })

      setCurrentSection(index)
      setTimeout(() => {
        setVisibleSections((prev) => new Set([...prev, index]))
      }, 200)
    }
  }

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="text-center">
          <div className="hero-word mb-4">LOADING</div>
          <div className="retro-ui text-gray-400">Inicializando_Portfolio.exe</div>
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Fondo animado optimizado */}
      <div className="animated-background"></div>

      {/* Partículas flotantes simples */}
      <div className="floating-particles">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Grid sutil */}
      <div className="grid-lines"></div>

      <div className="portfolio-container">
        {/* Navegación minimalista */}
        <nav className="fixed top-8 left-8 z-50">
          <ul className="nav-list">
            {secciones.map((seccion, index) => (
              <li
                key={seccion.id}
                className={`nav-item retro-ui ${currentSection === index ? "active" : ""}`}
                onClick={() => scrollToSection(index)}
              >
                {String(index + 1).padStart(2, "0")}. {seccion.nombre}
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de cambio de tema - Esquina superior derecha */}
        <div className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </div>

        {/* Contador de sección */}
        <div className="fixed bottom-8 right-8 z-40">
          <div className="retro-ui text-gray-400">
            {String(currentSection + 1).padStart(2, "0")} / {String(secciones.length).padStart(2, "0")}
          </div>
        </div>

        {/* Indicador de scroll solo en la primera sección */}
        {currentSection === 0 && (
          <div className="scroll-indicator">
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        )}

        {/* SECCIÓN 1: HOME */}
        <section className={`portfolio-section ${visibleSections.has(0) ? "section-visible" : ""}`} id="home">
          <div className="section-content text-center">
            <div className="animate-element slide-up">
              <div className="typewriter-container mb-8">
                <span className="typewriter-text">{displayText}</span>
                <span className={`typewriter-cursor ${isTyping ? "typing" : "deleting"}`}></span>
              </div>
            </div>

            <div className="animate-element slide-up delay-300">
              <div className="detail-text max-w-2xl mx-auto text-gray-300 opacity-80">
                <p className="text-lg mb-4">Desarrollador de Aplicaciones</p>
                <p>
                  Estudiante apasionado por la tecnología, especializado en desarrollo frontend y backend. Abierto a
                  oportunidades laborales para aplicar mis conocimientos y seguir creciendo profesionalmente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 2: PROJECTS */}
        <section className={`portfolio-section ${visibleSections.has(1) ? "section-visible" : ""}`} id="projects">
          <div className="section-content">
            <div className="animate-element fade-in">
              <div className="text-center mb-16">
                <h2 className="section-word mb-6">PROJECTS</h2>
                <p className="detail-text text-lg text-gray-300 opacity-70 max-w-2xl mx-auto">
                  Mis proyectos reales aplicando conceptos de desarrollo web y programación
                </p>
              </div>
            </div>

            <div className="project-grid">
              {proyectos.map((proyecto, index) => (
                <Card key={proyecto.id} className={`project-card animate-element scale-in delay-${400 + index * 200}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="retro-ui border-gray-500 text-gray-300">
                        {proyecto.categoria}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {proyecto.icono}
                        <div className="flex space-x-2">
                          {proyecto.disponible && proyecto.url && (
                            <Button size="sm" variant="ghost" className="p-2 text-gray-300 hover:text-white" asChild>
                              <a href={proyecto.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {!proyecto.disponible && (
                            <Badge variant="secondary" className="retro-ui text-xs bg-gray-700 text-gray-300">
                              En Desarrollo
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 text-white">{proyecto.titulo}</CardTitle>
                    <CardDescription className="detail-text text-gray-300">{proyecto.descripcion}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="pixel-text mb-2 text-gray-400">Concepto_Aplicado:</div>
                        <div className="text-sm opacity-70 text-gray-300">{proyecto.concepto}</div>
                      </div>
                      <div>
                        <div className="pixel-text mb-2 text-gray-400">Tecnologias_Usadas:</div>
                        <div className="flex flex-wrap gap-1">
                          {proyecto.tecnologias.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: INFO */}
        <section className={`portfolio-section ${visibleSections.has(2) ? "section-visible" : ""}`} id="info">
          <div className="section-content">
            <div className="animate-element fade-in">
              <div className="text-center mb-16">
                <h2 className="section-word mb-6">INFO</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center animate-element slide-left delay-300">
                <div className="w-64 h-64 mx-auto mb-6 bg-gray-700 rounded-lg flex items-center justify-center">
                  <img
                    src="/images/profile-photo.jpeg"
                    alt="Julen Román Ledo - Foto de perfil"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-6 animate-element slide-right delay-500">
                <div>
                  <h3 className="text-3xl font-bold mb-2 text-white">Julen Román Ledo</h3>
                  <div className="pixel-text text-gray-400 mb-4">Desarrollador_de_Aplicaciones.exe</div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <span className="detail-text text-gray-300">España</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="detail-text text-gray-300">Desarrollador de Aplicaciones - 2025</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="pixel-text mb-2 text-gray-400">Biografia.txt:</div>
                    <p className="detail-text text-gray-300 leading-relaxed">
                      Soy Julen Román Ledo, un desarrollador de aplicaciones apasionado por la tecnología. Actualmente
                      me encuentro estudiando pero estoy abierto a oportunidades laborales que me permitan crecer
                      profesionalmente.
                    </p>
                  </div>

                  <div>
                    <p className="detail-text text-gray-300 leading-relaxed">
                      Mi enfoque se centra en el desarrollo tanto frontend como backend, aplicando las mejores prácticas
                      y manteniéndome actualizado con las últimas tendencias tecnológicas del sector.
                    </p>
                  </div>
                </div>

                <div>
                  <div className="pixel-text mb-2 text-gray-400">Skills.json:</div>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "TypeScript", "CSS", "HTML", "C++", "Python", "MongoDB"].map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: CONTACT */}
        <section className={`portfolio-section ${visibleSections.has(3) ? "section-visible" : ""}`} id="contact">
          <div className="section-content">
            <div className="animate-element fade-in">
              <div className="mb-8 text-center">
                <h2 className="section-word mb-6">CONTACT</h2>
                <p className="detail-text text-lg text-gray-300 opacity-70 max-w-2xl mx-auto">
                  ¿Tienes un proyecto interesante? Me encanta colaborar en ideas creativas
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-6">
              {[
                {
                  icon: Mail,
                  title: "Email.exe",
                  content: "julenrmn@gmail.com",
                  action: "Enviar Email",
                  href: "mailto:julenrmn@gmail.com",
                },
                {
                  icon: Linkedin,
                  title: "LinkedIn.exe",
                  content: "Julen Román Ledo",
                  action: "Ver Perfil",
                  href: "https://www.linkedin.com/in/julen-roman-ledo-41a06730a/",
                },
                {
                  icon: Github,
                  title: "GitHub.exe",
                  content: "Manshieshie",
                  action: "Ver Código",
                  href: "https://github.com/Manshieshie",
                },
                {
                  icon: Calendar,
                  title: "Status.exe",
                  content: "Disponible para trabajo",
                  action: "Disponible",
                  badge: true,
                },
              ].map((item, index) => (
                <Card key={index} className={`project-card animate-element scale-in delay-${300 + index * 100}`}>
                  <CardContent className="p-4 text-center">
                    <item.icon className="h-6 w-6 mx-auto mb-3 text-gray-300" />
                    <div className="pixel-text mb-2 text-gray-400">{item.title}</div>
                    <div className="detail-text text-gray-300 mb-3">{item.content}</div>
                    {item.badge ? (
                      <Badge className="bg-green-600 text-white">{item.action}</Badge>
                    ) : (
                      <Button
                        className="border-gray-500 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-300 w-full transition-all duration-300"
                        variant="outline"
                        asChild
                      >
                        <a href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.action}
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="animate-element fade-in delay-700">
              <div className="retro-ui text-gray-500 opacity-60 text-center">
                Respuesta_Promedio: 24-48h
                <br />
                Timezone: GMT+1 (Madrid)
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
