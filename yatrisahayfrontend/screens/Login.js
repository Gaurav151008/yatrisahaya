import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native'
import React, {useState, useContext} from 'react'
import {Formik} from 'formik';
import {Octicons, Ionicons,Fontisto} from '@expo/vector-icons';
import {Colors} from './../components/styles';
import {
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    StyledFormArea,
    SubTitle,
    LeftIcon, 
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent
   
} from "./../components/styles"

import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext';

const {brand,darkLight,primary,green} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

const  Login=({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const [isSubmitting, setSubmitting] = useState();

    const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);
    const handleLogin = (credentials,setSubmitting) => {
         handleMessage(null);
         const url = "http://192.168.29.42:5000/signin";
         axios.post(url, credentials).then((response)=>{
              const result = response.data;

              const {message, status, data} = result;

              if(status !== 'SUCCESS'){
                  handleMessage(message,status);
              }
              else{
                }
            // navigation.navigate('Welcome',{...data[0]});
            persistLogin({...data[0]},message,status);
              setSubmitting(false);

          }).catch(error=>{
              console.log(error);
              setSubmitting(false);
              handleMessage("An error occured. Check your network and try again");
          })
    }

    // const handleGoogleSigin = ()=>{
    //     const config = {
    //         webClientId : `1019512589996-se1ub2jmh58aj83f9dv951h4mi2mol1g.apps.googleusercontent.com`,
    //         iosClientId : `1019512589996-gajb460kukk1e6o6g23ho8cn2et0qnu6.apps.googleusercontent.com`,

    //     }
    // }

    const persistLogin = (credentials,message, status)=>{
        AsyncStorage.setItem('yatriSahayCredentials', JSON.stringify(credentials)).then(()=>{
            handleMessage(message,status);
            setStoredCredentials(credentials);
        }).catch(error=>{
            console.log(error);
            handleMessage('Persisting login failed');
        })
    } 
     const handleMessage = (message, type = 'FAILED')=>{
         setMessage(message);
         setMessageType(type);
     }
  return (
    <KeyboardAvoidingWrapper>
    <StyledContainer>
        <StatusBar style="dark"/>
        <InnerContainer>
            <PageLogo resizeMode="cover" source={require('./../assets/1.jpg')}/>
            <PageTitle>YATRI SAHAYA</PageTitle>
            <SubTitle>Account Login</SubTitle>
            <Formik
                initialValues={{email:'', password:''}}
                    onSubmit={(values,{setSubmitting})=> {
                        console.log(values);    
                        if(values.email == '' || values.password == ''){
                            handleMessage("please fill all the fields");
                            setSubmitting(false);
                        }
                        else{
                            handleLogin(values,setSubmitting);
                        }
                    }}
                >
                {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput
                        label="Email Address"
                        icon="mail"
                        placeholder="example@gmail.com"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    <MyTextInput
                        label="Password"
                        icon="lock"
                        placeholder="* * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox type={messageType}>
                        {message}
                    </MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            Login
                        </ButtonText>
                    </StyledButton>
                    {isSubmitting && (
                    
                    <StyledButton disabled={true}>
                        <ActivityIndicator size="large" color={primary}/>
                    </StyledButton>)}
                    <Line/>
                    <StyledButton google={true} onPress={handleSubmit}>
                        <Fontisto name="google" color={primary} size={25} />
                        <ButtonText google={true}>
                            Sign In with Google
                        </ButtonText>
                    </StyledButton>
                    <ExtraView>
                        <ExtraText>Don't have an account already? </ExtraText>
                        <TextLink onPress={()=> navigation.navigate("Signup")}>
                            <TextLinkContent>SignUp</TextLinkContent>
                        </TextLink>
                    </ExtraView>
                </StyledFormArea>
                )} 
            </Formik>
        </InnerContainer>
    </StyledContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({label, icon,isPassword,hidePassword, setHidePassword,isSubmitting, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />

            </LeftIcon>

            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)} >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );

};

export default Login;