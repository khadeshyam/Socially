import  Express  from "express";
import { getPosts,addPost,deletePost,getPost } from "../controllers/post.js";

const router = Express.Router();

router.get('/',getPosts);
router.get('/:postId',getPost);
router.post('/',addPost);
router.delete('/:postId',deletePost);

export default router;