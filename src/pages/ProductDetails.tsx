import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/wishlistSlice';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ProductCard from '../components/product/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const product = useSelector((state: RootState) => state.products.items.find(p => p.id === id));
  const similarProducts = useSelector((state: RootState) => 
    state.products.items.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4)
  );
  
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product?.id);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Product Not Found</h2>
        <Link to="/products" className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add product n times based on quantity
    for(let i=0; i<quantity; i++) {
        dispatch(addToCart(product));
    }
    toast.success(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    if (isInWishlist) {
      toast.error('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4 mb-8">
        <div className="container mx-auto px-4 lg:px-8 flex items-center text-sm text-slate-500 dark:text-slate-400">
          <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-primary-600 transition-colors">{product.category}</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 dark:text-slate-200 truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200 dark:border-slate-700 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Image Gallery */}
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex lg:flex-col gap-4 overflow-x-auto hide-scrollbar lg:w-24 shrink-0">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === idx ? 'border-primary-500 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover bg-slate-100 dark:bg-slate-900 mix-blend-multiply dark:mix-blend-normal" />
                  </button>
                ))}
              </div>
              
              {/* Main Image */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl relative aspect-square md:aspect-auto md:min-h-[500px] flex items-center justify-center overflow-hidden group cursor-zoom-in">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="max-w-[90%] max-h-[90%] object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500"
                  />
                </AnimatePresence>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.discountBadge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {product.discountBadge}
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                      BEST SELLER
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                </div>
                <div className="text-slate-400">|</div>
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium text-sm">
                  <Check className="w-4 h-4" /> 
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </div>
              </div>

              <div className="flex items-end gap-4 mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                {product.description}
              </p>

              {/* Color Selection Placeholder */}
              <div className="mb-8">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Color: <span className="text-slate-500 font-normal">{product.color}</span></h3>
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full border-2 border-primary-500 flex items-center justify-center p-1 cursor-pointer`}>
                    <div className="w-full h-full rounded-full bg-slate-800" title={product.color}></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-full h-14 bg-slate-50 dark:bg-slate-800/50 w-32 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-semibold text-slate-900 dark:text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                  >
                    +
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 h-14 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-600/30 transition-all active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                
                <button 
                  onClick={handleToggleWishlist}
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
                    isInWishlist 
                      ? 'border-red-200 bg-red-50 text-red-500 dark:border-red-900/30 dark:bg-red-900/20' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-700 dark:hover:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Delivery info */}
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <Truck className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Free Delivery</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{product.deliveryDate}</p>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex items-start gap-4">
                  <RotateCcw className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Return Delivery</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Free 30 days delivery returns. Details</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Features & Specs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.features.map((feature, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Similar Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
