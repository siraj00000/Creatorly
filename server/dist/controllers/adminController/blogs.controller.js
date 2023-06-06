import { ErrorResponse } from '../../utils/error_response.utils.js';
import { validateMimeType } from '../../utils/validate_mimetype.utils.js';
import { removeTmp } from '../../utils/remove_folde.utils.js';
import Blog from '../../models/adminModels/blogs.model.js';
import cloudinary from 'cloudinary';
class BlogController {
    async createBlog(req, res, next) {
        try {
            if (!req.file) {
                throw new ErrorResponse(400, 'Blog image is required');
            }
            let isValidFile = validateMimeType(req.file?.mimetype);
            if (!isValidFile)
                throw new ErrorResponse(400, 'Invalid image type');
            const result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'blogs' });
            // remove temp file
            removeTmp(req.file.path);
            const blog = await Blog.create({
                blog_image: {
                    secureUrl: result.secure_url,
                    publicId: result.public_id
                },
                title: req.body.title,
                blog: req.body.blog
            });
            res.status(201).json({
                success: true,
                message: 'Blog created successfully.',
                data: blog
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchLatestBlogs(req, res, next) {
        try {
            const latestBlogs = await Blog.find()
                .sort({ createdAt: -1 }) // Sort by descending createdAt timestamp
                .limit(5); // Limit the result to 5 blogs
            res.status(200).json({
                success: true,
                message: 'Latest blogs fetched successfully',
                data: latestBlogs
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchBlogs(req, res, next) {
        try {
            const blogs = await Blog.find();
            res.status(200).json({
                success: true,
                message: 'Latest blogs fetched successfully',
                data: blogs
            });
        }
        catch (error) {
            next(error);
        }
    }
    async fetchBlogById(req, res, next) {
        try {
            const blogId = req.params.id; // Assuming the blog ID is passed as a route parameter
            const blog = await Blog.findById(blogId); // Fetch the blog by its _id
            if (!blog) {
                throw new ErrorResponse(404, 'Blog not found');
            }
            res.status(200).json({
                success: true,
                message: 'Blog fetched successfully',
                data: blog
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next) {
        try {
            const blogId = req.params.id;
            // Find the blog by ID
            const blog = await Blog.findById(blogId);
            if (!blog) {
                throw new ErrorResponse(404, 'Blog not found');
            }
            let imageUrl = blog.blog_image;
            // If a new image file is provided, upload it to Cloudinary and update the image URL
            if (req.file) {
                let isValidFile = validateMimeType(req.file?.mimetype);
                if (!isValidFile)
                    throw new ErrorResponse(400, 'Invalid image type');
                const result = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'blogs' });
                // Remove the previous image from Cloudinary
                if (imageUrl) {
                    await cloudinary.v2.uploader.destroy(imageUrl.publicId);
                }
                imageUrl = {
                    secureUrl: result.secure_url,
                    publicId: result.public_id
                };
                // Remove the temporary file
                removeTmp(req.file.path);
            }
            // Update the blog with the new image URL and other fields
            blog.blog_image = imageUrl;
            blog.title = req.body.title;
            blog.blog = req.body.blog;
            const updatedBlog = await blog.save();
            res.status(200).json({
                success: true,
                message: 'Blog updated successfully',
                data: updatedBlog
            });
        }
        catch (error) {
            next(error);
        }
    }
    async deleteBlogById(req, res, next) {
        try {
            const blogId = req.params.id;
            // Find the blog by ID and delete it
            const deletedBlog = await Blog.findByIdAndDelete(blogId);
            if (!deletedBlog) {
                throw new ErrorResponse(404, 'Blog not found');
            }
            res.status(200).json({
                success: true,
                message: 'Blog deleted successfully',
                data: deletedBlog
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new BlogController();
//# sourceMappingURL=blogs.controller.js.map