import React from "react";
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import FollowersCard from '../../components/FollowersCard/FollowersCard';

const profileSide = () => {
    return (
        <div className="profile-side">
            <LogoSearch/>
            <ProfileCard location="homepage"/>
            <FollowersCard/>
        </div>
    )
}

export default profileSide;