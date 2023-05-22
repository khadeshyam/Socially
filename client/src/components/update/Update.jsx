import "./update.scss";
import { useState } from 'react';
import axios from 'axios';
import { makeRequest } from '../../axios';
import { useQueryClient, useMutation } from '@tanstack/react-query';


const Update = ({ setOpenUpdate, user }) => {
  console.log(user);
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const [inputs, setInputs] = useState({
    name: '',
    city: '',
    website: '',
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((user) => {
    return makeRequest.put('/users', user)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    }
  );

  const uploadToCloudinary = async (file) => {
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

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let coverUrl = user.coverPic;
      let profileUrl = user.profilePic;

      coverUrl = coverPic && await uploadToCloudinary(coverPic);
      profileUrl = profilePic && await uploadToCloudinary(profilePic);
      mutation.mutate({ ...inputs, coverPic: coverUrl, profilePic: profileUrl });
      setOpenUpdate(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='update'>
      <h1>Update</h1>
      <form>
        <div className='inputGroup'>
          <label>Cover Photo</label>
          <input type='file' onChange={(e) => setCoverPic(e.target.files[0])} />
        </div>
        <div className='inputGroup'>
          <label>Profile Photo</label>
          <input type='file' onChange={(e) => setProfilePic(e.target.files[0])} />
        </div>
        <div className='inputGroup'>
          <label>Name</label>
          <input type='text' name="name" onChange={handleChange} />
        </div>
        <div className='inputGroup'>
          <label>City</label>
          <input type='text' name="city" onChange={handleChange} />
        </div>
        <div className='inputGroup'>
          <label>Website</label>
          <input type='text' name="website" onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button className='updateClose' onClick={() => setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default Update;
