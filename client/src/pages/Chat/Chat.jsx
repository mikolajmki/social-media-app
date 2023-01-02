import React from "react";
import './Chat.css';
import { useState, useRef } from "react";
import LogoSearch from '../../components/LogoSearch/LogoSearch.jsx';
import { useDispatch, useSelector } from 'react-redux'
import Conversation from "../../components/Conversation/Conversation.jsx";
import { Link } from "react-router-dom";
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { UilSetting } from '@iconscout/react-unicons';
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import { io } from 'socket.io-client';
import { getUserChats } from "../../actions/chatAction";

const Chat = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const userChats = useSelector((state) => state.chatReducer.chats);
    
    const [chat, setCurrentChat] = useState(userChats[0]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receiveMessage, setReceiveMessage] = useState(null);
    
    const dispatch = useDispatch();
    const socket = useRef();

    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit('add-new-user', user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        });
        dispatch(getUserChats(user._id));

    }, [user]);

    useEffect(() => {
        socket.current.on('receive-message', (data) => {
            console.log("Data received: ", data);
            setReceiveMessage(data);
        })
    }, []);

    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((id) => id !== user._id);
        return onlineUsers.find((user) => user.userId === chatMember);
    }

    return (
        <div className="Chat">
            <div className="Left-side-chat">
                <LogoSearch/>
                <h2>Chats</h2>
                <div className="Chat-container">
                    <div className="Chat-list">
                        Conversations
                        { userChats.map((chat) => {
                            return (
                                <div onClick={() => setCurrentChat(chat)}>
                                    <Conversation isOnline={checkOnlineStatus(chat)} data={chat} currentUserId={user._id}/>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
            <div className="Right-side-chat">
                <div style={{ width: '20rem', alignSelf: 'flex-end' }}>
                    <div className="nav-icons">
                        <Link to="/home">
                            <img src={Home} alt="" />
                        </Link>
                        <UilSetting/>
                        <img src={Noti} alt="" />
                    </div>
                </div>
                {chat ? <ChatBox data={chat} isOnline={checkOnlineStatus(chat)} currentUserId={user._id} setSendMessage={setSendMessage} receiveMessage={receiveMessage}/> : 'Select a chat to send a message!'}
            </div>
        </div>
    )
}

export default Chat;