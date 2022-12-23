import mongoose from 'mongoose';
import Post from '../Models/Post.js';
import User from '../Models/User.js';

export const createPost = async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        desc: req.body.desc,
        image: req.body.image
    });
    try {
        await post.save();
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        return post ? res.status(200).json(post) : res.status(500).json({ message: "Not found." });
    }
    catch (err) {
        console.log(err);   
        return res.status(500).json({ message: err });
    }

};

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findByIdAndUpdate(postId);
        // console.log(post.userId.toString(), userId);
        if (post.userId.toString() === userId) {
            await post.updateOne({ $set: req.body })
            return res.status(200).json({ message: "Post updated!" });
        }
        return res.status(403).json({ message: "Action forbidden. "});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err });
    }
};

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findById(postId);
        if (userId === post.userId.toString()) {
            await post.deleteOne();
            return res.status(200).json({ message: "Post deleted." });
        }   
        return res.status(403).json({ message: "Action forbidden." })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

export const likePost = async (req, res) => {
    const id = req.params.id;
    const userId = req.body.userId;
    try {
        const post = await Post.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            return res.status(200).json({ message: "Liked a post." });
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            return res.status(200).json({ message: "Unliked a post." });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;
    try {
        const currentUserPosts = await Post.find({ userId: userId });
        const followingPosts = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        return res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort(
            (a, b) => {
                return b.createdAt - a.createdAt;
            }
        ));
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }
};