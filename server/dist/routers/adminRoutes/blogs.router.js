import { Router } from 'express';
import blogsController from '../../controllers/adminController/blogs.controller.js';
import { protectMiddleware } from '../../middleware/protect.middleware.js';
import authAdmin from '../../middleware/auth_admin.middleware.js';
import { upload } from '../../middleware/upload_file.middleware.js';
const blogRouter = Router();
blogRouter
    .post('/create-blog', protectMiddleware, authAdmin, upload.single('blog_image'), blogsController.createBlog)
    .get('/blogs', protectMiddleware, blogsController.fetchBlogs)
    .get('/latest-blogs', protectMiddleware, blogsController.fetchLatestBlogs)
    .get('/blogs/:id', protectMiddleware, blogsController.fetchBlogById)
    .put('/update-blog/:id', protectMiddleware, authAdmin, blogsController.updateBlog)
    .delete('/delete-blogs', protectMiddleware, authAdmin, blogsController.deleteBlogById);
export default blogRouter;
//# sourceMappingURL=blogs.router.js.map