import React, { useCallback, useEffect, useState } from "react";
import fetchUserPosts from "../fetch/fetchUserPosts";
import UserPostsList from "./UserPostsList";

const UserPostsIndex = ({ signedIn }) => {
  const [userPosts, setUserPosts] = useState([]);

  const deletePost = (e) => {
    // const deletePost = useCallback(e => {
    const { postId } = e.currentTarget.dataset;
    const remainingPosts = userPosts.filter(
      (post) => post.id !== Number.parseInt(postId),
    );
    setUserPosts(remainingPosts);
  };
  // }, [userPosts]);

  useEffect(() => {
    const posts = fetchUserPosts();
    setUserPosts(posts);
  }, []);

  // console.log(userPosts)
  // console.log('Rendering UserPostsIndex component');

  return (
    <div className="my-1 p-2 box">
      <div className="m-1 py-1">
        <h2 className="heading-md">Your Posts</h2>
        <p className="m-1 p-1">{signedIn ? "Signed in" : "Signed out "}</p>
        {userPosts && (
          <div className="px-1">
            {<UserPostsList userPosts={userPosts} deletePost={deletePost} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(UserPostsIndex);
