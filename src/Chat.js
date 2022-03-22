import React, { useEffect, useState } from 'react';
import './Chat.css';
import { ChatHeader } from './ChatHeader.js';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Message } from './Message.js';
import { useSelector } from 'react-redux';
import {selectUser} from "./features/userSlice.js";
import { selectChannelId,selectChannelName} from './features/appSlice.js';
import {db} from './firebase.js';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const Chat = ()=>{
    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input,setInput] = useState("");
    const [messages,setMessages] = useState([]);
    useEffect(()=>{
        if(channelId){
            db.collection('channels').doc(channelId).collection("messages").orderBy('timestamp','dec').onSnapshot(snapshot=>(
                setMessages(snapshot.docs.map(doc=>doc.data()))
            ));
        }
    },[channelId]);
    const sendMessage = e =>{
        e.preventDefault()
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user,
        });
        setInput("");
    };
    return (<>
    <div className='chat'>
        <ChatHeader channelName={channelName}/>
        <div className='chat__messages'>
            {messages.map(message=><Message timestamp={message.timestamp} message={message.message} user={message.user} />)}
        </div>
        <div className='chat__input'>
            <AddCircleIcon fontSize='large'/>
            <form>
                <input disabled={!channelId} value={input} onChange={e=>setInput(e.target.value)} placeholder={`Message #${channelName} `}></input>
                <button onClick={sendMessage} disabled={!channelId} className='chat__inputButton' type='submit'>Send Message</button>
            </form>
            <div className='chat__inputIcons'>
                <CardGiftcardIcon />
                <GifIcon />
                <EmojiEmotionsIcon />
            </div>
        </div>
    </div>
    </>);
};
export {Chat};