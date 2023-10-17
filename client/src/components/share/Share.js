import './share.scss';
import Image from '../../assets/img.png';
import Map from '../../assets/map.png';
import Friend from '../../assets/friend.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { makeRequest } from '../../axios';

const Share = () => {
  //console.log(`share rendered`);
  const { currentUser } = useContext(AuthContext)

  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  console.log(isLoading);

  const uploadToCloudinary = async () => {
    console.log(file);
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET_NAME);
      data.append('cloud_name', process.env.REACT_APP_CLOUD_NAME);
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, data);
      return response?.data?.url;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const mutation = useMutation((newPost) => {
    return makeRequest.post('/posts', newPost)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('posts');
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadToCloudinary();
      mutation.mutate({ desc, img: uploadedImageUrl });
      setDesc('');
      setFile(null);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <div className='share'>
      <div className='container'>
        <div className='top'>
          <div className="left">
            <img
              src={currentUser.profilePic}
              alt=''
            />
            <input type='text' placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && <img className="file" src={URL.createObjectURL(file)} alt="Upload" />}
          </div>
        </div>
        <hr />
        <div className='bottom'>
          <div className='left'>
            <input type='file' id='file' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
            <label htmlFor='file'>
              <div className='item'>
                <img src={Image} alt='' />
                <span>Add Image</span>
              </div>
            </label>
            <div className='item'>
              <img src={Map} alt='' />
              <span>Add Place</span>
            </div>
            <div className='item'>
              <img src={Friend} alt='' />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className='right'>
            <button onClick={handleClick} disabled={isLoading}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
