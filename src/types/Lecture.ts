export type LectureType = 'lecture' | 'lab'

export interface Lecture {
  id: string
  title: string
  type: LectureType
  start: string
  end: string
  venue?: string
  teacher?: string
  slot?: string
}