import React from "react";

const Post = ({ signedIn, post }) => {
  console.log("Rendering Post component");
  // console.log(signedIn);

  return (
    <div className="">
      {post && (
        <div className="post p-1">
          <h1 className="heading-sm py-1">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      )}
    </div>
  );
};

// const customComparator = (prevProps, nextProps) => {
//   return nextProps.post === prevProps.post;
// };

export default Post;
// export default React.memo(Post);
// export default React.memo(Post, customComparator);
