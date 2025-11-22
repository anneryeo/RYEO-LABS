import axios from 'axios'

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions) {
  const {
    to,
    subject,
    html,
    from = 'noreply@ryeo-labs.com',
  } = options

  try {
    const response = await axios.post(
      `${process.env.POSTAL_SERVER_URL}/api/v1/send/message`,
      {
        to: [{ email: to }],
        from: from,
        subject: subject,
        html: html,
      },
      {
        headers: {
          'X-Server-API-Key': process.env.POSTAL_API_KEY,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

export async function sendWelcomeEmail(email: string) {
  return sendEmail({
    to: email,
    subject: 'Welcome to Ryeo Labs',
    html: `
      <h1>Welcome to Ryeo Labs</h1>
      <p>Thanks for subscribing to my newsletter!</p>
      <p>You'll be the first to know about new blog posts, projects, and updates.</p>
      <p>- Anne Reyes</p>
    `,
  })
}

export async function sendNewPostNotification(
  email: string,
  postTitle: string,
  postUrl: string,
  postExcerpt: string
) {
  return sendEmail({
    to: email,
    subject: `New Post: ${postTitle}`,
    html: `
      <h2>${postTitle}</h2>
      <p>${postExcerpt}</p>
      <a href="${postUrl}">Read the full post</a>
      <hr />
      <p>Keep Moving Forward,<br />Anne Reyes - Ryeo Labs</p>
    `,
  })
}
