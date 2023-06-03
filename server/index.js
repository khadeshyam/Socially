import Express from 'express';
const app = Express();
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import relationshipRoutes from './routes/relationships.js';
import likeRoutes from './routes/likes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {initDb} from './connect.js'

//middlewares
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(Express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/relationships',relationshipRoutes);

app.listen(5000,()=>{
    console.log(`server is listening on port 5000`);
    initDb();
})
