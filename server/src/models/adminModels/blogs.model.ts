import mongoose, { Document, Model } from 'mongoose';

export interface BlogAttributes {
    blog_image: {
        secureUrl: string;
        publicId: string;
    };
    title: string;
    blog: string;
}

export interface BlogModel extends Model<BlogDocument> {
    build(attributes: BlogAttributes): BlogDocument;
}

export interface BlogDocument extends Document, BlogAttributes {}

const blogSchema = new mongoose.Schema(
    {
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
    },
    {
        timestamps: true
    }
);

blogSchema.statics.build = (attributes: BlogAttributes) => {
    return new Blog(attributes);
};

const Blog = mongoose.model<BlogDocument, BlogModel>('Blog', blogSchema);

export default Blog;
