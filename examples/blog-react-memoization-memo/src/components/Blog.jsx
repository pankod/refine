import React, { useEffect, useMemo, useState } from "react";
import fetchUpdatedPosts from "../fetch/fetchUpdatedPosts";
import allPosts from "./../data/allPosts.json";
import sortPosts from "../utils/sortPosts";
import LatestPost from "./LatestPost";
import UserPostsIndex from "./UserPostsIndex";

const Blog = ({ signedIn }) => {
  const [updatedPosts, setUpdatedPosts] = useState(allPosts);
  const [localTime, setLocalTime] = useState(new Date().toLocaleTimeString());

  const getLatestPosts = () => {
    const posts = fetchUpdatedPosts();
    setUpdatedPosts(posts);
  };

  const sortedPosts = sortPosts(updatedPosts);
  // const sortedPosts = useMemo(() => sortPosts(updatedPosts), [updatedPosts]);

  useEffect(() => {
    const id = setInterval(
      () => setLocalTime(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(id);
  }, []);

  console.log("Rendering Blog component");

  return (
    <div className="container">
      <h1 className="m-1 p-1 text-center heading-lg">Memoization in React</h1>
      <div className="m-1 p-2 ">
        <div className="my-1 p-2 box">
          <div className="latest-posts-top">
            <h3 className="heading-md my-1 p-1">Latest posts</h3>
            <div className="p-1">{localTime}</div>
          </div>
          <div className="my-1">
            <button className="btn btn-primary" onClick={getLatestPosts}>
              Get&nbsp;Latest&nbsp;Post
            </button>
          </div>
          <hr className="hr my-2" />
          <LatestPost signedIn={signedIn} post={sortedPosts[0]} />
        </div>
        <UserPostsIndex signedIn={signedIn} />
      </div>
    </div>
  );
};

// export default Blog;
export default React.memo(Blog);
