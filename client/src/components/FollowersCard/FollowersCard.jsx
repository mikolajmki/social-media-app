import React from "react";
import './FollowersCard.css';
import { Followers } from '../../Data/FollowersData';
import RecommendedUser from "../RecommendedUser/RecommendedUser";
import { getAllUsers } from '../../actions/userAction.js'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const FollowersCard = () => {
    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);
    const { allUsers } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUsers());
        setPersons(allUsers);
        console.log(allUsers);
    }, []);

    return (
        <div className="followers-card">
            <h3>People you may know</h3>
            {allUsers.map((person) => {
                if (!person.followers.includes(user._id) && person._id != user._id) {
                    return (
                        <RecommendedUser key={person._id} id={person._id} person={person}></RecommendedUser>
                    )
                }
            })}
        </div>
    )
}

export default FollowersCard;