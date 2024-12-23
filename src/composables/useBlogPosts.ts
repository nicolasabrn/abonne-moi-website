import { ref } from 'vue'
import frontMatter from 'front-matter'
import { marked } from 'marked'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  coverImage: string
  author?: {
    name: string
    img: string
  }
  categories?: string[]
  tags?: string[]
  content?: string
}

export function useBlogPosts() {
  const posts = ref<BlogPost[]>([])

  async function loadPosts() {
    const blogFiles = import.meta.glob('../content/blog/*.md', {
      query: '?raw',
      import: 'default',
      eager: true
    })

    posts.value = Object.entries(blogFiles).map(([path, content]) => {
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      const { attributes, body } = frontMatter(content as string)

      return {
        slug,
        ...(attributes as Omit<BlogPost, 'slug' | 'content'>),
        content: marked(body)
      } as BlogPost
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  loadPosts()

  return {
    posts
  }
}
