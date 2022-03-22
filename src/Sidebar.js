import React, { useState,useEffect } from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import { SidebarChannel } from "./SidebarChannel.js";
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import HeadsetOutlinedIcon from '@material-ui/icons/HeadsetOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import {Avatar} from '@material-ui/core';
import './Sidebar.css';
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice.js";
import { auth,db } from "./firebase.js";
const Sidebar = () => {
    const user = useSelector(selectUser);
    const [channels,setChannels] =  useState([]);
    useEffect(()=>{
        db.collection('channels').onSnapshot(snapshot=>(
            setChannels(snapshot.docs.map(doc=>({
                id:doc.id,
                channel:doc.data(),
            })))
        ));
    },[]);
    const handleAddChannel=()=>{
        const channelName = prompt("Enter Your Channel Name :");
        if(channelName){
            db.collection('channels').add({
                channelName : channelName,
            });
        }
    };
    return (<>
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Discord-Clone</h3>
                <ExpandMoreIcon />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMoreIcon />
                        <h4>Text Channels</h4>
                    </div>
                    <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
                </div>
                <div className="sidebar__channelsList">
                    {channels.map(({id,channel})=>(
                        <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAltIcon className="sidebar__voiceIcon" fontSize="large"/>
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlinedIcon />
                    <CallOutlinedIcon />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={()=>auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0,8)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <MicNoneOutlinedIcon />
                    <HeadsetOutlinedIcon />
                    <SettingsOutlinedIcon />
                </div>
            </div>
        </div>
    </>);
};
export { Sidebar };