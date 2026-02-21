export interface Event {
    id: string
    title: string
    date: string // ISO date string
    time?: string
    venue?: string
    description?: string
    type: 'midterm' | 'assignment' | 'quiz' | 'other'
}
