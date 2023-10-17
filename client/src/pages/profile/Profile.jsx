import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from '../../context/authContext';
import  Update  from '../../components/update/Update';

const Profile = () => {
  //console.log("profile rendered");
  const [openUpdate, setOpenUpdate] = useState(false);
  const location = useLocation();
  const userId = parseInt(location.pathname.split("/")[2]);
  const { currentUser } = useContext(AuthContext);


  const { data } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => makeRequest.get(`/users/find/${userId}`).then((res) => {
      return res.data;
    })
  });

  const { data: relationshipData } = useQuery({
    queryKey: ['relationships', userId],
    queryFn: () => makeRequest.get(`/relationships?followedUserId=${userId}`).then((res) => {
      return res.data;
    })
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((following) => {
    if (following) return makeRequest.delete(`/relationships?followedUserId=${userId}`);
    return makeRequest.post('/relationships', { followedUserId: userId });
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['relationships']);
      },
    }
  );



  const handleFollow = async () => {
    mutation.mutate(relationshipData?.includes(currentUser?.id));
  };


  return (
    <div>
      <div className="profile">
        <div className="images">
          <img
            src={data?.coverPic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
            alt=""
            className="cover"
          />
          <img
            src={data?.profilePic || "https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"}
            alt=""
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="http://facebook.com">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="http://facebook.com">
                <LinkedInIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{data?.username}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data?.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon />
                  <span>{data?.website}</span>
                </div>
              </div>
              {userId === currentUser.id ?
                (<button onClick={()=>setOpenUpdate(true)}>update</button>) : (
                  <button onClick={handleFollow}>{relationshipData?.includes(currentUser.id) ? "following" : "follow"}</button>)}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Posts userId={userId} />
        </div>
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
    </div>
  );
};

export default Profile;