import React from 'react';
import {Button} from '@material-ui/core';
import { auth,provider } from "./firebase.js";
import './Login.css';
const Login = ()=>{
    const signIn = (e)=>{
        auth.signInWithPopup(provider).catch(error=>alert(error.message))
    }
    return (<>
    <div className='login'>
        <div className='login__logo'>
            <img src="https://thecampusagency.com/wp-content/uploads/2022/01/Discord-logo-1.png" alt='discord' />
        </div>
        <Button onClick={signIn}>Sign In</Button>
    </div>
    </>);
};
export {Login};