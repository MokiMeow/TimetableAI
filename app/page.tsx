'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CalendarDays, CheckCircle, Clock, Users, Moon, Sun, ChevronRight, Brain, UserPlus, Bell, ShieldCheck, LayoutGrid } from "lucide-react"

const FloatingCalendar = () => {
  return (
    <motion.div
      animate={{
        rotateY: 360,
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        width: '100px',
        height: '140px',
        backgroundColor: '#4CAF50',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{
        width: '80px',
        height: '120px',
        backgroundColor: 'white',
        borderRadius: '5px',
      }} />
    </motion.div>
  )
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [text])

  return <span>{displayText}</span>
}

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="group"
  >
    <Card className="p-6 h-full transition-all duration-300 group-hover:shadow-lg dark:group-hover:shadow-primary/20">
      <div className="flex items-center mb-4">
        <div className="bg-primary/10 p-3 rounded-full mr-4 group-hover:bg-primary/20 transition-colors duration-300">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
      <motion.div
        className="mt-4 flex items-center text-primary font-medium"
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        Learn more <ChevronRight className="ml-1 h-4 w-4" />
      </motion.div>
    </Card>
  </motion.div>
)

const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <motion.div style={{ y }} className="relative z-10">
      {children}
    </motion.div>
  )
}

const TestimonialCard = ({ quote, author, role }: { quote: string, author: string, role: string }) => (
  <motion.div
    className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-lg"
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <p className="text-lg mb-4 italic">"{quote}"</p>
    <div className="flex items-center">
      <div className="w-12 h-12 bg-primary rounded-full mr-4"></div>
      <div>
        <p className="font-bold">{author}</p>
        <p className="text-sm text-gray-300">{role}</p>
      </div>
    </div>
  </motion.div>
)

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('darkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('darkMode', 'false')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <CalendarDays className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TimetableGen</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link href="/signin">
              <Button size="lg" variant="outline" className="bg-primary text-white hover:bg-primary/90 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white/20">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <ParallaxSection>
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <TypewriterText text="Revolutionize Your College Schedule" />
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Experience the future of timetable management with our cutting-edge AI-powered generator.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="flex justify-center space-x-4"
              >
                <Link href="/signin">
                  <Button size="lg" variant="outline" className="bg-primary text-white hover:bg-primary/90 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white/20">
                    Get Started
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="dark:text-white dark:border-white dark:hover:bg-white/20">
                  Watch Demo
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </ParallaxSection>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Powerful Features to Streamline Your Schedule
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Brain}
              title="Smart Scheduling"
              description="AI-powered algorithms create optimal timetables in seconds, considering all constraints and preferences."
            />
            <FeatureCard
              icon={UserPlus}
              title="Collaborative Planning"
              description="Work together with your team to create the perfect schedule, with real-time updates and conflict resolution."
            />
            <FeatureCard
              icon={Bell}
              title="Real-time Updates"
              description="Stay informed with instant notifications for any changes or conflicts in your schedule."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Conflict Resolution"
              description="Automatically detect and resolve scheduling conflicts, ensuring a smooth academic experience."
            />
            <FeatureCard
              icon={LayoutGrid}
              title="Multiple Views"
              description="Customize your timetable view with daily, weekly, or monthly perspectives for better planning."
            />
            <FeatureCard
              icon={Users}
              title="Resource Management"
              description="Efficiently allocate classrooms, labs, and other resources to maximize utilization."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-primary to-secondary text-white relative z-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <TestimonialCard
              quote="This timetable generator has completely transformed how we manage our college schedules. It's intuitive, powerful, and a joy to use!"
              author="Sarah Johnson"
              role="Dean of Students, XYZ University"
            />
            <TestimonialCard
              quote="The AI-powered scheduling has saved us countless hours. It's like having a personal assistant for timetable management."
              author="Prof. Michael Chen"
              role="Department Head, ABC College"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white dark:bg-gray-900 relative z-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose the Perfect Plan for Your Institution
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Basic', 'Pro', 'Enterprise'].map((plan) => (
              <motion.div
                key={plan}
                className="border rounded-lg p-6 text-center bg-white dark:bg-gray-800 dark:border-gray-700"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold mb-4">{plan}</h3>
                <p className="text-4xl font-bold mb-6">
                  {plan === 'Basic' ? '$99' : plan === 'Pro' ? '$199' : 'Custom'}
                  {plan !== 'Enterprise' && <span className="text-sm font-normal">/month</span>}
                </p>
                <ul className="text-left mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    {plan === 'Basic' ? '100 Users' : plan === 'Pro' ? '500 Users' : 'Unlimited Users'}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    {plan === 'Basic' ? 'Basic AI Scheduling' : 'Advanced AI Scheduling'}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-primary mr-2" />
                    {plan === 'Basic' ? 'Email Support' : plan === 'Pro' ? '24/7 Support' : 'Dedicated Account Manager'}
                  </li>
                </ul>
                <Button
                  className={`w-full ${plan === 'Pro' ? 'bg-primary text-white hover:bg-primary/90 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white/20' : 'bg-white text-primary hover:bg-gray-100 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white/20'}`}
                  variant="outline"
                >
                  {plan === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Ready to Transform Your Scheduling?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join thousands of satisfied institutions and experience the power of AI-driven timetable management.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/signin">
              <Button size="lg" variant="outline" className="bg-primary text-white hover:bg-primary/90 dark:bg-transparent dark:text-white dark:border-white dark:hover:bg-white/20">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <CalendarDays className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">TimetableGen</span>
              </Link>
              <p className="text-sm text-gray-400">Revolutionizing college scheduling with AI-powered solutions.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            © 2024 TimetableGen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}