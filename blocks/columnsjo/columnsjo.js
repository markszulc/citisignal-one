import { getAemAuthorEnv } from '../../scripts/configs.js';

const AEM_DIV_EXTRA_CONTENT = ['text, grid-layout', 'icon, icon-layout', 'promo, promo-layout'];

export default function decorate(block) {
  // this is for UE to use the same columns block no matter the layout
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < block.classList.length; i++) {
    if (block.classList[i].includes('grid-placeholder-icons')) {
      block.classList.remove('grid-placeholder-icons');
      block.classList.add('grid');
    }
  }
  if (block.firstElementChild && block.firstElementChild.children) {
    const cols = [...block.firstElementChild.children];
    block.classList.add(`columnsjo-${cols.length}-cols`);
  }

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columnsjo-img-col');
        }
      }
      // this is to remove empty <div></div> because of UE
      // using the same columns block, only in PREVIEW/PUBLISH
      if (!col.textContent.trim()) {
        row.remove();
      }
      // this is to remove the info-only <div></div> listing the style
      // chosen in UE because it's not an actual 'content' block
      if (AEM_DIV_EXTRA_CONTENT.includes(col.textContent.trim())) {
        col.remove();
      }
    });
  });

  const isAemAuthor = getAemAuthorEnv();
  if (isAemAuthor && /^\s*\n\s*$/.test(block.innerHTML)) { // block.innerHTML.trim() === '' && block.childNodes && block.childNodes.length === 0) {
    const authorBlock = document.createElement('div');
    authorBlock.textContent = 'Columns JS Object container for enrichment';
    block.appendChild(authorBlock);
  }
}
