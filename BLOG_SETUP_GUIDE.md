# Blog Website Setup Guide

By Anne - My journey to building a visually-rich blog platform

======================

## Project Overview

I'm building a modern blog that leverages advanced design capabilities with layering, transparent graphics, video attachments, and newsletter functionality. Here's my complete setup guide.

---

## 1. Technology Stack Recommendation

### Frontend Framework
- **Next.js 14+** (React-based)
  - Built-in image optimization
  - Server-side rendering for SEO
  - API routes for backend logic
  - Vercel deployment is native & seamless
  - Supports video embedding and media-heavy content

### Content Management
- **MDX or Markdown with Frontmatter**
  - Blog posts stored as files or database
  - Easy to customize styling per post
  - Supports embedded videos, images, custom components
- **Headless CMS Alternative**: Sanity, Contentful, or Strapi (if you prefer UI-based editing)

### Styling & Design
- **Tailwind CSS** + **CSS Modules**
  - Excellent for layering, transparency, image overlays
  - Semi-transparent effects built-in
  - Responsive design without effort
- **Framer Motion** (optional)
  - Smooth animations for image transitions
  - Enhanced visual polish

### Database & Backend
- **Supabase** (PostgreSQL + Authentication)
  - Newsletter subscriber storage
  - Email triggers via webhooks
  - Free tier includes 2 projects
- **Firebase** (alternative)
  - Simpler setup, real-time database
  - Built-in email functions via Cloud Functions

### Email Service - Open Source Approach

I want to keep this open-source and avoid vendor lock-in. Here are my best options:

**Self-Hosted Open Source Solutions:**

1. **Postal** (My top choice)
   - Self-hosted, open-source mail server
   - Complete control over sending infrastructure
   - Deploy on DigitalOcean, Linode, or any VPS
   - Integrates with Next.js API
   - Free for single organization (Fair Source License)

2. **OpenSMTPD + Nodemailer**
   - Lightweight SMTP server configuration
   - Deploy on my own server
   - Full control, minimal overhead
   - Open Source (ISC License)

3. **Mautic**
   - Open-source marketing automation platform
   - Manages subscriber lists and campaigns
   - Self-hosted on my infrastructure
   - Automated email scheduling
   - License: GPL v3

4. **Brevo (formerly Sendinblue)**
   - If I want a SaaS alternative (not fully open-source)
   - Free tier: 300 emails/day
   - No aggressive lock-in
   - Good for testing before self-hosting

**Cost Consideration:**
Self-hosting Postal on a $5/month DigitalOcean droplet is cheaper than SaaS options and gives me complete control.

---

## 2. Design Capabilities - Yes, It's Possible

What I can achieve with my design vision:

----

#### A. Layering & Transparency
I can create multiple image layers with CSS opacity, semi-transparent overlays over videos, gradient overlays on images, and blend modes (multiply, screen, overlay, etc.)

Example:
```css
/* Semi-transparent dark overlay on image */
.hero-image {
  position: relative;
  background: url('image.jpg');
}

.hero-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* 30% opacity */
}
```

#### B. Transparent PNGs & Image Buttons
- Store transparent PNGs in `/public/images`
- Use `<Image>` component (Next.js) for optimization
- Create interactive image buttons with hover effects

```jsx
<button className="image-button">
  <Image
    src="/button-graphic.png"
    alt="Click me"
    width={200}
    height={100}
  />
</button>

// CSS
.image-button {
  transition: all 0.3s ease;
  filter: brightness(1);
}

.image-button:hover {
  filter: brightness(1.2);
  transform: scale(1.05);
}
```

#### C. Video Attachments
- Embed YouTube, Vimeo videos via iframe
- Host videos on Vercel (for small files) or Cloudinary
- Create poster images for video thumbnails

```jsx
<video
  width="100%"
  height="auto"
  poster="/thumbnail.jpg"
  controls
>
  <source src="/video.mp4" type="video/mp4" />
</video>
```

#### D. Advanced Image Effects
- Image zoom on hover
- Parallax scrolling
- Image carousel/gallery
- Responsive images (different sizes for mobile/desktop)

---

## 3. How I'll Organize My Project

Here's the directory structure I'll use:

