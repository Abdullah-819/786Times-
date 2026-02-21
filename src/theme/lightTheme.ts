export const theme = {
  colors: {
    primary: '#6366F1', // Indigo
    secondary: '#EAB308', // Spiritual Gold (Islamic Accent)
    cuiNavy: '#002E5D', // Official COMSATS Navy
    deepNavy: '#1E1B4B', // Spiritual Deep Blue
    background: '#0F172A', // Slate 900
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    white: '#FFFFFF',
    border: 'rgba(255, 255, 255, 0.1)',
    accent: '#818CF8', // Light Indigo
    intensity: {
      high: '#F87171',
      moderate: '#FBBF24',
      low: '#34D399',
    },
    gradients: {
      professional: ['#002E5D', '#1E1B4B', '#0F172A'] as const,
      spiritual: ['#1E1B4B', '#312E81', '#4338CA'] as const,
      gold: ['#EAB308', '#D97706'] as const,
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 20,
    xl: 28,
  },
}
