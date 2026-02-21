import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

interface Props {
    status: string
    intensity: 'High' | 'Moderate' | 'Low'
}

export default function StatusBadge({ status, intensity }: Props) {
    const color = intensity === 'High'
        ? theme.colors.intensity.high
        : intensity === 'Moderate'
            ? theme.colors.intensity.moderate
            : theme.colors.intensity.low

    return (
        <View style={[styles.container, { backgroundColor: color + '20' }]}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={[styles.text, { color }]}>{status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.borderRadius.sm,
        alignSelf: 'flex-start',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
})
