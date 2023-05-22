import { useContext, useState } from 'react';
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from '../../axios';
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const Comments = ({ postId }) => {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState('');

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () => makeRequest.get('/comments?postId=' + postId).then((res) => {
      return res.data;
    })
  });
  console.log(`comments: %o`, data);
  const queryClient = useQueryClient();

  const mutation = useMutation((newComment) => {
    return makeRequest.post('/comments', newComment)
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments');
      },
    }
  );

  const handleClick = (e) => {
    try {
      const res = mutation.mutate({ desc, postId });
      console.log(res);
      setDesc('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading
        ? "Loading"
        : data?.map((comment) => (
          <div className="comment" key={comment.id}>
            <img src={comment.userProfilePic} alt="" />
            <div className="info">
              <span>{comment.userName}</span>
              <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
          </div>
        ))}
    </div>
  );
};

export default Comments;