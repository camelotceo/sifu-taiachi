import fs from 'fs'
import path from 'path'

const PAGES_DIR = path.join(process.cwd(), 'data', 'pages')

export interface PageContent {
  meta: {
    title: string
    description: string
    path: string
  }
  [key: string]: any
}

export function getPageContent(pageName: string): PageContent | null {
  try {
    const filePath = path.join(PAGES_DIR, `${pageName}.json`)
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading page content for ${pageName}:`, error)
    return null
  }
}

export function savePageContent(pageName: string, content: PageContent): boolean {
  try {
    // Ensure the pages directory exists
    if (!fs.existsSync(PAGES_DIR)) {
      fs.mkdirSync(PAGES_DIR, { recursive: true })
    }
    
    const filePath = path.join(PAGES_DIR, `${pageName}.json`)
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`Error saving page content for ${pageName}:`, error)
    return false
  }
}

export function getAllPages(): string[] {
  try {
    if (!fs.existsSync(PAGES_DIR)) {
      return []
    }
    
    const files = fs.readdirSync(PAGES_DIR)
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => file.replace('.json', ''))
  } catch (error) {
    console.error('Error reading pages directory:', error)
    return []
  }
}

export function getPageMeta(pageName: string): { title: string; description: string; path: string } | null {
  const content = getPageContent(pageName)
  return content?.meta || null
} 