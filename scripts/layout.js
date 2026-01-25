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




