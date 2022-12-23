import React from "react";
import Cover from '../../img/cover.jpg';
import Profile from '../../img/profileImg.jpg';
import './ProfileCard.css';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const ProfileCard = (props) => {

    const ProfilePage = false;
    const { user } = useSelector((state) => state.authReducer.authData);
    const { posts } = useSelector((state) => state.postReducer);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="profile-card">
            <div className="profile-images">
                <img src={ user.coverPicture ? serverPublic + user.coverPicture : serverPublic + 'defaultCover.jpg' } alt="" />
                <img src={ user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png' } alt="" /> 
            </div>
            <div className="profile-name">
                <span>{ user.firstname } { user.lastname }</span>
                <span>{ user.worksAt ? user.worksAt : "Write about yourself!" }</span>
            </div>
            <div className="follow-status">
                <hr/>
                <div>
                    <div className="follow">
                        <span>{ user.following.length }</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow"
                        onClick={props.location != 'homepage' ? props.followers.bind(this, (state) => !state) : ''}
                        style={props.location != 'homepage' ? { cursor: 'pointer' } : {} }
                    >
                        <span>{ user.followers.length }</span>
                        <span>Followers</span>
                    </div>
                    {props.location === 'profilePage' && (
                        <>
                        <div className="vl">
                            
                        </div>
                        <div className="follow">
                            <span>{ posts.filter((post) => {
                                return post.userId === user._id;
                            }).length }</span>
                            <span>Posts</span>
                        </div>
                        </>
                    )}
                </div>
                <hr/>
            </div>
            {props.location === 'homepage' ? (
                <span>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>My profile</Link>
                </span>
            ) : (
                <span></span>
            )}
        </div>
    )
}

export default ProfileCard;