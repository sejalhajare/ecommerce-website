import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../store/store';
import { 
  setCategoryFilter, 
  setBrandFilter, 
  setPriceRange, 
  setSortBy, 
  setSearchQuery 
} from '../store/productSlice';
import { CATEGORIES, BRANDS } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import DualRangeSlider from '../components/ui/DualRangeSlider';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { filteredItems, categoryFilter, brandFilter, priceRange, sortBy, searchQuery } = useSelector((state: RootState) => state.products);
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse search params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    const category = params.get('category');
    
    if (search) dispatch(setSearchQuery(search));
    if (category) dispatch(setCategoryFilter(category));
  }, [location.search, dispatch]);

  const handlePriceChange = (value: [number, number]) => {
    dispatch(setPriceRange(value));
  };

  const toggleCategory = (category: string) => {
    dispatch(setCategoryFilter(categoryFilter === category ? null : category));
  };

  const toggleBrand = (brand: string) => {
    dispatch(setBrandFilter(brandFilter === brand ? null : brand));
  };

  const clearFilters = () => {
    dispatch(setCategoryFilter(null));
    dispatch(setBrandFilter(null));
    dispatch(setPriceRange([0, 5000]));
    dispatch(setSearchQuery(''));
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {searchQuery ? `Search Results for "${searchQuery}"` : categoryFilter || 'All Products'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Showing {filteredItems.length} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>

          <div className="relative group">
            <select 
              className="appearance-none pl-4 pr-10 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 font-medium border border-transparent focus:border-primary-500 focus:ring-0 cursor-pointer outline-none transition-colors"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as any))}
            >
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="highest-rated">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0 space-y-8">
          <div className="glass-panel rounded-2xl p-6 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Filter className="w-5 h-5" /> Filters
              </h2>
              {(categoryFilter || brandFilter || priceRange[0] > 0 || priceRange[1] < 5000 || searchQuery) && (
                <button 
                  onClick={clearFilters}
                  className="text-xs text-primary-600 dark:text-primary-400 font-medium hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Price Range</h3>
              <DualRangeSlider 
                min={0} 
                max={5000} 
                value={priceRange} 
                onChange={handlePriceChange} 
              />
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map(category => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      categoryFilter === category 
                        ? 'bg-primary-500 border-primary-500' 
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-500'
                    }`}>
                      {categoryFilter === category && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={categoryFilter === category}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className={`text-sm ${categoryFilter === category ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Brands</h3>
              <div className="space-y-2">
                {BRANDS.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                      brandFilter === brand 
                        ? 'bg-primary-500 border-primary-500' 
                        : 'border-slate-300 dark:border-slate-600 group-hover:border-primary-500'
                    }`}>
                      {brandFilter === brand && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={brandFilter === brand}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className={`text-sm ${brandFilter === brand ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                <Search className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No products found</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
                We couldn't find anything matching your current filters. Try adjusting your search or filter criteria.
              </p>
              <button 
                onClick={clearFilters}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white dark:bg-slate-900 z-50 shadow-2xl overflow-y-auto lg:hidden flex flex-col"
            >
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-900 z-10">
                <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-grow space-y-8">
                {/* Mobile Price Filter */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Price Range</h3>
                  <DualRangeSlider 
                    min={0} 
                    max={5000} 
                    value={priceRange} 
                    onChange={handlePriceChange} 
                  />
                </div>

                {/* Mobile Categories */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Categories</h3>
                  <div className="space-y-3 flex flex-col">
                    {CATEGORIES.map(category => (
                      <label key={category} className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          categoryFilter === category 
                            ? 'bg-primary-500 border-primary-500' 
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {categoryFilter === category && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={categoryFilter === category}
                          onChange={() => toggleCategory(category)}
                        />
                        <span className={`text-sm ${categoryFilter === category ? 'text-primary-600 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Brands */}
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Brands</h3>
                  <div className="space-y-3 flex flex-col">
                    {BRANDS.map(brand => (
                      <label key={brand} className="flex items-center gap-3 cursor-pointer">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          brandFilter === brand 
                            ? 'bg-primary-500 border-primary-500' 
                            : 'border-slate-300 dark:border-slate-600'
                        }`}>
                          {brandFilter === brand && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                        </div>
                        <input 
                          type="checkbox" 
                          className="hidden" 
                          checked={brandFilter === brand}
                          onChange={() => toggleBrand(brand)}
                        />
                        <span className={`text-sm ${brandFilter === brand ? 'text-primary-600 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                          {brand}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900 grid grid-cols-2 gap-4">
                <button 
                  onClick={clearFilters}
                  className="py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="py-3 px-4 bg-primary-600 text-white rounded-lg font-medium"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductList;
