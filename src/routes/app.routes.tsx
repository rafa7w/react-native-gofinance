import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Dashboard } from '@screens/Dashboard';
import { Register } from '@screens/Register';
import { Resume } from '@screens/Resume';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  const { COLORS } = useTheme()
  return (
    // contexto de navegação
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.SECONDARY,
        tabBarInactiveTintColor: COLORS.TEXT,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0
        }
      }}
    >
      <Screen 
        name='Listagem'
        component={Dashboard}
        options={{
          tabBarIcon: (({size, color}) => 
            <MaterialIcons 
              name='format-list-bulleted'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name='Cadastrar'
        component={Register}
        options={{
          tabBarIcon: (({size, color}) => 
            <MaterialIcons 
              name='attach-money'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen 
        name='Resumo'
        component={Resume}
        options={{
          tabBarIcon: (({size, color}) => 
            <MaterialIcons
              name='pie-chart'
              size={size}
              color={color}
            />
          )
        }}
      />
    </Navigator>
  )
}