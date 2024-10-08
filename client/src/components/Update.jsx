import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { makeRequest } from '../utils/axios'; // adjust the path to match the location of axios.js

const Update = ({ setOpenUpdate, user }) => {
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [inputs, setInputs] = useState({
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedUser) => makeRequest.put('/users', updatedUser),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(['user', user.id]);
        setOpenUpdate(false);
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
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let coverUrl = user.coverPic;
      let profileUrl = user.profilePic;

      coverUrl = coverPic && (await uploadToCloudinary(coverPic));
      profileUrl = profilePic && (await uploadToCloudinary(profilePic));
      mutation.mutate({ ...inputs, coverPic: coverUrl, profilePic: profileUrl });
      setOpenUpdate(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={true} onClose={() => setOpenUpdate(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form>
            <FormControl>
              <FormLabel>Cover Photo</FormLabel>
              <Input type="file" onChange={(e) => setCoverPic(e.target.files[0])} />
            </FormControl>
            <FormControl>
              <FormLabel>Profile Photo</FormLabel>
              <Input type="file" onChange={(e) => setProfilePic(e.target.files[0])} />
            </FormControl>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={inputs.name} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input type="text" name="city" value={inputs.city} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input type="text" name="website" value={inputs.website} onChange={handleChange} />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" backgroundColor="#0095f6" mr={3} onClick={handleSubmit} isLoading={mutation.isLoading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Update;