/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

import { addProductsToCart } from '@dropins/storefront-cart/api.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import initToast from './toast.js';

export default async function initModal(next, state, blockConfig) {
  const placeholders = await fetchPlaceholders();
  const title = blockConfig['modal-content-title'] || placeholders.pdpPlanModalTitle;
  const description = blockConfig['modal-content-description'] || placeholders.pdpPlanModalDescription;

  // Check if modal already exists
  let modal = document.getElementById('modal');
  if (!modal) {
    const modalHTML = `
        <div id="modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span id="closeModalBtn" class="close">&times;</span>
                <p>${title}</p>
                <p>${description}</p>
                <div class="cta-btns">
                  <button type="button" id="BringMyOwnPhoneBtn">Bring My Own Phone</button>
                  <button type="button" id="AddAPhoneBtn" class="add-a-phone">Add A Phone</button>
                </div>
            </div>
        </div>
    `;

    // Append modal HTML to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event listeners
    modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    const bringMyOwnPhoneBtn = document.getElementById('BringMyOwnPhoneBtn');
    bringMyOwnPhoneBtn.addEventListener('click', async () => {
      modal.style.display = 'none';

      try {
        state.set('adding', true);
        if (!next.valid) {
          // eslint-disable-next-line no-console
          console.warn('Invalid product', next.values);
          return;
        }

        const addToCartResponse = await addProductsToCart([{ ...next.values }]);
        if (next.valid && !addToCartResponse.errors) {
          const { quantity } = next.values;
          const productMetaDescription = next.data.metaDescription;
          initToast(quantity, productMetaDescription);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error adding product to cart', error);
      } finally {
        state.set('adding', false);
      }
    });

    const addAPhoneBtn = document.getElementById('AddAPhoneBtn');
    addAPhoneBtn.addEventListener('click', async () => {
      try {
        state.set('adding', true);
        addAPhoneBtn.innerHTML = 'Adding plan to cart...';
        addAPhoneBtn.setAttribute('disabled', true);
        bringMyOwnPhoneBtn.setAttribute('disabled', true);
        if (!next.valid) {
          // eslint-disable-next-line no-console
          console.warn('Invalid product', next.values);
          return;
        }

        const addToCartResponse = await addProductsToCart([{ ...next.values }]);
        if (next.valid && !addToCartResponse.errors) {
          window.location = '/phones';
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn('Error adding product to cart', error);
      } finally {
        state.set('adding', false);
        addAPhoneBtn.innerHTML = 'Add A Phone';
      }
    });

    // Prevent modal from closing when clicking outside of the modal content
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        event.stopPropagation();
      }
    });
  }

  // Display the modal
  modal.style.display = 'flex';
}
