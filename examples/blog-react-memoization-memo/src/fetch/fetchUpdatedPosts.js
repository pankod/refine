import allPosts from "./../data/allPosts.json";
import newPosts from "./../data/newPosts.json";

const fetchUpdatedPosts = () => {
  const randomIndex = Math.round(Math.random() * 2);

  return [...allPosts, newPosts[randomIndex]];
};

export default fetchUpdatedPosts;
