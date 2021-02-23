import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../../contexts/User/UserContext';
import Button from '../UI/Button/Button';
import formDataFetch from '../../fetches/formDataFetch';
import { create_UUID } from './helpers';
import postFetch from '../../fetches/postFetch';

import './ProfileEdit.css';

const UPLOAD_PICTURE = `http://localhost:4000/users/upload-image`;
const GET_PICTURE = `http://localhost:4000/users/get-picture`

const ProfileEdit = () => {
  const userData = useContext(UserContext);

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    console.log('IN USEEFECT');
    postFetch(GET_PICTURE, { userId: userData.user.id }, userData.token)
      .then(data => {
        console.log(data);
        setImageSrc(data.path)
      });
  }, [userData.token, userData.user.id]);

  const showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        console.log(x.target);
        setImageFile(file);
        setImageSrc(x.target.result);
        setEnableSubmit(true);
      }
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImageSrc(null);
    }
  }

  const submitImage = () => {
    if (!enableSubmit) {
      toast.warning("Can't submit your current profile picture!");
      return;
    }
    const formData = new FormData();
    const uid = create_UUID();

    formData.append('fileName', `${uid}.png`);
    formData.append('formFile', imageFile);
    formData.append('userId', userData.user.id);

    formDataFetch(UPLOAD_PICTURE, formData, userData.token);

    setEnableSubmit(false);
  }

  return (
    <div className="ProfileEditWrapper">
    {console.log(imageSrc)}
      <img
        src={imageSrc}
        alt="profilePhoto"
        className="ProfileImage" />

      <input
        type="file"
        className="ProfileImageChoose"
        accept=".png"
        onChange={showPreview} />
      <Button
        clickHandler={submitImage}
        width={100}
        color="green"
        textColor="white"
        margin="50px"
        content="SUBMIT"
      />
    </div>
  );
}

export default ProfileEdit;