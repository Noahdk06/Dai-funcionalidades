import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AboutScreen from './src/screens/AboutScreen';
import EmergencyConfigScreen from './src/screens/EmergencyConfigScreen';
import DateAndWeatherScreen from './src/screens/DateAndWeatherScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import EmergencyShakeScreen from './src/screens/EmergencyShakeScreen';
import HomeScreen from './src/screens/HomeScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} />
        <Stack.Screen name="EmergencyConfigScreen" component={EmergencyConfigScreen} />
        <Stack.Screen name="DateAndWeatherScreen" component={DateAndWeatherScreen} />
        <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        <Stack.Screen name="EmergencyShakeScreen" component={EmergencyShakeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
