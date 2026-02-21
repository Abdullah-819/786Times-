export const getTodayKey = (): string => {
  const day = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  })
  return day.toLowerCase()
}