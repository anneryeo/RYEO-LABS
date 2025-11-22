# Open-Source Email Solutions for My Blog

By Anne - Finding the right email service that doesn't lock me in

=================

## Why Open-Source?

As an independent creator, I want:
- Full control over my email infrastructure
- No vendor lock-in
- Transparency in how emails are sent
- The freedom to modify my system as I grow
- Lower long-term costs

=================

## Option 1: Postal (My Recommended Choice)

**What it is:** Self-hosted open-source mail server

**License:** Fair Source License (free for single organization)

**Pros:**
- Complete control over all email sending
- Beautiful web dashboard for managing campaigns
- Full API access for automation
- Can host on affordable VPS ($5-10/month)
- No limits on email volume
- Built specifically for bulk email and transactional emails

**Cons:**
- Requires server setup and maintenance
- Need to handle email deliverability (SPF, DKIM, DMARC)
- Database setup required
- Higher technical barrier than SaaS

**Setup:**
```bash
# Deploy on DigitalOcean droplet
# Docker-based setup makes it straightforward
# Full documentation at postal.io
```

**Cost:** $0 software + $5-10/month for VPS = $5-10/month total

**Best For:** Me, since I want complete control and don't mind the setup

========

## Option 2: OpenSMTPD + Nodemailer

**What it is:** Lightweight SMTP server + Node.js email library

**License:** ISC License (Open Source)

**Pros:**
- Minimal footprint - very lightweight
- Can run on cheapest VPS
- Direct integration with my Next.js app
- Maximum customization

**Cons:**
- Very bare-bones - no dashboard
- Requires manual configuration
- Less documentation than Postal
- No built-in campaign management

**Setup:**
```bash
# Install on Ubuntu/Debian VPS
apt-get install opensmtpd

# Use Nodemailer in my app
npm install nodemailer
```

**Cost:** $0 software + $3-5/month for minimal VPS

**Best For:** If I want the absolute cheapest option with minimal features

========

## Option 3: Mautic

**What it is:** Open-source marketing automation platform

**License:** GPL v3 (Open Source)

**Pros:**
- Full marketing automation platform
- Built-in email templates and campaigns
- Contact/subscriber management interface
- Can schedule emails automatically
- Full web UI - no command line needed

**Cons:**
- Larger resource footprint than Postal
- More complex setup
- Steeper learning curve
- Overkill if I just want basic newsletter

**Setup:**
```bash
# Can be deployed on shared hosting or VPS
# Docker support available
# Detailed setup guides at mautic.org
```

**Cost:** $0 software + $10-20/month for hosting (larger VPS needed)

**Best For:** If I want to grow into full marketing automation

========

## Option 4: Strapi (Self-Hosted CMS) + Email Plugin

**What it is:** Headless CMS with email functionality

**License:** MIT (Open Source)

**Pros:**
- Manage blog content AND subscribers in one place
- Email plugin handles sending
- Admin dashboard for everything
- Can grow features with plugins
- Very flexible

**Cons:**
- Not specifically designed for bulk email
- More overhead than dedicated email service
- Need to configure email plugin separately

**Setup:**
```bash
# Create Strapi project
npx create-strapi-app my-blog

# Install email plugin
npm install strapi-plugin-email

# Configure email backend (Sendmail, SMTP, etc)
```

**Cost:** $0 software + $5-15/month for VPS

**Best For:** If I want to manage everything from one admin panel

========

## Option 5: Brevo (SaaS Alternative)

**What it is:** Formerly Sendinblue - email marketing platform

**License:** Proprietary, but open-source friendly

**Note:** Not fully open-source, but included here as best SaaS alternative

**Pros:**
- Free tier: 300 emails/day
- No aggressive vendor lock-in
- Good email deliverability
- Simple API
- UI-based campaign builder

**Cons:**
- Not open-source
- Closed infrastructure
- Dependent on third party

**Cost:** Free tier (300/day) or paid plans

**Best For:** Quick testing before committing to self-hosted

========

## My Recommendation: Postal

Here's why I'm going with Postal:

1. **Open Source Philosophy:** GPL-compatible licensing, community-driven
2. **Cost Effective:** $5-10/month VPS vs $20+ for SaaS
3. **Control:** Full control over my sending infrastructure
4. **Scalability:** No limits on email volume
5. **Features:** Dashboard, API, campaign management all built-in
6. **Setup:** Docker makes deployment straightforward
7. **Documentation:** Good documentation and active community

========

## Implementation Plan

### Step 1: Set Up VPS
```bash
# Create DigitalOcean droplet (cheapest option: $5/month)
# Choose Ubuntu 22.04
# Enable automatic backups
```

### Step 2: Install Postal
```bash
# SSH into server
ssh root@your-droplet-ip

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Deploy Postal with Docker
# Follow: https://docs.postalserver.io/getting-started/docker
```

### Step 3: Configure Email Settings
```bash
# Set up SPF, DKIM, DMARC records
# Update DNS for my domain
# Test email delivery
```

### Step 4: Integrate with My Next.js App
```javascript
// lib/email.js
import axios from 'axios';

export async function sendNewsletterEmail(to, subject, html) {
  const response = await axios.post(
    'https://my-postal-server.com/api/v1/send/message',
    {
      to: [{ email: to }],
      from: 'noreply@my-domain.com',
      subject: subject,
      html: html,
    },
    {
      headers: {
        'X-Server-API-Key': process.env.POSTAL_API_KEY,
      }
    }
  );
  
  return response.data;
}
```

### Step 5: Connect to Subscribe Endpoint
```javascript
// app/api/publish-notify.js
import { sendNewsletterEmail } from '@/lib/email';

export async function POST(request) {
  const { postTitle, postUrl, postExcerpt } = await request.json();
  
  // Get subscribers from Supabase
  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('email');
  
  // Send via my Postal server
  for (const { email } of subscribers) {
    await sendNewsletterEmail(
      email,
      `New Post: ${postTitle}`,
      `<p>${postExcerpt}</p><a href="${postUrl}">Read more</a>`
    );
  }
  
  return Response.json({ sent: subscribers.length });
}
```

========

## Deliverability Considerations

Whichever I choose, I need to set up:

**SPF (Sender Policy Framework)**
```
v=spf1 include:postal.example.com ~all
```

**DKIM (DomainKeys Identified Mail)**
- Generate keys in Postal dashboard
- Add DNS records

**DMARC (Domain-based Message Authentication)**
```
v=DMARC1; p=quarantine; rua=mailto:postmaster@my-domain.com
```

These aren't optional - without them, my emails end up in spam folders. Each email service provides guides for setting these up.

========

## Scaling Path

1. **Start:** Postal on $5 droplet with ~100 subscribers
2. **Grow:** Add email campaign features as needed
3. **Scale:** Add dedicated IP for better deliverability (optional)
4. **Enterprise:** Switch to managed Postal hosting if needed

========

## Resources

- [Postal Documentation](https://docs.postalserver.io)
- [Mautic Documentation](https://docs.mautic.org)
- [OpenSMTPD Handbook](https://www.opensmtpd.org)
- [Email Deliverability Guide](https://returnemail.com/best-practices)
- [SPF/DKIM/DMARC Explained](https://postmark.com/guides/spf-dkim-dmarc)

========

For my setup, I'm going with Postal. It's open-source, cost-effective, and gives me complete control over my newsletter infrastructure as I grow. Let me know when you're ready to help set it up!
