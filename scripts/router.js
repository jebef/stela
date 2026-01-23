// global refernece to markdown parser 
const md = markdownit();

/**
 * Fetch the post index 
 * 
 * @returns Promise - post index or null
 */
async function fetchIndex() {
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
 * @returns Promise - md text or null 
 */
async function fetchPost(id) {
  try {
    const res = await fetch(`./../posts/${id}/index.md`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    return res.text();
  } catch (err) {
    console.error(`Failed to fetch post ${id}: ${err.message}`);
    return null;
  }
}

/**
 * Debugging 
 */
async function main() {
  const index = await fetchIndex();
  console.log(index);

  const p1 = await fetchPost(index.posts[0].id);

  const content = document.querySelector(".content");
  content.innerHTML = md.render(p1);

  return;
}

main();