# Ryeo Labs - Project Blueprint

By Anne - My blog & portfolio site for Ryeo Labs

=================

## Design Foundation

**Brand Identity**
- Site Title: Ryeo Labs
- Founder: Anne Reyes
- Taglines: "Keep Moving Forward" & "You'll know who I am."
- Inspiration: Tony Stark, Space (stars, sun), innovation laboratory
- Core Message: Technology, inventions, career journey, personal growth, innovation & creativity

**Color Palette**
```
Primary Red:     #C20005
Neutral Light:   #FFFDF3
Neutral Dark:    #2C2114
Accent Orange:   #F39E00
```

**Typography**
- Font Family: Alexandria (primary)
- Line Height: 88.5%
- Weight: Bold for headings, regular for body
- Style: Modern, clean, minimalist

**Design Aesthetic**
- Layered compositions (text overlays, image stacking, semi-transparency)
- Artistic & creative with technical elements
- Background imagery (stars, space, cutout images like Iron Man)
- Seamless scrolling with continuous element transitions
- Mobile-first responsive design

=================

## Site Structure & Navigation

### Persistent Navigation Bar (Transparent)
```
Left Side:
- Home
- About
- Blog
- Projects
- Timeline
- Newsletter Signup

Right Side:
- GitHub (icon link)
- LinkedIn (icon link)
- Instagram (icon link)
- Facebook (icon link)
- Threads (icon link)
- YouTube (icon link)
```
**Style:** Transparent background, only text/icons visible, stays fixed at top during scroll

### Page Hierarchy

```
Homepage (/)
├── Hero Section (title, layered image, subtitle)
├── Featured Posts Grid (6 recent/featured blog posts)
└── Seamless scroll into About section

About (/about)
├── Header with hero styling
├── "Who is Anne Reyes & Ryeo Labs?" content
└── Seamless transition to Blog

Blog Listing (/blog)
├── Grid layout with featured photos
├── Blog cards: image, title, 2-3 sentence snippet
├── Tags/filters for finding content
├── Pagination (see more button if needed)
└── Links to individual posts

Blog Post (/blog/[slug])
├── Featured image banner (full width)
├── Title, Author (Anne), Date, Tags
├── Main content (centered, left-aligned text)
└── Footer: Ryeo Labs logo, social links

Projects (/projects)
├── Similar to blog listing but for projects
├── Tagged/categorized for filtering
├── Pagination as needed
└── Links to individual project pages

Project Detail (/projects/[slug])
├── Same layout as blog post
├── Featured project image
├── Title, Author, Date, Tags
├── Project details (centered, left-aligned)
└── Footer: logo, socials

Timeline (/timeline)
├── Chronological listing from 2024 onwards
├── Awards, activities, milestones
├── Visual timeline layout
└── Footer: logo, socials

Newsletter Signup (Bottom of all pages)
├── Email input
├── Subscribe button
├── Confirmation message
└── Ryeo Labs logo with social links below
```

=================

## Component Architecture

### Layout Components
```
app/
├── layout.tsx (Root layout with navbar)
├── Navbar.tsx (Persistent, transparent)
├── Footer.tsx (Logo + social links)
└── ...
```

### Core Components
```
components/
├── Navbar.tsx
│   ├── Navigation buttons (left)
│   └── Social icons (right)
│
├── Footer.tsx
│   ├── Logo
│   └── Social links
│
├── Hero.tsx
│   ├── Title (bold, large)
│   ├── Layered image background
│   └── Subtitle text overlay
│
├── BlogCard.tsx
│   ├── Featured image
│   ├── Title
│   ├── Snippet (2-3 sentences)
│   ├── Author, date
│   └── Tags
│
├── ProjectCard.tsx (Similar to BlogCard)
│
├── TimelineItem.tsx
│   ├── Date
│   ├── Event title
│   └── Description
│
├── NewsletterForm.tsx
│   ├── Email input
│   ├── Subscribe button
│   └── Status message
│
├── ImageOverlay.tsx (For layering images with semi-transparency)
│
└── TagFilter.tsx (For filtering blog/projects)
```

### Page Components
```
app/
├── page.tsx (Homepage)
├── about/
│   └── page.tsx
├── blog/
│   ├── page.tsx (Blog listing)
│   └── [slug]/
│       └── page.tsx (Individual post)
├── projects/
│   ├── page.tsx (Projects listing)
│   └── [slug]/
│       └── page.tsx (Individual project)
└── timeline/
    └── page.tsx
```

=================

## Data Structure

### Blog Post/Project Format (MDX with Frontmatter)
```mdx
---
title: "Post Title"
author: "Anne Reyes"
date: "2024-11-22"
slug: "post-slug"
featured: true
type: "blog" # or "project"
tags: ["technology", "innovation"]
image: "/images/featured-image.jpg"
excerpt: "2-3 sentence summary of the post"
---

# Post content here...
```

