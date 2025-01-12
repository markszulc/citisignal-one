/**
 * loads and decorates the article block
 * @param {Element} block The article block element
 */

export default async function decorate(block) {
  const firstChild = block.children[0];
  firstChild.className = 'article-content-wrapper';
}
