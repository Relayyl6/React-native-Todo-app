import { createHomeStyles } from '@/assets/styles/home.styles'
import useTheme from '@/hooks/usetheme'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'

const EmptyState = () => {
    const { colors } = useTheme()

    const styles = createHomeStyles(colors)

  return (
    <View style={styles.emptyContainer}>
      <LinearGradient
        colors={colors.gradients.empty}
        style={styles.emptyListContainer}
        >
        <Ionicons sie={60} name="clipboard-outline" colors={colors.textMuted}/>
      </LinearGradient>
      <Text style={styles.emptyText}>
        No tasks yet!
      </Text>
      <Text style={styles.emptySubtext}>
        Add your first task to get started
      </Text>
    </View>
  )
}

export default EmptyState