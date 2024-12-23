import { ref } from 'vue'
import frontMatter from 'front-matter'
import MarkdownIt from 'markdown-it'
import type { BlogPost } from '../types/blog'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
})

function extractComponents(content: string) {
  const components = []
  let remainingContent = content

  // Extract ArticleTitle components and replace with markers
  const titleRegex = /<ArticleTitle\s+text="([^"]+)"\s*\/>/g
  let titleMatch
  while ((titleMatch = titleRegex.exec(content)) !== null) {
    const componentId: string = `component-${components.length}`
    components.push({
      id: componentId,
      type: 'ArticleTitle',
      props: { text: titleMatch[1] }
    })
    remainingContent = remainingContent.replace(titleMatch[0], `<!--${componentId}-->`)
  }

  // Extract ArticleResume components and replace with markers
  const resumeRegex = /<ArticleResume\s+text="([^"]+)"\s*\/>/g
  let resumeMatch
  while ((resumeMatch = resumeRegex.exec(content)) !== null) {
    const componentId: string = `component-${components.length}`
    components.push({
      id: componentId,
      type: 'ArticleResume',
      props: { text: resumeMatch[1] }
    })
    remainingContent = remainingContent.replace(resumeMatch[0], `<!--${componentId}-->`)
  }

  // Extract ArticleCta components and replace with markers
  const ctaRegex = /<ArticleCta[^>]*\s+link="([^"]+)"\s+label="([^"]+)"\s+description="([^"]+)"\s+ctaLabel="([^"]+)"(?:\s+icon="([^"]+)")?\s*(?:secondaryLink="([^"]+)")?\s*(?:secondaryLabel="([^"]+)")?\s*\/>/g
  let ctaMatch
  while ((ctaMatch = ctaRegex.exec(content)) !== null) {
    const componentId: string = `component-${components.length}`
    components.push({
      id: componentId,
      type: 'ArticleCta',
      props: {
        link: ctaMatch[1],
        label: ctaMatch[2],
        description: ctaMatch[3],
        ctaLabel: ctaMatch[4],
        icon: ctaMatch[5] || undefined,
        secondaryLink: ctaMatch[6] || undefined,
        secondaryLabel: ctaMatch[7] || undefined
      }
    })
    remainingContent = remainingContent.replace(ctaMatch[0], `<!--${componentId}-->`)
  }

  return { components, remainingContent }
}

export function useBlogPosts() {
  const posts = ref<BlogPost[]>([])

  async function loadPosts() {
    const blogFiles = import.meta.glob('../content/blog/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    })

    posts.value = Object.entries(blogFiles).map(([path, content]) => {
      const slug = path.split('/').pop()?.replace('.md', '') || ''
      const { attributes, body } = frontMatter(content as string)

      // First extract components from the raw markdown
      const { components, remainingContent } = extractComponents(body)

      // Then render the remaining content as markdown
      const renderedContent = md.render(remainingContent)

      return {
        slug,
        ...(attributes as any),
        components,
        content: renderedContent
      }
    })
  }

  loadPosts()

  return {
    posts
  }
}
