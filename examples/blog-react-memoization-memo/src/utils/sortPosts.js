const sortPosts = (posts) => {
  console.log("Sorting posts...");
  return posts.sort((a, b) => b.id - a.id);
};

export default sortPosts;
