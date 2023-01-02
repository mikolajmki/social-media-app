import React from "react";
import './Posts.css';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTimelinePosts } from '../../actions/postAction.js';
import { useParams } from 'react-router-dom';
const Posts = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const params = useParams();
    let { posts, loading } = useSelector((state) => state.postReducer);

    useEffect(() => {
        dispatch(getTimelinePosts(user._id));
    }, []);

    
    if (!params) return "No posts yet.";
    if (params.id) posts = posts.filter((post) => post.userId === params.id);

    return (
        <div className="posts">
            {loading ? "Fetching ..." : posts.map((post, id) => {
                return <Post key={ id } data={ post } id={ id }/>
            })}
        </div>
    )
}

export default Posts;