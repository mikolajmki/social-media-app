import React from "react";
import '../ProfileSide/ProfileSide.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from '../InfoCard/InfoCard';

const ProfileLeft = () => {
    return (
        <div className="profile-side">
            <LogoSearch/>
            <InfoCard/>
            <FollowersCard/>
        </div>
    )
}

export default ProfileLeft;