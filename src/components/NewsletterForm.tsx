'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing! Check your email for confirmation.')
        setEmail('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Subscribe error:', error)
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-4 py-3 bg-ryeo-light text-ryeo-dark placeholder:text-ryeo-dark/50 border border-ryeo-dark/20 rounded focus:outline-none focus:border-ryeo-red transition-colors"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-ryeo-red text-ryeo-light font-semibold rounded hover:bg-ryeo-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {message && (
          <p
            className={`text-sm ${
              status === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
