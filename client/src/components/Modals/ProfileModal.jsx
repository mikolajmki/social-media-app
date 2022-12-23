import { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import '../../pages/Auth/Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/uploadAction.js'
import { updateUser } from '../../actions/userAction.js';

const ProfileModal = props => {
  const { password, ...other } = props.data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === 'profileImage' ? setProfileImage(img) : setCoverImage(img);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append("name", fileName);
      data.append("file", profileImage);
      userData.profilePicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);

      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append("name", fileName);
      data.append("file", coverImage);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, userData));
    props.setModalOpened(false);
  }
  
  return (
    <>
      <Modal
        opened={props.modalOpened}
        onClose={() => props.setModalOpened(false)}
        title="Introduce yourself!"
        overlayOpacity={0.6}
        overlayBlur={3}
        size='60%'
      >
      <form className='info__form' action="">
        <div>
          <input type="text" className='info__input' name='firstname' placeholder='First name' value={formData.firstname} onChange={handleChange}/>
          <input type="text" className='info__input' name='lastname' placeholder='Last name' value={formData.lastname} onChange={handleChange}/>
        </div>
        <div>
          <input type="text" className='info__input' name='worksAt' placeholder='Works at' value={formData.worksAt} onChange={handleChange}/>
        </div>
        <div>
          <input type="text" className='info__input' name='livesIn' placeholder='Lives in' value={formData.livesIn} onChange={handleChange}/>
          <input type="text" className='info__input' name='country' placeholder='Country' value={formData.country} onChange={handleChange}/>
        </div>
        <div>
          <input type="text" className='info__input' name='relationship' placeholder='Relationship status' value={formData.relationship} onChange={handleChange}/>
        </div>
        <div>
          Profile image
          <input type="file" name='profileImage' onChange={onImageChange}/>
          Cover image
          <input type="file" name='coverImage' onChange={onImageChange}/>
        </div>
        <button type='submit' className='button info__button' onClick={handleSubmit}>Update</button>
      </form>
      </Modal>
    </>
  );
}

export default ProfileModal;