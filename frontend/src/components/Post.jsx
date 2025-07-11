import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import newstore from "@/redux/newstore";
import { toast } from "sonner";
import axios from "axios";
import { setPosts, setSelectedPost } from "@/redux/postSlice1";
import { Badge } from "./ui/badge";

const Post = ({ post1 }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((newstore) => newstore.auth1);
  const { posts } = useSelector((newstore) => newstore.post1);
  const [liked, setLiked] = useState(post1.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post1.likes.length);
  const [comment, setComment] = useState(post1.comments);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `https://beconnect-zqbv.onrender.com/api/v1/post/${post1._id}/${action}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        //apne post ko update karunga
        const updatedPostData = posts.map((p) =>
          p._id == post1._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id != user._id)
                  : [...p.likes, user._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axios.post(
        `https://beconnect-zqbv.onrender.com/api/v1/post/${post1._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id == post1._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(
        `https://beconnect-zqbv.onrender.com/api/v1/post/delete/${post1?._id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem?._id != post1?._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`https://beconnect-zqbv.onrender.com/api/v1/post/${post1?._id}/bookmark`, {withCredentials:true});
      if(res.data.success){
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="my-8 w-full max-w-sm mx-auto bg-zinc-400 p-3 rounded-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post1.author?.profilePicture} alt="post_image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
          <h1>{post1.author?.username}</h1>
          {user?._id == post1.author._id && <Badge variant="secondary">Author</Badge> }
          </div>
          
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            {
              post1?.author?._id != user?._id && <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            }
            
            <Button variant="ghost" className="cursor-pointer w-fit">
              Add to favorites
            </Button>
            {user && user?._id == post1?.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer w-fit"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src={post1.image}
        alt="post_image"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={"24"}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={"22px"}
              className="cursor-pointer hover:text-gray-600"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post1));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark onClick={bookmarkHandler} className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>
      <p>
        <span className="font-medium mr-2">{post1.author?.username}</span>
        {post1.caption}
      </p>
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post1));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
