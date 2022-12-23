import React from "react";
import ProfileLeft from "../../../components/ProfileLeft/ProfileLeft";
import ProfileCard from '../../../components/ProfileCard/ProfileCard';
import Posts from '../../../components/Posts/Posts';
import RightSide from '../../../components/RightSide/RightSide';
import Followers from "../../../components/Followers/Followers";
import './Profile.css';
import { useState } from "react";
import { useSelector } from "react-redux";


const Profile = () => {
    const [followers, setFollowers] = useState(false);
    const { allUsers } = useSelector((state) => state.authReducer);
    return (
        <div className="profile">
            <ProfileLeft/>
            <div className="profile-center">
                <ProfileCard followers={setFollowers} location="profilePage"/>
                { followers ? <Followers followers={followers}/> : <Posts/> }
            </div>
            <RightSide/>
        </div>
    )
}

export default Profile;