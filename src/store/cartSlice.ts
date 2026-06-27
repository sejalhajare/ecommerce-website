import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../data/mockData';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}

const loadCartFromStorage = (): CartState => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return { items: [], totalQuantity: 0, totalAmount: 0 };
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return { items: [], totalQuantity: 0, totalAmount: 0 };
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      state.totalQuantity++;
      state.totalAmount += newItem.price;
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
      } else {
        existingItem.quantity++;
      }
      
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        state.totalQuantity += quantityDifference;
        state.totalAmount += existingItem.price * quantityDifference;
        existingItem.quantity = quantity;
        
        localStorage.setItem('cart', JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      localStorage.removeItem('cart');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
