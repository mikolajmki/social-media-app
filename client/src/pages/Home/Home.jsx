import React from "react";
import './Home.css'
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import PostSide from '../../components/PostSide/PostSide'
import RightSide from "../../components/RightSide/RightSide";

const homePage = () => {
    return (
        <div className="Home">
            <ProfileSide/>
            <PostSide/>
            <RightSide/>
        </div>
    )
}

export default homePage