import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import {Colors} from './../components/styles';
// import Selectuser from './../screens/Selectuser';
// import RiderLogin from './../screens/RiderLogin';
// import RiderSignup from './../screens/RiderSignup';
import { CredentialsContext } from '../components/CredentialsContext';
const {primary, teritary} = Colors;

const Stack = createNativeStackNavigator();

const RootStack=()=>{

    return(
        <CredentialsContext.Consumer>
            {({ storedCredentials })=>{
                return (
                <NavigationContainer>
                    <Stack.Navigator
                    screenOptions={{
                        headerStyled:{
                            backgroundColor:'transparent'
                        },
                        headerTintColor:teritary,
                        headerTransparent:true,
                        headerTitle:'',
                        headerLeftContainerStyle: {
                            paddingLeft:20
                        }
                    }}
                    initialRouteName="Login">
                    {storedCredentials ? (
                    <Stack.Screen  name="Welcome" component={Welcome}/>
                       ) : (<>
                            <Stack.Screen name="Login" component={Login}/>
                            <Stack.Screen name="Signup" component={Signup}/>
                        </>)
                    }
                        {/* <Stack.Screen name='Selectuser' component={Selectuser} /> */}
                        {/* <Stack.Screen name="Login" component={Login}/>
                        <Stack.Screen name="Signup" component={Signup}/> */}
                        {/* <Stack.Screen name="RiderLogin" component={RiderLogin}/>
                        <Stack.Screen name="RiderSignup" component={RiderSignup}/> */}
                        {/* options={{headerTintColor:primary}} */}
                        {/* <Stack.Screen  name="Welcome" component={Welcome}/> */}
                    </Stack.Navigator>
                </NavigationContainer>
                );
            }}
        </CredentialsContext.Consumer>
    )
}

export default RootStack;