### Timeline Entry Format
```javascript
{
  date: "2024-01-15",
  type: "award", // "award", "milestone", "activity", "event"
  title: "Title of milestone",
  description: "Details about this timeline event",
  image: "/images/timeline-image.jpg" // optional
}
```

### Subscriber Database (Supabase)
```sql
CREATE TABLE subscribers (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  subscribed_at timestamp DEFAULT now(),
  active boolean DEFAULT true
);
```

=================

## Styling Strategy

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'ryeo-red': '#C20005',
        'ryeo-light': '#FFFDF3',
        'ryeo-dark': '#2C2114',
        'ryeo-accent': '#F39E00',
      },
      fontFamily: {
        'alexandria': ['Alexandria', 'sans-serif'],
      },
      lineHeight: {
        'tight': '0.885',
      },
    },
  },
};
```

### CSS Patterns for Layering
```css
/* Semi-transparent overlay */
.overlay-image {
  position: relative;
  background-size: cover;
}

.overlay-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

/* Image blend modes for creative layering */
.blend-multiply {
  mix-blend-mode: multiply;
}

.blend-screen {
  mix-blend-mode: screen;
}

.blend-overlay {
  mix-blend-mode: overlay;
}

/* Seamless scroll transitions */
.scroll-smooth {
  scroll-behavior: smooth;
}
```

=================

## Key Features Implementation

### 1. Seamless Scrolling Transitions
- Use Framer Motion for smooth animations
- Elements (like clouds) should continue visually from one section to next
- Mobile responsive means elements adapt at breakpoints

### 2. Layered Image Design
- Hero images layered behind/over text
- Multiple z-index layers for depth
- Use CSS opacity and blend modes
- Transparent PNGs for cutout images

### 3. Newsletter Integration
- Subscribe form in persistent footer
- Also accessible from navbar "Newsletter Signup" link
- API endpoint: POST /api/subscribe
- Stores email in Supabase
- Sends welcome email via Postal

### 4. Responsive Mobile Design
- Menu collapses on mobile (hamburger menu)
- Grid layouts adjust (2 columns desktop, 1 mobile)
- Text sizes scale appropriately
- Images adapt while maintaining visual coherence

### 5. Blog/Project Filtering
- Tags displayed on cards
- Click tag to filter by category
- URL updates with query params (?tag=technology)
- Can combine filters if needed

=================

## File Structure Once Built

```
my-blog/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (Homepage)
│   ├── api/
│   │   └── subscribe.ts
│   ├── about/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── timeline/
│       └── page.tsx
│
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── BlogCard.tsx
│   ├── ProjectCard.tsx
│   ├── TimelineItem.tsx
│   ├── NewsletterForm.tsx
│   ├── ImageOverlay.tsx
│   └── TagFilter.tsx
│
├── content/
│   ├── posts/ (all blog posts as .mdx)
│   ├── projects/ (all projects as .mdx)
│   └── timeline.json (timeline data)
│
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── logo.png
│   └── videos/ (if needed)
│
├── lib/
│   ├── db.ts (Supabase client)
│   ├── email.ts (Postal integration)
│   ├── posts.ts (blog post utilities)
│   ├── projects.ts (project utilities)
│   └── timeline.ts (timeline utilities)
│
├── styles/
│   ├── globals.css
│   └── components.module.css
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

=================

## Technologies

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS Modules
- **Animations:** Framer Motion
- **Content:** MDX for posts/projects
- **Database:** Supabase (PostgreSQL)
- **Email:** Postal (self-hosted)
- **Fonts:** Alexandria (Google Fonts or local)
- **Deployment:** Vercel
- **Images:** Next.js Image component with optimization

=================

## Development Phases

**Phase 1 (Foundation)**
- Set up Next.js project with Tailwind
- Create navbar & footer components
- Design color/typography system
- Set up folder structure

**Phase 2 (Layout & Core Components)**
- Build Hero component with layering
- Create BlogCard & ProjectCard
- Implement responsive grid layout
- Add image optimization

**Phase 3 (Pages)**
- Homepage with hero + featured posts
- Blog listing & blog detail pages
- Projects listing & detail pages
- About & Timeline pages
- All with seamless scrolling

**Phase 4 (Content & Database)**
- Create sample blog posts (MDX)
- Create sample projects (MDX)
- Set up timeline data
- Load content dynamically

**Phase 5 (Newsletter)**
- Build NewsletterForm component
- Create subscribe API endpoint
- Set up Supabase table
- Integrate Postal email sending

**Phase 6 (Polish & Deploy)**
- Mobile responsiveness fine-tuning
- Performance optimization
- SEO optimization
- Deploy to Vercel
- Set up custom domain

=================

Ready to move to Phase 1! Let me know when you want me to start building the Next.js project scaffold.
