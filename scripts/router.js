// markdown parser 
const md = markdownit();

// content element reference, where we render posts 
const contentRef = document.querySelector(".content");

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
 * Parse post metadata and content 
 * 
 * @param markdown - md file 
 * @returns post metadata and body 
 */
function parsePost(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, content: markdown };
  
  const meta = {};
  match[1].split("\n").forEach(line => {
    const [key, ...rest] = line.split(":");
    if (key) meta[key.trim()] = rest.join(":").trim();
  });
  
  return { meta, body: match[2] };
}

/**
 * Render a post to the content element 
 * 
 * @param id - unique post identifier 
 */
async function renderPost(id) {
  const post = await fetchPost(id);

  if (!post) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "An error occurred, please try again.";
    contentRef.innerHTML = errorMessage;
    return;
  }

  const { meta, body } = parsePost(post);

  const postDate = document.createElement("p");
  postDate.className = "date";
  postDate.textContent = meta.date;
  contentRef.appendChild(postDate);

  const postBody = md.render(body);
  contentRef.innerHTML += postBody;
  
  return;
}

/**
 * Render grid on top of post 
 */
function renderGrid() {
  const grid = document.createElement("div");
  grid.className = "grid"
  contentRef.appendChild(grid);
  return;
}


/**
 * Debugging 
 */
async function main() {
  const index = await fetchIndex();
  console.log(index);

  await renderPost("0000");

  renderGrid();

  return;
}

main();