```
my-blog/
├── app/                          # Next.js App Router
│   ├── page.js                   # Homepage
│   ├── blog/
│   │   ├── page.js              # Blog listing
│   │   └── [slug]/
│   │       └── page.js          # Individual blog post
│   ├── api/
│   │   ├── subscribe.js         # Newsletter subscribe endpoint
│   │   └── publish-notify.js    # Send emails on new post
│   └── layout.js                # Root layout
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── BlogCard.jsx
│   ├── NewsletterForm.jsx
│   └── ImageButton.jsx
├── content/
│   └── posts/                    # My blog posts (MDX/Markdown)
│       ├── post-1.mdx
│       └── post-2.mdx
├── public/
│   ├── images/                   # My PNGs, JPGs, graphics
│   ├── videos/                   # Video files or thumbnails
│   └── icons/                    # Icon graphics
├── styles/
│   ├── globals.css
│   └── components.module.css
├── lib/
│   ├── db.js                     # Database queries
│   ├── email.js                  # Email sending logic
│   └── posts.js                  # Blog post utilities
├── .env.local                    # API keys (local only)
├── .vercelenv.example            # Template for secrets
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 4. Customizing the Design

Since I want to adjust the design myself, here's how I'll do it:

--------

### A. Color Scheme & Typography

I'll edit `/styles/globals.css` or `tailwind.config.js` to set my colors:
```css
/* globals.css */
:root {
  --primary-color: #my-color;
  --secondary-color: #my-color;
  --text-color: #333;
}
```

Or I can define colors in `tailwind.config.js`:
```js
theme: {
  colors: {
    primary: '#my-color',
    secondary: '#my-color',
  }
}
```

### B. Component Styling

Each component file has its own accompanying CSS file:
- `components/Header.jsx` paired with `styles/Header.module.css`
- I can easily modify layouts, spacing, and colors
- Responsive breakpoints are simple to adjust in CSS

### C. Blog Post Styling

My blog posts will use global styles plus custom MDX components that I can style:
```jsx
// lib/mdx-components.js
export const MDXComponents = {
  h1: (props) => <h1 className="text-4xl font-bold my-4" {...props} />,
  img: (props) => <Image {...props} className="rounded-lg shadow-lg" />,
};
```

### D. Images & Media

I can easily manage my media files:
- Upload transparent PNGs to `/public/images`
- Update image paths in my components
- Customize video embed sizes
- Add new buttons and graphics whenever I want

---

## 5. My Newsletter System Architecture

Here's how the email notification flow will work:

```
Visitor arrives at my site
    ↓
Sees newsletter signup form
    ↓
Submits email → My API endpoint (/api/subscribe)
    ↓
Email gets stored in my database
    ↓
I publish a new blog post
    ↓
Webhook/function automatically sends emails to all subscribers
    ↓
Subscribers receive email with link to my new post
```

### Implementation Steps

Here's how I'll set it up:

#### Step 1: Create Subscribe Endpoint

I'll create an API route that handles email subscriptions:ers can use:

```jsx
// components/NewsletterForm.jsx
'use client';

const [email, setEmail] = useState('');
const [status, setStatus] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  
  if (res.ok) setStatus('✅ Subscribed!');
  else setStatus('❌ Error subscribing');
};

return (
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
    />
    <button type="submit">Subscribe</button>
    {status && <p>{status}</p>}
  </form>
);
```

#### Step 3: Automated Emails When I Publish

I have two options for sending emails automatically when I publish new content:

Option A: Webhook Trigger (I publish manually, then trigger the email)
```javascript
// app/api/publish-notify.js
// I'll call this when I publish a new post

export async function POST(request) {
  const { postTitle, postUrl, postExcerpt } = await request.json();
  
  // Get all my subscribers
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('email');
  
  // Send email to each one
  for (const { email } of subscribers) {
    await sendEmail({
      to: email,
      subject: `New Post: ${postTitle}`,
      html: `<p>${postExcerpt}</p><a href="${postUrl}">Read more</a>`,
    });
  }
  
  return Response.json({ sent: subscribers.length });
}
```

Option B: Scheduled Job (Fully automatic)
- Use Vercel Cron Jobs or database scheduler
- Check for new posts automatically
- Send emails if new content exists
- No manual trigger needed

---

## 6. Deploying to Vercel

### How I'll Deploy

#### 1. Push My Code to GitHub

I'll put my blog on GitHub first:
```bash
git init
git add .
git commit -m "Initial blog setup"
git branch -M main
git remote add origin https://github.com/anneryeo/my-blog.git
git push -u origin main
```

#### 2. Connect to Vercel

I'll use Vercel's GitHub integration:
1. Go to vercel.com and sign up with my GitHub account
2. Click "New Project"
3. Select my blog repository
4. Configure my environment variables
5. Click "Deploy"

#### 3. Set Environment Variables in Vercel

In Vercel Dashboard, I'll go to Project Settings > Environment Variables and add:
```
NEXT_PUBLIC_SUPABASE_URL=my-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=my-key
SUPABASE_SERVICE_ROLE_KEY=my-secret-key
POSTAL_API_KEY=my-postal-key
```

#### 4. Auto-Deployment

Once connected:
- I push to GitHub
- Vercel automatically deploys my changes
- Preview deployments are created for pull requests
- No manual builds needed

---

## 7. How I'll Publish Blog Entries

### Option A: File-Based (Easiest for Me to Customize)

I'll create blog posts as files:

1. Create a new `.mdx` file in `/content/posts/`
2. Add frontmatter with post metadata:
```mdx
---
title: "My Amazing Post"
date: "2025-11-22"
author: "Anne"
excerpt: "A short preview..."
image: "/images/post-thumbnail.jpg"
---

