import fs from 'fs'
import path from 'path'

export interface TimelineEvent {
  id: string
  date: string
  type: 'award' | 'milestone' | 'activity' | 'event'
  title: string
  description: string
  image?: string
}

export function getAllTimelineEvents(): TimelineEvent[] {
  const timelineFilePath = path.join(
    process.cwd(),
    'src/content/timeline.json'
  )

  if (!fs.existsSync(timelineFilePath)) {
    return []
  }

  const fileContent = fs.readFileSync(timelineFilePath, 'utf-8')
  const events: TimelineEvent[] = JSON.parse(fileContent)

  return events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getTimelineEventsByType(type: TimelineEvent['type']): TimelineEvent[] {
  const events = getAllTimelineEvents()
  return events.filter((event) => event.type === type)
}
