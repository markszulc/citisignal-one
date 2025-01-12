export default async function decorate(block) {
  [...block.children].forEach((child) => {
    const iconName = child.querySelector('img').getAttribute('data-icon-name');
    child.querySelector('a').title = iconName;
    child.querySelector('img').alt = iconName;
    // add for xwalk
    const spanTag = child.querySelector('span');
    const anchorTag = child.querySelector('a');
    if (anchorTag.querySelector('span')) {
      // do not do anything since span already inside anchor in doc-based
    } else {
      // in x-walk, move the span tag inside the anchor a tag and delete the outside span tag
      if (spanTag && spanTag.parentElement.tagName.toLowerCase() === 'p') {
        const parentPTag = spanTag.parentNode;
        parentPTag.parentNode.removeChild(parentPTag);
      }
      anchorTag.textContent = '';
      anchorTag.appendChild(spanTag);
    }
  });
}