# My Content Here

![Image with transparency](/images/transparent-png.png)

<video controls poster="/thumb.jpg">
  <source src="/video.mp4" type="video/mp4" />
</video>
```

3. Push to GitHub - automatically deployed and emails sent to subscribers

### Option B: CMS Dashboard (More User-Friendly)

If I want a web interface instead of editing files:
- Use Sanity or Contentful
- Write posts in a web UI without touching code
- Built-in image and video upload
- Still integrates seamlessly with my Next.js site

### Option C: Hybrid Approach (Best of Both)

I can build my own admin dashboard:
- Store posts in my database (Supabase)
- Create a `/admin` route for writing and editing
- Preview posts before publishing
- Click "Publish" to trigger email notifications automatically

---

## 8. Advanced Features I Can Add Later

As I grow, I can add:

### A. Categories & Tags

Filter my blog posts by topic:
```javascript
// Filter posts by category
const designPosts = allPosts.filter(p => p.category === 'design');
```

### B. Search Functionality

Let readers find posts quickly:
- Algolia (free tier available)
- Or simple client-side search with JavaScript

### C. Comments

Allow reader discussion:
- Disqus, Giscus, or custom comment system
- Store comments in my database

### D. Social Sharing Buttons

Let readers share my posts:
- Share to Twitter, LinkedIn, Pinterest
- Use `next-share` library

### E. Analytics

Track who's visiting:
- Vercel Analytics (built-in)
- Google Analytics
- Track subscriber engagement

### F. Dark Mode

Let readers choose their preferred theme:
```jsx
// With Tailwind
<div className="dark:bg-black dark:text-white">
  Content
</div>
```

### G. Image Optimization

Next.js handles this automatically:
- `<Image>` component auto-optimizes
- WebP conversion
- Responsive image sizes

---

## 9. Quick Start Commands

Here's how I'll set everything up:

```bash
# 1. Create Next.js project
npx create-next-app@latest my-blog --typescript --tailwind

# 2. Install my dependencies
npm install @supabase/supabase-js framer-motion

# 3. Create my directory structure
mkdir -p content/posts public/images public/videos

# 4. Create .env.local with my API keys
# (See environment variables section)

# 5. Create base components
# (See boilerplate code below)

# 6. Start development server
npm run dev

# 7. Visit my site at localhost:3000
```

---

## 10. Component Boilerplates

### My Newsletter Form Component

Here's a styled component I can use for newsletter signups:

```jsx
'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage('Thanks for subscribing!');
      setEmail('');
    } else {
      setMessage('Error subscribing. Try again.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-6 rounded-lg">
      <h2 className="text-3xl font-bold text-white mb-4">
        Get Updates in Your Inbox
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 px-4 py-2 rounded text-black"
        />
        <button
          type="submit"
          className="bg-white text-purple-600 px-6 py-2 rounded font-bold hover:bg-gray-100 transition"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="text-white mt-2">{message}</p>}
    </section>
  );
}
```

### My Blog Card Component

For displaying blog posts with image and hover effects:

```jsx
import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group cursor-pointer">
        <div className="relative overflow-hidden rounded-lg h-64 bg-gray-200">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        </div>
        <h3 className="text-xl font-bold mt-4 group-hover:text-blue-600 transition">
          {post.title}
        </h3>
        <p className="text-gray-600 mt-2">{post.excerpt}</p>
        <time className="text-sm text-gray-400">{post.date}</time>
      </article>
    </Link>
  );
}
```

---

## 11. Cost Estimate (Monthly)

Here's what I'll likely spend per month:

| Service | Free Tier | Paid Plan |
|---------|-----------|-------------|
| **Vercel** | Unlimited projects, 100GB bandwidth | $20+/month |
| **Supabase** | 500MB database, 2GB bandwidth | $25+/month |
| **Postal** (Self-hosted) | Unlimited emails on my own VPS | $5-10/month VPS |
| **Cloudinary** (optional for videos) | 25GB storage | $99+/month |

With self-hosted Postal, my total minimum cost is basically just the VPS at $5-10/month. I can use the free tiers of everything else to start.

---

## 12. My Next Steps

Here's my action plan:

1. Design System: Plan my color palette, fonts, spacing
2. Content Structure: Organize my blog posts and media files
3. Set Up Services: Create accounts for Supabase, Postal (or choose email service)
4. Build Base Site: Implement the templates above
5. Deploy: Push to Vercel
6. Test Newsletter: Send test emails, verify the flow works
7. Publish First Post: Write content and notify subscribers
8. Iterate: Adjust design, add features as I go

---

## 13. Resources I'll Reference

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Postal Self-Hosted Email](https://postal.io)
- [MDX Documentation](https://mdxjs.com/)

---

All features mentioned are production-ready and widely used by independent creators. Let me know when you're ready to start building!
