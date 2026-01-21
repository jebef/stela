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
    '': renderHome,
    'about': () => '<h1>About</h1>',
  };

  const render = routes[hash] ?? routes[''];
  app.innerHTML = await render();
}

function renderHome() {
  return `
    <h1>Posts</h1>
    <ul>
      <li><a href="#posts/hello-world">Hello World</a></li>
      <li><a href="#posts/second-post">Second Post</a></li>
    </ul>
  `;
}

async function renderPost(postId) {
  // Later: fetch markdown file based on postId
  return `<article><h1>${postId}</h1></article>`;
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
