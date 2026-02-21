import { View, StyleSheet, Animated } from 'react-native'
import { useEffect, useRef } from 'react'
import { theme } from '../theme'

interface Props {
  percentage: number
}

export default function TimelineBar({ percentage }: Props) {
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 800,
      useNativeDriver: false,
    }).start()
  }, [percentage])

  const width = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.fill, { width }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 6,
  },
})