// Import the screens
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import Chat from './components/Chat';
// Import React Navigation
import { createStackNavigator } from 'react-navigation'

// Create the navigator
const navigator = createStackNavigator({
  Login: { screen: Login },
  CreateAccount: { screen: CreateAccount },
  Chat: { screen: Chat },
});

// Export it as the root component
export default navigator
