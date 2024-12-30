import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminPage from '../components/AdminPage';
import UserPage from '../components/UserPage';
import Booking_Table from '../components/Booking_Table';
import Home_Delivery from '../components/Home_Delivery';
import ConfirmationMessage from '../components/ConfirmationMessage';
import MenuListPage from '../components/MenuListPage';
import AddMenuPage from '../components/AddMenuPage';
import AddTablePage from '../components/AddTablePage';
import PancakePage from '../components/PancakePage';
import menuItems from '../components/menuItems';
import TPPage from '../components/TPPage';
import OrderListPage from '../components/OrderListPage';
import OrderDetailPage from '../components/OrderDetailPage';
import UpdateMenuPage from '../components/UpdateMenuPage';







const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="AdminPage" component={AdminPage} />
                <Stack.Screen name="UserPage" component={UserPage} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="RecipeDetailScreen" component={RecipeDetailScreen} /> 
                <Stack.Screen name='Booking_Table' component={Booking_Table} />
                <Stack.Screen name='Home_Delivery' component={Home_Delivery} />
                <Stack.Screen name='ConfirmationMessage' component={ConfirmationMessage} />
                <Stack.Screen name='MenuListPage' component={MenuListPage} />
                <Stack.Screen name='AddMenuPage' component={AddMenuPage} />
                <Stack.Screen name='AddTablePage' component={AddTablePage} />
                <Stack.Screen name='PancakePage' component={PancakePage} />
                <Stack.Screen name='menuItems' component={menuItems} />
                <Stack.Screen name='TPPage' component={TPPage} />
                <Stack.Screen name='OrderListPage' component={OrderListPage} />
                <Stack.Screen name="OrderDetail" component={OrderDetailPage} />
                <Stack.Screen name='UpdateMenuPage' component={UpdateMenuPage} />
                   
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;
