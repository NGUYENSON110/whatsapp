import React from 'react';
import { Button } from '@mui/material';
import styled from "styled-components";
import WhatsAppLogo from "../assets/whatapp.png";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth'
import { auth } from "../config/firebase"


const StyledContainer = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: whitesmoke;

`
const StyledLoginContainer = styled.div`
    display:flex;
    flex-direction: column;
    padding: 100px;
    align-items:center;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0/0.1);
`

const StyledImageWrapper = styled.div`
    margin-bottom: 50px;
`




const Login = () => {

    const [signInWithGoogle, _user, _loading, _error] = useSignInWithGoogle(auth);

    const SignIn = () =>{
        signInWithGoogle()
    }
    return (
        <div>
            <StyledContainer>
                <StyledLoginContainer>
                    <StyledImageWrapper>
                        <img src={WhatsAppLogo} alt="Whatsapp" height="200px" width="200px" style={{ borderRadius: '10px' }} />
                    </StyledImageWrapper>

                    <Button variant='outlined' onClick={SignIn}>
                        Sign in with Google
                    </Button>
                </StyledLoginContainer>
            </StyledContainer>
        </div>
    )
}

export default Login;