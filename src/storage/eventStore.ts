import AsyncStorage from '@react-native-async-storage/async-storage'
import { Event } from '../types/Event'

const STORAGE_KEY = '@semester_events'

export const saveEvents = async (events: Event[]) => {
    try {
        const jsonValue = JSON.stringify(events)
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (e) {
        console.error('Error saving events', e)
    }
}

export const getEvents = async (): Promise<Event[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : []
    } catch (e) {
        console.error('Error getting events', e)
        return []
    }
}

export const addEvent = async (event: Event) => {
    const events = await getEvents()
    events.push(event)
    await saveEvents(events)
}

export const deleteEvent = async (id: string) => {
    const events = await getEvents()
    const filtered = events.filter(e => e.id !== id)
    await saveEvents(filtered)
}
