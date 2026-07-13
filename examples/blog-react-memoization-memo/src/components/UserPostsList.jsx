import React from "react";
import UserPost from "./UserPost";

const UserPostsList = ({ userPosts, deletePost }) => {
  // console.log('Rendering UserPostsList component');

  return (
    <div className="px-1">
      {userPosts.map((post) => (
        <div key={post.id} className="my-1 box flex-row">
          <UserPost post={post} />
          <button
            className="btn btn-danger"
            data-post-id={post.id}
            onClick={deletePost}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(UserPostsList);
