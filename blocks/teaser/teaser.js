export default function decorate(block) {
  // setup image teser
  block.querySelector('p > a')?.classList.add('teaser-link');
  [...block.children].forEach((row) => {
    const pic = row.querySelector('picture');
    if (pic) {
      const picWrapper = pic.parentElement.parentElement;
      if (picWrapper && picWrapper.children.length === 1) {
        // picture is only content in column
        picWrapper.classList.add('teaser-img-col');
      }
    }
  });
}
