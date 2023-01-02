import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Conversation = (props) => {
    const { allUsers } = useSelector((state) => state.authReducer);
    const userId = props.data.members.find((id) => id !== props.currentUserId);
    console.log(userId);
    const chatUser = allUsers.find((user) => user._id === userId);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>  
            <div className="follower conversation">
                <div>
                    { props.isOnline ?  <div className="online-dot"></div> : ''}
                    <img src={chatUser.profilePicture ? serverPublic + chatUser.profilePicture : serverPublic + "defaultProfile.png"} alt=""
                    className="followerImage"
                    style={{ width: '50px', height: '50px', borderRadius: '100%' }} />
                    <div className="name" style={{ fontSize: "0.8rem" }}>
                        <span>
                            {chatUser.firstname} {chatUser.lastname}
                        </span>
                        { props.isOnline ?  'Online' : ''}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Conversation;