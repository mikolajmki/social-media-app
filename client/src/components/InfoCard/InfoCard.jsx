import React from "react";
import './InfoCard.css';
import { UilPen } from '@iconscout/react-unicons';
import { useState } from 'react';
import ProfileModal from "../Modals/ProfileModal";
import { logout } from '../../actions/authAction.js';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { Fragment } from 'react';
import * as UserApi from '../../api/userRequest.js';

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [profileUser, setProfileUser] = useState({});
    const dispatch = useDispatch();
    const params = useParams();

    const profileUserId = params.id;
    const { user } = useSelector((state) => state.authReducer.authData);

    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId === user._id) {
                setProfileUser(user);
                console.log(profileUser);
            } else {
                const profileUser = await UserApi.getUser(profileUserId);
                setProfileUser(profileUser);
                console.log(profileUser);
            }
        }
        fetchProfileUser();
    }, [user]);

    return (
        <div className="infocard">
            <div className="infocard__head">
                <h4>Profile info</h4>
                { profileUserId === user._id ? (
                        <Fragment>
                            <UilPen width='2rem' height='1.2rem' onClick={() => setModalOpened(true)}/>
                            <ProfileModal 
                                modalOpened={modalOpened} 
                                setModalOpened={setModalOpened}
                                data = {user}
                            />
                        </Fragment>
                        ) : ("")}
            </div>
            <div className="info">
                <span><b>Status </b></span>
                <span>{ profileUser.relationship }</span>
            </div>
            <div className="info">
                <span><b>Lives in </b></span>
                <span>{ profileUser.livesIn }</span>
            </div>
            <div className="info">
                <span><b>Works at </b></span>
                <span>{ profileUser.worksAt }</span>
            </div>
            <button className="button logout-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default InfoCard;