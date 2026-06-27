import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  const featured = products.filter(p => p.isTrending).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-semibold mb-6"
            >
              🚀 New Collection 2026
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            >
              Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">Everyday</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-slate-300 mb-8 max-w-xl"
            >
              Discover our curated selection of premium electronics and accessories designed for the modern lifestyle.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/products?category=NewArrivals" className="px-8 py-4 rounded-full bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors border border-slate-700">
                View Latest
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Free Shipping</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">On all orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Secure Payment</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Fast Delivery</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Get it by tomorrow</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholders */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Trending Now</h2>
              <p className="text-slate-500 dark:text-slate-400">Top picks for you based on current trends.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium">
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <div key={product.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-900 relative">
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  {product.discountBadge && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discountBadge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1 mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`} className="block w-full text-center py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:bg-primary-600 dark:hover:bg-primary-500 dark:hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
