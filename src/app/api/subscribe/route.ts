import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Invalid email provided' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if subscriber already exists
    const { data: existing } = await supabase
      .from('subscribers')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Already subscribed with this email' },
        { status: 409 }
      )
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{ email, subscribed_at: new Date().toISOString() }])

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      throw insertError
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}
