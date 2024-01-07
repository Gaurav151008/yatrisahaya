import { StatusBar } from 'expo-status-bar';
import { View, TouchableOpacity ,Linking} from 'react-native'
import React, {useState, useContext} from 'react'
import {Formik} from 'formik';
import {Octicons, Ionicons} from '@expo/vector-icons';
import {Colors} from './../components/styles';
import {
    StyledContainer,
    InnerContainer,
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

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CredentialsContext } from '../components/CredentialsContext';

import axios from 'axios';

const {brand,darkLight} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import DateTimePicker from '@react-native-community/datetimepicker';

const  Signup=({navigation}) => {

    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000,0,1));
    
    const [dob, setDob] = useState();

    const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      setDob(currentDate);
    }

    const showDatePicker=()=>{
      setShow(true);
    }
    
    const handleSignup = (values)=> {
        const url = "http://192.168.29.42:5000/signup";
        axios.post(url, values).then((response)=> {
            const result = response.data;
            console.log(result);
            // if(!result){
                // }           
            // navigation.navigate("Login");
            persistLogin(data[0],message,status);

        }).catch(error => {
            console.log(error);
        })
    }

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
            <PageTitle>YATRI SAHAYA</PageTitle>
            <SubTitle>Account SignUp</SubTitle>
            {show &&(
              <DateTimePicker testID="dateTimePicker"
              value={date}
              mode='date'
              is24Hour={true}
              display="default"
              onChange={onChange}
              
              />
            ) }
            <Formik
                initialValues={{fullName:'', email:'', password:'', confirmPassword:''}}
                onSubmit={(values)=> {
                    console.log(values);
                    handleSignup(values);
                }}
                >
                {({handleChange, handleBlur, handleSubmit, values}) => (<StyledFormArea>
                    <MyTextInput
                        label="Full Name"
                        icon="person"
                        placeholder="John Parker"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('fullName')}
                        onBlur={handleBlur('fullName')}
                        value={values.fullName}
                        
                    />
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
                    
                    {/* <MyTextInput
                        label="Date of Birth"
                        icon="calendar"
                        placeholder="YYYY - MM - DD"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('dateOfBirth')}
                        onBlur={handleBlur('dateOfBirth')}
                        
                        value={dob ? dob.toDateString() : '' }
                        isDate={true}
                        editable={false}
                        showDatePicker={showDatePicker}
                    /> */}
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
                    <MyTextInput
                        label="Confirm Password"
                        icon="lock"
                        placeholder="* * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword={setHidePassword}
                    />
                    <MsgBox>
                        ...
                    </MsgBox>
                    <StyledButton onPress={handleSubmit}>
                        <ButtonText>
                            SignUp
                        </ButtonText>
                    </StyledButton>
                    <Line/>
                    
                    <ExtraView>
                        <ExtraText>Already have an Account? </ExtraText>
                        <TextLink onPress={()=> navigation.navigate("Login")}>
                            <TextLinkContent>Login</TextLinkContent>
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

const MyTextInput = ({label, icon,isPassword,hidePassword, setHidePassword, isDate, showDatePicker, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />

            </LeftIcon>

            <StyledInputLabel>{label}</StyledInputLabel>
            {!isDate && <StyledTextInput {...props} /> }
            {isDate && (
            <TouchableOpacity onPress={showDatePicker}>
              <StyledTextInput {...props} />

            </TouchableOpacity> 
            )}
            {isPassword && (
                <RightIcon onPress={()=> setHidePassword(!hidePassword)} >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );

};
export default Signup;