// root reference 
const root = document.documentElement;

/**
 * Compute font width - css ch 
 */
function getFontWidth(element) {
  const probe = document.createElement('span');
  probe.textContent = '0';
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.whiteSpace = 'nowrap';
  probe.style.font = getComputedStyle(element).font;

  document.body.appendChild(probe);
  const width = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);

  return width;
}

/**
 * Update grid dimensions 
 */
function updateGridDims() {
  // desired grid dims proportional to the viewport 
  const gwp = parseFloat(getComputedStyle(root).getPropertyValue('--grid-width-percent'));
  const ghp = parseFloat(getComputedStyle(root).getPropertyValue('--grid-height-percent'));
  
  // capture grid reference 
  const grid = document.querySelector('.grid');

  // get font dims 
  const ch = getFontWidth(grid);
  const fsize = parseInt(getComputedStyle(root).getPropertyValue('--font-sm').replace('px', '')); 

  // update width 
  const vw = window.innerWidth;
  const w = Math.floor(vw * gwp / ch) * ch;
  root.style.setProperty('--grid-width', `${w}px`);

  // update height 
  const vh = window.innerHeight;
  const h = Math.floor(vh * ghp / fsize) * fsize;
  root.style.setProperty('--grid-height', `${h}px`);

  return;
}

// attach grid resize listener 
window.addEventListener('resize', updateGridDims);
updateGridDims();