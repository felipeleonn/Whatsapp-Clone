import Colors from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.background,
        tabBarActiveBackgroundColor: Colors.background,
        headerStyle: {
          backgroundColor: Colors.background,
        },
        headerShadowVisible: false,
    }}>
      <Tabs.Screen 
        name="updates" 
        options={{
          title: "Updates",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="update" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="calls" 
        options={{
          title: "Calls",
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="phone-outline" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="ccommunities" 
        options={{
          title: "Communities",
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="chats" 
        options={{
          title: "Chats",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }} 
      />
    </Tabs>
  )
}

export default Layout