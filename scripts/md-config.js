/**
 * Wraps a rule handler to use a unified context object
 */
function rule(handler) {
  return (tokens, idx, options, env, self) =>
    handler({ tokens, idx, options, env, self, token: tokens[idx] });
}

/**
 * Formatting plugin for markdown-it parser
 * @param {import('markdown-it')} md
 */
function stela(md) {
  /* Headers */
  md.renderer.rules.heading_open = rule((ctx) => {

  });
  md.renderer.rules.heading_close = rule((ctx) => {

  });

  /* Paragraphs */
  md.renderer.rules.paragraph_open = rule((ctx) => {

  });
  md.renderer.rules.paragraph_close = rule((ctx) => {

  });

  /* Images */
  md.renderer.rules.image = rule((ctx) => {

  });

  /* Links */
  md.renderer.rules.link_open = rule((ctx) => {

  });
  md.renderer.rules.link_close = rule((ctx) => {

  });

}