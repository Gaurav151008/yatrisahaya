import react, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
    InnerContainer,
    PageTitle,
    StyledFormArea,
    SubTitle,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer,
    Avatar,
    WelcomeImage
} from "./../components/styles";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from '../components/CredentialsContext';

const Welcome = ()=>{

    const {storedCredentials,setStoredCredentials} = useContext(CredentialsContext);

    const clearLogin = ()=>{
        AsyncStorage
        .removeItem('yatriSahayCredentials')
        .then(()=>{
            setStoredCredentials("");
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return(
        <>
            <StatusBar  style="dark"/>
            <InnerContainer>
                <WelcomeImage resizeMode="cover" source={require('./../assets/3.jpg')} />
                <WelcomeContainer>
                    <PageTitle>Welcome To Yatri Sahaya</PageTitle>
                    <PageTitle welcome={true}>Welcome Buddy!!!</PageTitle>
            <SubTitle welcome={true}>John Parker</SubTitle>
            <SubTitle welcome={true}>example@gmail.com</SubTitle>
                    <StyledFormArea>
                        <Avatar resizeMode="cover" source={require('./../assets/1.jpg')} />

                        <StyledButton onPress={() => navigation.navigate('Login')}>
                            <ButtonText>
                                Yatri
                            </ButtonText>
                        </StyledButton>
                        <Line />
                        <StyledButton>
                            <ButtonText>
                                Sahayak
                            </ButtonText>
                        </StyledButton>
                        <StyledButton onPress={clearLogin}>
                            <ButtonText>
                                Logout
                            </ButtonText>
                        </StyledButton>
                        <Line />

                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    )
}

export default Welcome;