import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '@screens/Dashboard';
import { Register } from '@screens/Register';

const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
  return (
    // contexto de navegação
    <Navigator>
      <Screen 
        name='Listagem'
        component={Dashboard}
      />
      <Screen 
        name='Cadastrar'
        component={Register}
      />
      <Screen 
        name='Resumo'
        component={Dashboard}
      />
    </Navigator>
  )
}