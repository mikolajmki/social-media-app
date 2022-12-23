import { React, useState, useShare } from "react";
import { Link } from "react-router-dom";
import ProfileImage from '../../img/profileImg.jpg';
import './PostShare.css';
import { useSelector, useDispatch } from "react-redux";
import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import { useRef } from "react";
import { uploadImage, uploadPost } from "../../actions/uploadAction.js";

const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData);
    const loading = useSelector((state) => state.postReducer.uploading);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const desc = useRef();

    const reset = () => {
        setImage(null);
        desc.current.value = null;
    }

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        
        if (image) {
            const data = new FormData();
            const filename = Date.now() + image.name;
            data.append("name", filename);
            data.append("file", image);
            newPost.image = filename;
            console.log(newPost);
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        dispatch(uploadPost(newPost));
        reset();
    }

    return (
        <div className="post-share">
            <Link to={`/profile/${user._id}`}>
                <img className="post-share-link-img" src={ user.profilePicture ? serverPublic + user.profilePicture : serverPublic + 'defaultProfile.png' } alt="" />
            </Link>
            <div>
                <input type="text" placeholder="What's happening?" ref={desc} required />
                <div className="post-share__options">
                    <div className="options" onClick={() => imageRef.current.click()} style={{color: 'var(--photo)'}}>
                        <UilScenery/>
                        Photo
                    </div>
                    <div className="options" style={{color: 'var(--video)'}}>
                        <UilPlayCircle/>
                        Video
                    </div>
                    <div className="options" style={{color: 'var(--location)'}}>
                        <UilLocationPoint/>
                        Location
                    </div>
                    <div className="options" style={{color: 'var(--schedule)'}}>
                        <UilSchedule/>
                        Schedule
                    </div>
                    <button onClick={handleSubmit} disabled={loading} className="button ps-button">{ loading ? "Uploading..." : "Share" }</button>
                    <div style={{display: 'none'}}>
                        <input type="file" name="myimage" ref={imageRef} onChange={onImageChange}/>
                    </div>
                </div>
                {image && (
                    <div className="preview-image">
                        <UilTimes onClick={() => setImage(null)}/>
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostShare;