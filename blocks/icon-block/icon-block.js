/**
 *
 * @param {HTMLElement} block
 */
export default function decorate(block) {
  [...block.children].forEach((card) => {
    card.classList.add('icon-card');
    const icon = card.querySelector('p:has(span > img)');
    const description = card.querySelector('p:not(:has(span > img))');
    icon.classList.add('ib-icon');
    description.classList.add('ib-description');
  });
  block.style.setProperty('--repeat-number', block.children.length);
}
