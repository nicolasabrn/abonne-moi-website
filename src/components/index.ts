import { App } from 'vue'
import ArticleTitle from './ArticleTitle.vue'
import ArticleResume from './ArticleResume.vue'
import ArticleCta from './ArticleCta.vue'

export function registerComponents(app: App) {
  app.component('ArticleTitle', ArticleTitle)
  app.component('ArticleResume', ArticleResume)
  app.component('ArticleCta', ArticleCta)
}
