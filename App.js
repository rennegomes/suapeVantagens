import { StatusBar } from 'expo-status-bar';
import { Home } from './screens';
import { Routes } from './routes';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
      <StatusBar backgroundColor='#6495ED' barStyle="dark-content" />
      <Routes />
    </NavigationContainer>
    </>
  );
}


