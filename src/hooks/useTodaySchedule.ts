import { useMemo, useState, useEffect } from 'react'
import { timetable, Section, SECTIONS } from '../data/timetable'
import { getTodayKey } from '../utils/dateUtils'
import { calculateIntensity } from '../utils/intensityCalculator'
import { Lecture } from '../types/Lecture'
import { getSelectedSection } from '../storage/sectionStore'

export const useTodaySchedule = () => {
  const [section, setSection] = useState<Section>(SECTIONS.BSE)
  const todayKey = getTodayKey().toLowerCase()

  useEffect(() => {
    getSelectedSection().then(setSection)
  }, [])

  const todayLectures: Lecture[] = timetable[section]?.[todayKey] || []

  const metrics = useMemo(() => {
    const lecturesCount = todayLectures.filter(l => l.type === 'lecture').length
    const labsCount = todayLectures.filter(l => l.type === 'lab').length
    const intensity = calculateIntensity(todayLectures)

    return {
      lecturesCount,
      labsCount,
      intensity,
      totalItems: todayLectures.length,
      currentSection: section,
    }
  }, [todayLectures, section])

  return { todayLectures, metrics }
}