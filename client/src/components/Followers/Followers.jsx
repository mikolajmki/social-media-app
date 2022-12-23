import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../actions/userAction";
import RecommendedUser from "../RecommendedUser/RecommendedUser";
import './Followers.css';

const Followers = (props) => {

    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.authReducer);
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className="followers">
            <h1>Followers</h1>
            {allUsers.map((person) => {
                if (person.followers.includes(user._id) && person._id != user._id) {
                    return (
                        <RecommendedUser key={person._id} id={person._id} person={person} profilePage={true}></RecommendedUser>
                    )
                }
            })}
        </div>
    )
};

export default Followers;