import express from 'express'
import { addBlog, addComment, deleteBlogbyId, generateContent, getAllBlogs, getBlogbyId, getBlogComments, togglePublish } from '../controllers/Blogcontroller.js';
import uploads from '../middleware/Multer.js';
import auth from '../middleware/Auth.js';

const BlogRouter = express.Router();


BlogRouter.post("/add",uploads.single('image'),auth,addBlog)
BlogRouter.get("/all",getAllBlogs)
BlogRouter.get("/:blogId",getBlogbyId)
BlogRouter.post("/delete",auth,deleteBlogbyId)
BlogRouter.post("/toggle-publish",auth,togglePublish)
BlogRouter.post("/add-comment",addComment)
BlogRouter.post("/comments",getBlogComments)
BlogRouter.post('/generate',auth,generateContent)



export default BlogRouter;