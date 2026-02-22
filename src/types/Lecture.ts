export type LectureType = 'lecture' | 'lab'

export interface Lecture {
  id: string
  title: string
  type: LectureType
  start: string
  end: string
  slot: string
  venue: string
  teacher: string
}