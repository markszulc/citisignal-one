/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */

// Dropin Providers
import { render as provider } from '@dropins/storefront-cart/render.js';
import { setFetchGraphQlHeader as setCartDropinRequestHeader } from '@dropins/storefront-cart/api.js';

// Dropin Containers
import Cart from '@dropins/storefront-cart/containers/Cart.js';

// Libs
import { getConfigValue } from '../../scripts/configs.js';

export default async function decorate(block) {
  // Initialize Drop-ins – already initialized in scripts/dropins.js
  setCartDropinRequestHeader('store', await getConfigValue('store'));

  // Render Containers
  return provider.render(Cart, {
    routeEmptyCartCTA: () => '/',
    routeProduct: (product) => `/products/${product.url.urlKey}/${product.sku}`,
    //  routeProduct: (product) => `/products/${product.sku}`,
    routeCheckout: () => '/checkout',
  })(block);
}
