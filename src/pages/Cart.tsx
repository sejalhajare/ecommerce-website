import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { updateQuantity, removeFromCart, clearCart } from '../store/cartSlice';
import { Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
  
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  const shipping = totalAmount > 100 ? 0 : 15;
  const gst = totalAmount * 0.18; // 18% GST
  const finalTotal = totalAmount + shipping + gst - discount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'NEXUS20') {
      setDiscount(totalAmount * 0.2); // 20% discount
    } else {
      setDiscount(0);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <div className="w-32 h-32 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          Looks like you haven't added anything to your cart yet. Discover our premium collection and find something you love.
        </p>
        <Link 
          to="/products"
          className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Shopping Cart <span className="text-slate-500 text-2xl font-normal">({totalQuantity} items)</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-medium text-sm uppercase tracking-wider mb-6">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="space-y-6">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0"
                    >
                      <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                        <Link to={`/product/${item.id}`} className="w-24 h-24 rounded-xl bg-slate-100 dark:bg-slate-900 p-2 shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </Link>
                        <div>
                          <Link to={`/product/${item.id}`} className="font-semibold text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2 mb-1">
                            {item.name}
                          </Link>
                          <p className="text-sm text-slate-500 mb-2">Color: {item.color}</p>
                          <button 
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 md:text-center font-medium text-slate-900 dark:text-white flex justify-between md:block">
                        <span className="md:hidden text-slate-500">Price:</span>
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                        <span className="md:hidden text-slate-500 font-medium">Quantity:</span>
                        <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 h-10 w-24">
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-medium text-slate-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => dispatch(updateQuantity({ id: item.id, quantity: Math.min(item.stock, item.quantity + 1) }))}
                            className="w-8 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 text-right font-bold text-slate-900 dark:text-white flex justify-between md:block text-lg">
                        <span className="md:hidden text-slate-500 font-medium text-base">Total:</span>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200 dark:border-slate-700">
                <Link to="/products" className="text-primary-600 dark:text-primary-400 font-medium hover:underline flex items-center gap-2">
                  Continue Shopping
                </Link>
                <button 
                  onClick={() => dispatch(clearCart())}
                  className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span className="font-medium text-slate-900 dark:text-white">${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900 dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="font-medium text-slate-900 dark:text-white">${gst.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Coupon code (try NEXUS20)" 
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 text-sm"
                    />
                  </div>
                  <button type="submit" className="px-4 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors text-sm whitespace-nowrap">
                    Apply
                  </button>
                </form>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">Total Amount</span>
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">${finalTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Including GST and shipping</p>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-600/20 transition-all active:scale-95"
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                <ShieldCheck className="w-5 h-5 text-green-500" /> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
