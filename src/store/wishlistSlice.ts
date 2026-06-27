import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/mockData';

interface WishlistState {
  items: Product[];
}

const loadWishlistFromStorage = (): WishlistState => {
  try {
    const serializedWishlist = localStorage.getItem('wishlist');
    if (serializedWishlist === null) {
      return { items: [] };
    }
    return JSON.parse(serializedWishlist);
  } catch (err) {
    return { items: [] };
  }
};

const initialState: WishlistState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existingIndex = state.items.findIndex(item => item.id === product.id);
      
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }
      
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.removeItem('wishlist');
    }
  }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
