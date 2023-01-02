import React from "react";
import './Post.css';
import Comment from '../../img/comment.png'
import Like from '../../img/like.png';
import Share from '../../img/share.png';
import NotLike from '../../img/notlike.png'
import { useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from '../../api/postRequest.js';
import { useEffect } from "react";

const Post = props => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const [liked, setLiked] = useState(props.data.likes.includes(user._id));
    const [likes, setLikes] = useState((props.data.likes.length));

    const likeHandler = () => {
        setLiked((prev) => !prev);
        likePost(props.data._id, user._id);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    }

    return (
        <div className="post">
           <img src={props.data.image ? process.env.REACT_APP_PUBLIC_FOLDER + props.data.image : "" } alt="" />
           <div className="post__reactions">
                <img src={liked ? Like : NotLike} className='post__like' alt="" onClick={likeHandler} />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
           </div>
           <span style={{color: 'var(--gray)', fontSize: '12px'}}>{likes} Likes</span>
           <div className="detail">
                <span><b>{props.data.name} </b></span> 
                <span>{props.data.desc}</span>
           </div>
        </div>
    )
}

export default Post;