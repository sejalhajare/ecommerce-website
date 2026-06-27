import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, mockProducts } from '../data/mockData';

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  searchQuery: string;
  categoryFilter: string | null;
  brandFilter: string | null;
  priceRange: [number, number];
  sortBy: 'price-low' | 'price-high' | 'newest' | 'best-selling' | 'highest-rated';
}

const initialState: ProductState = {
  items: mockProducts,
  filteredItems: mockProducts,
  searchQuery: '',
  categoryFilter: null,
  brandFilter: null,
  priceRange: [0, 5000],
  sortBy: 'best-selling'
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setCategoryFilter(state, action: PayloadAction<string | null>) {
      state.categoryFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setBrandFilter(state, action: PayloadAction<string | null>) {
      state.brandFilter = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    setSortBy(state, action: PayloadAction<ProductState['sortBy']>) {
      state.sortBy = action.payload;
      productSlice.caseReducers.applyFilters(state);
    },
    applyFilters(state) {
      let result = state.items;
      
      // Search
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        result = result.filter(item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
        );
      }
      
      // Category
      if (state.categoryFilter) {
        result = result.filter(item => item.category === state.categoryFilter);
      }
      
      // Brand
      if (state.brandFilter) {
        result = result.filter(item => item.brand === state.brandFilter);
      }
      
      // Price
      result = result.filter(item => 
        item.price >= state.priceRange[0] && item.price <= state.priceRange[1]
      );
      
      // Sort
      switch (state.sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
          break;
        case 'best-selling':
          result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
          break;
        case 'highest-rated':
          result.sort((a, b) => b.rating - a.rating);
          break;
      }
      
      state.filteredItems = result;
    }
  }
});

export const { 
  setSearchQuery, 
  setCategoryFilter, 
  setBrandFilter, 
  setPriceRange, 
  setSortBy 
} = productSlice.actions;

export default productSlice.reducer;
