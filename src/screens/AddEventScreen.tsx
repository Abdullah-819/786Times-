import { View, StyleSheet, TouchableOpacity, Text, TextInput, ScrollView, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { addEvent } from '../storage/eventStore'
import { BlurView } from 'expo-blur'

export default function AddEventScreen({ navigation }: any) {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState<'midterm' | 'assignment' | 'quiz' | 'other'>('midterm')

    const handleSave = async () => {
        if (!title || !date) {
            Alert.alert('Error', 'Please fill in required fields')
            return
        }

        await addEvent({
            id: Date.now().toString(),
            title,
            date,
            type,
        })

        Alert.alert('Success', 'Event added successfully', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ])
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1E1B4B', '#312E81']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={theme.colors.white} />
                </TouchableOpacity>
                <Text style={styles.title}>New Event</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>EVENT TITLE</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Computer Networks Midterm"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DATE (YYYY-MM-DD)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="2026-03-22"
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>TYPE</Text>
                    <View style={styles.typeRow}>
                        {(['midterm', 'assignment', 'quiz', 'other'] as const).map(t => (
                            <TouchableOpacity
                                key={t}
                                style={[styles.typeButton, type === t && styles.typeButtonActive]}
                                onPress={() => setType(t)}
                            >
                                <Text style={[styles.typeText, type === t && styles.typeTextActive]}>{t}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <LinearGradient
                        colors={['#818CF8', '#6366F1']}
                        style={styles.saveGradient}
                    >
                        <Text style={styles.saveBtnText}>Secure as Event</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingHorizontal: theme.spacing.lg,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1,
    },
    content: {
        padding: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 10,
        fontWeight: '800',
        color: '#818CF8',
        letterSpacing: 2,
        marginBottom: 12,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 16,
        padding: 16,
        color: theme.colors.white,
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        fontWeight: '600',
    },
    typeRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    typeButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    typeButtonActive: {
        backgroundColor: '#6366F1',
        borderColor: '#818CF8',
    },
    typeText: {
        color: '#A5B4FC',
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    typeTextActive: {
        color: '#fff',
    },
    saveButton: {
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
    },
    saveGradient: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: 1,
    }
})
