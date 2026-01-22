/**
 * Fetch a list of posts from the index 
 * 
 * @returns Promise - list of posts or null
 */
async function fetchPosts() {
  try {
    const res = await fetch("./../posts/index.json");
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Failed to fetch posts: ${err.message}`);
    return null;
  }
}

async function main() {
  // debugging 
  const posts = await fetchPosts();
  console.log(posts);
}

main();


