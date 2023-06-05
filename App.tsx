import { ThemeProvider } from "styled-components/native";
import theme from "@theme/index";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { Dashboard } from "@screens/Dashboard";

export default function App() {
  // useFonts retorna um vetor, cuja primeira posição é um booleano
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <Dashboard /> 
    </ThemeProvider>
  );
}

 