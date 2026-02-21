import { Lecture } from '../types/Lecture'

const parseTime = (timeStr: string) => {
  const [time, period] = timeStr.split(' ')
  let [hours, minutes] = time.split(':').map(Number)

  if (period === 'PM' && hours !== 12) hours += 12
  if (period === 'AM' && hours === 12) hours = 0

  return hours + minutes / 60
}

export const calculateIntensity = (lectures: Lecture[]) => {
  const totalHours = lectures.reduce((acc, l) => {
    try {
      const startTime = parseTime(l.start)
      const endTime = parseTime(l.end)
      return acc + Math.max(0, endTime - startTime)
    } catch (e) {
      return acc
    }
  }, 0)

  if (totalHours === 0) return 'Low'
  if (totalHours <= 3) return 'Low'
  if (totalHours <= 5) return 'Moderate'
  return 'High'
}