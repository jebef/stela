/**
 * Fetch the post index 
 * 
 * @returns Promise - post index or null
 */
async function fetchPostIndex() {
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

/**
 * Fetch a post 
 * 
 * @param id - post identifier 
 * @returns Promise - post or null 
 */
async function fetchPost(id) {
  try {
    const res = fetch(`./../posts/${id}/index.md`);

    // TODO: parse markdown and return JSON object 
    
  } catch (err) {
    console.error(`Failed to fetch post ${id}: ${err.message}`);
    return null;
  }
}


/**
 * Debugging 
 */
async function main() {
  const postIndex = await fetchPostIndex();
  console.log(postIndex);
}

main();


