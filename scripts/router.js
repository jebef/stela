const md = markdownit();

async function fetchPosts() {
  const response = await fetch('./posts/index.json');
  return response.json();
}

async function router() {
  const hash = window.location.hash.slice(1) || '';
  const app = document.getElementById('app');
  if (!app) return;

  // Dynamic post route
  if (hash.startsWith('posts/')) {
    const postId = hash.slice(6);
    app.innerHTML = await renderPost(postId);
    return;
  }

  // Static routes
  const routes = {
    '': renderHome
  };

  const render = routes[hash] ?? routes[''];
  app.innerHTML = await render();
}

async function renderHome() {
  const posts = await fetchPosts();
  const postLinks = posts
    .map(post => `<li><a href="#posts/${post.id}">${post.title}</a> <span>${post.date}</span></li>`)
    .join('\n');

  return `
    <h1>Posts</h1>
    <ul>${postLinks}</ul>
  `;
}

async function renderPost(postId) {
  const response = await fetch(`./posts/${postId}.md`);
  if (!response.ok) {
    return '<h1>Post not found</h1>';
  }
  const markdown = await response.text();
  return `<article class="post">${md.render(markdown)}</article>`;
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
