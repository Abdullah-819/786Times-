import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import Animated, { FadeInDown } from 'react-native-reanimated'

const { width } = Dimensions.get('window')

const SQUAD_MEMBERS = [
    {
        name: "Muhammad Safiullah Khan",
        role: "Data Engineer",
        initials: "SK",
        color: ['#F59E0B', '#D97706']
    },
    {
        name: "Abdullah Rana",
        role: "MERN STACK DEVELOPER",
        initials: "AR",
        color: ['#6366F1', '#4F46E5']
    },
    {
        name: "AHMAD ALI",
        role: "GRAPHICS AND APPEARANCE",
        initials: "AA",
        color: ['#EC4899', '#DB2777']
    },
    {
        name: "MUHAMMAD AHMED",
        role: "APP UI AND RESPONSIVENESS",
        initials: "MA",
        color: ['#10B981', '#059669']
    }
]

export default function AboutScreen({ navigation }: any) {
    const openLink = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Couldn't load page", err))
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#0F172A', '#1E1B4B', '#0F172A']} style={StyleSheet.absoluteFill} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>The 786 Squad</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.delay(100).springify()}>
                    <BlurView intensity={20} tint="light" style={styles.aboutCard}>
                        <Text style={styles.sectionTitle}>MISSION STATEMENT</Text>
                        <Text style={styles.description}>
                            786Times is a spiritually grounded academic assistant designed to
                            streamline university life. We combine high-performance
                            scheduling with daily spiritual reminders to help students maintain balance.
                        </Text>
                    </BlurView>
                </Animated.View>

                <Text style={styles.teamTitle}>Core Team</Text>

                {SQUAD_MEMBERS.map((member, index) => (
                    <Animated.View
                        key={member.name}
                        entering={FadeInDown.delay(200 + index * 100).springify()}
                    >
                        <BlurView intensity={15} tint="dark" style={styles.memberCard}>
                            <LinearGradient
                                colors={member.color as any}
                                style={styles.memberAvatar}
                            >
                                <Text style={styles.avatarText}>{member.initials}</Text>
                            </LinearGradient>
                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberRole}>{member.role}</Text>
                            </View>
                        </BlurView>
                    </Animated.View>
                ))}

                <View style={styles.divider} />

                <Text style={styles.sectionTitle}>THE TECH STACK</Text>
                <Text style={styles.description}>
                    Built with React Native and Reanimated, featuring ultra-realistic
                    timetable management, real-time metrics, and a dynamic Quranic intro
                    system to keep you inspired every day.
                </Text>

                <View style={{ height: 40 }} />
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
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: theme.colors.white,
        letterSpacing: -1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    aboutCard: {
        padding: 24,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        marginBottom: 32,
    },
    teamTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 12,
    },
    memberAvatar: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '900',
    },
    memberInfo: {
        flex: 1,
        marginLeft: 16,
    },
    memberName: {
        fontSize: 17,
        fontWeight: '800',
        color: '#fff',
        letterSpacing: -0.3,
    },
    memberRole: {
        fontSize: 11,
        fontWeight: '700',
        color: '#818CF8',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 10,
        fontWeight: '900',
        color: '#818CF8',
        letterSpacing: 1.5,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
        lineHeight: 20,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 32,
    },
})
