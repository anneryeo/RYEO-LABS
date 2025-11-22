'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/timeline', label: 'Timeline' },
]

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: '𝘨' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: '𝘪𝘯' },
  { href: 'https://instagram.com', label: 'Instagram', icon: '📷' },
  { href: 'https://facebook.com', label: 'Facebook', icon: '𝘧' },
  { href: 'https://threads.net', label: 'Threads', icon: '⚙️' },
  { href: 'https://youtube.com', label: 'YouTube', icon: '▶️' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Main nav links */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-ryeo-dark hover:text-ryeo-red transition-colors text-sm font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side - Social links */}
            <div className="hidden md:flex space-x-4 ml-auto">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="text-ryeo-dark hover:text-ryeo-red transition-colors text-xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden ml-auto"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X size={24} className="text-ryeo-dark" />
              ) : (
                <Menu size={24} className="text-ryeo-dark" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-ryeo-light md:hidden">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-ryeo-dark hover:text-ryeo-red transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-ryeo-dark/10 flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="text-ryeo-dark hover:text-ryeo-red transition-colors text-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
