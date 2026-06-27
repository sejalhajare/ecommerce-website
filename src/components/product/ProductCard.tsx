import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { Product } from '../../data/mockData';
import { RootState } from '../../store/store';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.error(`${product.name} removed from wishlist.`);
    } else {
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col h-full relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.discountBadge && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {product.discountBadge}
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            NEW
          </span>
        )}
        {product.isBestSeller && (
          <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            BEST SELLER
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={handleToggleWishlist}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur hover:bg-white dark:hover:bg-slate-900 shadow-sm transition-all text-slate-400 hover:text-red-500"
      >
        <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900 p-6 flex-shrink-0">
        <motion.img 
          initial={false}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-xl"
        />
        
        {/* Quick View Overlay (Desktop only) */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center backdrop-blur-[2px]">
          <span className="px-6 py-2 bg-white text-slate-900 rounded-full font-medium flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Eye className="w-4 h-4" /> Quick View
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{product.rating}</span>
          <span className="text-sm text-slate-400">({product.reviewsCount})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {product.deliveryDate && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Get it {product.deliveryDate}</p>
            )}
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center shadow-lg hover:shadow-primary-600/30 transition-all flex-shrink-0"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
