import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import React, { useState, useContext } from "react";
import { AuthContext } from '../../context/authContext';
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from '../../axios';

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () => makeRequest.get('/likes?postId=' + post.id).then((res) => {
      return res.data;
    })
  });
  // console.log(`post likes: %o`, data);

  const queryClient = useQueryClient();
  const mutation = useMutation((liked) => {
    if (liked) return makeRequest.delete('/likes?postId=' + post.id);
    return makeRequest.post('/likes', { postId: post.id });
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('likes');
      },
    }
  );
  const deleteMutation = useMutation((postId) => {
    return makeRequest.delete(`/posts/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts','user']);
        queryClient.refetchQueries();
      },
    }
  );



  const handleLike = async () => {
    mutation.mutate(data?.includes(currentUser?.id));
  };

  const handleDelete = async () => {
    deleteMutation.mutate(post.id);
  }

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.userProfilePic} alt="" />
            <div className="details">
              <Link
                to={{ pathname: `/profile/${post.userId}` }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userName}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {(menuOpen && post.userId === currentUser?.id) && <button onClick={handleDelete}>Delete</button>}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item" onClick={handleLike} >
            {isLoading ? "loading" : data?.includes(currentUser?.id) ? <FavoriteOutlinedIcon style={{ color: 'red' }} /> : <FavoriteBorderOutlinedIcon />}
            {data?.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
