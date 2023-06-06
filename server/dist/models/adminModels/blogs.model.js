import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
    blog_image: {
        secureUrl: {
            type: String,
            required: [true, 'Blog image secure URL is required']
        },
        publicId: {
            type: String,
            required: [true, 'Blog image public ID is required']
        }
    },
    title: {
        type: String,
        required: [true, 'Title is required!'],
        trim: true,
        maxlength: 100
    },
    blog: {
        type: String,
        required: [true, 'Blog content is required!'],
        trim: true
    }
}, {
    timestamps: true
});
blogSchema.statics.build = (attributes) => {
    return new Blog(attributes);
};
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
//# sourceMappingURL=blogs.model.js.map