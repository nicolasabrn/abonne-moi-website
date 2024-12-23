export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  coverImage: string
  readTime: string
  categories?: string[]
  author?: {
    name: string
    img: string
  }
  components?: any[] // Adjust this type based on your actual components structure
}
