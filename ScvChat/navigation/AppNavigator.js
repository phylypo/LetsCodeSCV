import { createSwitchNavigator, createStackNavigator, createAppCointainer } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';


// exporting the main navigation stack, as a siwtch navigator which is the prefered navigation for login
// Read more at https://reactnavigation.org/docs/en/auth-flow.html
export default createStackNavigator({
  Login: Login ,
  CreateAccount: CreateAccount,
  Home: MainTabNavigator,
});
