import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from '../screens';
import { Lojas } from '../screens/lojas';
import { Perfil } from '../screens/perfil';
import { Login } from '../screens/login';
import { PerfilLojas } from '../screens/perfilLojas';

export const Routes = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown : false}} />
            <Stack.Screen name="Lojas" component={Lojas} options={{headerShown : false}} />
            <Stack.Screen name="Perfil" component={Perfil} options={{headerShown : false}} />
            <Stack.Screen name="Login" component={Login} options={{headerShown : false}} />
            <Stack.Screen name="PerfilLojas" component={PerfilLojas} options={{headerShown : false}} />
        </Stack.Navigator>
    )
};
