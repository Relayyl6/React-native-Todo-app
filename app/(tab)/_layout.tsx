import useTheme from '@/hooks/usetheme'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {

    const { colors } = useTheme()

  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 80,
            paddingBottom: 30,
            paddingTop: 10
        },
        tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: "600"
        },
        headerShown: false
    }}>
        <Tabs.Screen
            name = "index"
            options = {{
                title: "todos",
                tabBarIcon: ({ color, size }) => <Ionicons name="flash-outline" color={color} size={size} />
            }}
        />
        <Tabs.Screen
            name = "settings"
            options = {{
                title: "settings",
                tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />
            }}
        />
    </Tabs>
  )
}

export default TabsLayout