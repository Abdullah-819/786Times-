import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { theme } from '../theme'
import { Ionicons } from '@expo/vector-icons'

interface Props {
    title: string
    onPress: () => void
    icon?: keyof typeof Ionicons.glyphMap
    style?: ViewStyle
}

export default function ActionButton({ title, onPress, icon, style }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
            <BlurView intensity={30} tint="light" style={styles.blur}>
                <View style={styles.content}>
                    {icon && (
                        <Ionicons name={icon} size={20} color={theme.colors.text} style={styles.icon} />
                    )}
                    <Text style={styles.text}>{title}</Text>
                </View>
            </BlurView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        height: 70,
        minWidth: 140,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    blur: {
        flex: 1,
        paddingHorizontal: theme.spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: theme.spacing.sm,
    },
    icon: {
        marginRight: 10,
        opacity: 0.9,
    },
    text: {
        color: theme.colors.text,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
})
