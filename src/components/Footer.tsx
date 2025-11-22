'use client'

const socialLinks = [
  { href: 'https://github.com', label: 'GitHub', icon: '𝘨' },
  { href: 'https://linkedin.com', label: 'LinkedIn', icon: '𝘪𝘯' },
  { href: 'https://instagram.com', label: 'Instagram', icon: '📷' },
  { href: 'https://facebook.com', label: 'Facebook', icon: '𝘧' },
  { href: 'https://threads.net', label: 'Threads', icon: '⚙️' },
  { href: 'https://youtube.com', label: 'YouTube', icon: '▶️' },
]

export default function Footer() {
  return (
    <footer className="bg-ryeo-dark text-ryeo-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">RYEO LABS</h2>
          <p className="text-ryeo-light/70 mb-4">By Anne Reyes</p>
          <p className="text-ryeo-light/60 text-sm max-w-md mx-auto">
            Keep Moving Forward. Innovation Laboratory for Technology, Inventions & Growth.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.label}
              className="text-ryeo-light hover:text-ryeo-accent transition-colors text-2xl"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-ryeo-light/20 pt-8 text-center text-ryeo-light/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Ryeo Labs. All rights reserved.</p>
          <p className="mt-2">Designed & built with innovation in mind.</p>
        </div>
      </div>
    </footer>
  )
}
