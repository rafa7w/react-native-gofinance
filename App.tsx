import { StatusBar } from 'react-native';
import { ThemeProvider } from "styled-components/native";
import theme from "@theme/index";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import { Dashboard } from "@screens/Dashboard";

export default function App() {
  // useFonts retorna um vetor, cuja primeira posição é um booleano
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <></>
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      <Dashboard /> 
    </ThemeProvider>
  );
}

 