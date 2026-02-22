import { Lecture } from '../types/Lecture'

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'

export const SECTIONS = {
  BSE: 'SP25-BSE-3-B',
  BCS: 'FA24-BCS-4-E',
  BCS_ALT: 'FA24-BCS-4-F',
} as const

export type Section = typeof SECTIONS[keyof typeof SECTIONS]

export const timetable: Record<string, Record<Weekday, Lecture[]>> = {
  [SECTIONS.BSE]: {
    monday: [
      { id: 'bse-m1', title: 'Database Systems', type: 'lecture', start: '09:00 AM', end: '10:00 AM', venue: 'D8', teacher: 'Ms. Afia Afzaal', slot: '2nd Slot' },
      { id: 'bse-m2', title: 'Database Systems', type: 'lab', start: '11:00 AM', end: '01:00 PM', venue: 'CLab-9', teacher: 'Ms. Afia Afzaal', slot: '4th Slot' },
      { id: 'bse-m3', title: 'Database Systems', type: 'lab', start: '01:00 PM', end: '02:00 PM', venue: 'CLab-9', teacher: 'Ms. Afia Afzaal', slot: '5th Slot' },
    ],
    tuesday: [
      { id: 'bse-t1', title: 'Software Engineering', type: 'lecture', start: '08:00 AM', end: '09:00 AM', venue: 'D2', teacher: 'Ms. Abida Kausar', slot: '1st Slot' },
      { id: 'bse-t2', title: 'Fundamentals of Digital Logic Design', type: 'lab', start: '09:00 AM', end: '10:00 AM', venue: 'DLD Lab', teacher: 'Mr. Kashif', slot: '2nd Slot' },
      { id: 'bse-t3', title: 'Data Structures', type: 'lecture', start: '11:00 AM', end: '12:00 PM', venue: 'C1.1', teacher: 'Dr. Muhammad Shoaib', slot: '4th Slot' },
    ],
    wednesday: [
      { id: 'bse-w1', title: 'Calculus and Analytic Geometry', type: 'lecture', start: '08:00 AM', end: '09:00 AM', venue: 'D4', teacher: 'Dr. Amar Rauf', slot: '1st Slot' },
      { id: 'bse-w2', title: 'Data Structures', type: 'lecture', start: '09:00 AM', end: '10:00 AM', venue: 'C1.4', teacher: 'Dr. Muhammad Shoaib', slot: '2nd Slot' },
      { id: 'bse-w3', title: 'Software Engineering', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'W2', teacher: 'Ms. Abida Kausar', slot: '3rd Slot' },
      { id: 'bse-w4', title: 'Database Systems', type: 'lecture', start: '11:00 AM', end: '12:00 PM', venue: 'D4', teacher: 'Ms. Afia Afzaal', slot: '4th Slot' },
      { id: 'bse-w5', title: 'Fundamentals of Digital Logic Design', type: 'lecture', start: '01:00 PM', end: '02:00 PM', venue: 'D9', teacher: 'Mr. Khalid Majeed', slot: '5th Slot' },
    ],
    thursday: [
      { id: 'bse-th1', title: 'Calculus and Analytic Geometry', type: 'lecture', start: '08:00 AM', end: '09:00 AM', venue: 'C2.5', teacher: 'Dr. Amar Rauf', slot: '1st Slot' },
      { id: 'bse-th2', title: 'Data Structures', type: 'lab', start: '09:00 AM', end: '10:00 AM', venue: 'CLab-3', teacher: 'Mr. Shehzad Ali', slot: '2nd Slot' },
      { id: 'bse-th3', title: 'Fundamentals of Digital Logic Design', type: 'lecture', start: '11:00 AM', end: '12:00 PM', venue: 'D9', teacher: 'Mr. Khalid Majeed', slot: '4th Slot' },
    ],
    friday: [],
  },
  [SECTIONS.BCS]: {
    monday: [
      { id: 'bcs-m1', title: 'Computer Networks', type: 'lab', start: '09:00 AM', end: '10:00 AM', venue: 'CLab-11', teacher: 'Mr. Muhammad Usman Nasir', slot: '2nd Slot' },
      { id: 'bcs-m2', title: 'Information Security', type: 'lecture', start: '01:00 PM', end: '02:00 PM', venue: 'C1', teacher: 'Mr. Muhammad Umar', slot: '5th Slot' },
    ],
    tuesday: [],
    wednesday: [
      { id: 'bcs-w1', title: 'Computer Networks', type: 'lecture', start: '09:00 AM', end: '10:00 AM', venue: 'D9', teacher: 'Mr. Muhammad Usman Nasir', slot: '2nd Slot' },
      { id: 'bcs-w2', title: 'Artificial Intelligence', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'D1', teacher: 'Ms. Rimsha Rafiq', slot: '3rd Slot' },
      { id: 'bcs-w3', title: 'Multivariable Calculus', type: 'lecture', start: '11:00 AM', end: '12:00 PM', venue: 'C1.3', teacher: 'Dr. Asma', slot: '4th Slot' },
      { id: 'bcs-w4', title: 'Information Security', type: 'lecture', start: '01:00 PM', end: '02:00 PM', venue: 'C1.1', teacher: 'Mr. Muhammad Umar', slot: '5th Slot' },
    ],
    thursday: [
      { id: 'bcs-th1', title: 'Information Security', type: 'lab', start: '08:00 AM', end: '09:00 AM', venue: 'CLab-9', teacher: 'Ms. Nusra Rehman', slot: '1st Slot' },
      { id: 'bcs-th2', title: 'Multivariable Calculus', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'B7', teacher: 'Dr. Asma', slot: '3rd Slot' },
      { id: 'bcs-th3', title: 'Artificial Intelligence', type: 'lab', start: '11:00 AM', end: '12:00 PM', venue: 'CLab-2', teacher: 'Ms. Rimsha Rafiq', slot: '4th Slot' },
      { id: 'bcs-th4', title: 'Artificial Intelligence', type: 'lab', start: '01:00 PM', end: '02:00 PM', venue: 'CLab-2', teacher: 'Ms. Rimsha Rafiq', slot: '5th Slot' },
    ],
    friday: [
      { id: 'bcs-f1', title: 'Artificial Intelligence', type: 'lecture', start: '09:00 AM', end: '10:00 AM', venue: 'C4', teacher: 'Ms. Rimsha Rafiq', slot: '2nd Slot' },
      { id: 'bcs-f2', title: 'Computer Networks', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'D1', teacher: 'Mr. Muhammad Usman Nasir', slot: '3rd Slot' },
    ],
  },
  [SECTIONS.BCS_ALT]: {
    monday: [
      { id: 'bcs-alt-m1', title: 'Artificial Intelligence', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'B13', teacher: 'Mr. Manzar Abbas', slot: '3rd Slot' },
      { id: 'bcs-alt-m2', title: 'Information Security', type: 'lab', start: '11:00 AM', end: '12:00 PM', venue: 'CLab-4', teacher: 'Ms. Nusra Rehman', slot: '4th Slot' },
      { id: 'bcs-alt-m3', title: 'Information Security', type: 'lab', start: '01:00 PM', end: '02:00 PM', venue: 'CLab-4', teacher: 'Ms. Nusra Rehman', slot: '5th Slot' },
    ],
    tuesday: [
      { id: 'bcs-alt-t1', title: 'Computer Networks', type: 'lab', start: '08:00 AM', end: '09:00 AM', venue: 'Networking Lab', teacher: 'Ms. Sameen Fatima', slot: '1st Slot' },
      { id: 'bcs-alt-t2', title: 'Information Security', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'C1', teacher: 'Mr. Muhammad Umar', slot: '3rd Slot' },
      { id: 'bcs-alt-t3', title: 'Artificial Intelligence', type: 'lecture', start: '11:00 AM', end: '12:00 PM', venue: 'D1', teacher: 'Mr. Manzar Abbas', slot: '4th Slot' },
    ],
    wednesday: [
      { id: 'bcs-alt-w1', title: 'Information Security', type: 'lecture', start: '08:00 AM', end: '09:00 AM', venue: 'C5', teacher: 'Mr. Muhammad Umar', slot: '1st Slot' },
      { id: 'bcs-alt-w2', title: 'Multivariable Calculus', type: 'lecture', start: '09:00 AM', end: '10:00 AM', venue: 'D1', teacher: 'Dr. Misbah Arshad', slot: '2nd Slot' },
      { id: 'bcs-alt-w3', title: 'Computer Networks', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'B3', teacher: 'Ms. Sameen Fatima', slot: '3rd Slot' },
    ],
    thursday: [
      { id: 'bcs-alt-th1', title: 'Artificial Intelligence', type: 'lab', start: '08:00 AM', end: '09:00 AM', venue: 'CLab-2', teacher: 'Mr. Manzar Abbas', slot: '1st Slot' },
      { id: 'bcs-alt-th2', title: 'Multivariable Calculus', type: 'lecture', start: '10:00 AM', end: '11:00 AM', venue: 'W4', teacher: 'Dr. Misbah Arshad', slot: '3rd Slot' },
      { id: 'bcs-alt-th3', title: 'Computer Networks', type: 'lecture', start: '01:00 PM', end: '02:00 PM', venue: 'W4', teacher: 'Ms. Sameen Fatima', slot: '5th Slot' },
    ],
    friday: [],
  },
}
