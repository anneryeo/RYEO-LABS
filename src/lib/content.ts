import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
  title: string
  author: string
  date: string
  slug: string
  featured?: boolean
  type: 'blog' | 'project'
  tags: string[]
  image: string
  excerpt: string
}

export interface Post extends PostMetadata {
  content: string
}

const contentDir = path.join(process.cwd(), 'src/content')

export function getAllPosts(type: 'blog' | 'project'): Post[] {
  const postDir = path.join(contentDir, type === 'blog' ? 'posts' : 'projects')

  if (!fs.existsSync(postDir)) {
    return []
  }

  const files = fs.readdirSync(postDir)

  const posts = files
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(postDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)

      return {
        ...data,
        content,
      } as Post
    })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getFeaturedPosts(type: 'blog' | 'project', limit: number = 6): Post[] {
  const allPosts = getAllPosts(type)
  return allPosts.filter((post) => post.featured).slice(0, limit)
}

export function getPostBySlug(slug: string, type: 'blog' | 'project'): Post | null {
  const allPosts = getAllPosts(type)
  return allPosts.find((post) => post.slug === slug) || null
}

export function getPostsByTag(tag: string, type: 'blog' | 'project'): Post[] {
  const allPosts = getAllPosts(type)
  return allPosts.filter((post) => post.tags.includes(tag))
}

export function getAllTags(type: 'blog' | 'project'): string[] {
  const allPosts = getAllPosts(type)
  const tags = new Set<string>()

  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })

  return Array.from(tags).sort()
}
