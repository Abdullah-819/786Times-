import AsyncStorage from '@react-native-async-storage/async-storage'
import { Section, SECTIONS } from '../data/timetable'

const KEY = '@selected_section'

export const saveSection = async (section: Section) => {
    try {
        await AsyncStorage.setItem(KEY, section)
    } catch (e) {
        console.error('Error saving section', e)
    }
}

export const getSelectedSection = async (): Promise<Section> => {
    try {
        const value = await AsyncStorage.getItem(KEY)
        return (value as Section) || SECTIONS.BSE
    } catch (e) {
        return SECTIONS.BSE
    }
}
