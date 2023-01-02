import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction.js";

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

const RecommendedUser = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        setFollowed(props.profilePage);
    }, []);

    const handleFollow = () => {
        followed ? dispatch(unfollowUser(user._id, props.person)) : dispatch(followUser(user._id, props.person));
        
        setFollowed((prevState) => !prevState);
    }

    return (
        <div key={ props.id } className="follower">
        <div>
            <img src={props.person.profilePicture ? serverPublic + props.person.profilePicture : serverPublic + 'defaultProfile.png'} alt="" className="follower-img"/>
            <div className="name">
                <span>{props.person.firstname}</span>
                <span> {props.person.username}</span>
            </div>
        </div>
        <button className="button fc-button" onClick={handleFollow}>{followed ? 'Unfollow' : "Follow"}</button>
    </div>
    )
};

export default RecommendedUser;