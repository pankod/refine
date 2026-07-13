import React from "react";

const UserPost = ({ post }) => {
  // console.log('Rendering UserPost component')

  return (
    <div className="my-1 flex-row-left">
      <a href={`#${post.title}`} className="">
        <h4 id={post.title} className="px-2 font-sm font-bold">
          {post.title}
        </h4>
      </a>
    </div>
  );
};

export default UserPost;
