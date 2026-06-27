import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';
import { CheckCircle, MapPin, Truck, CreditCard, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalQuantity } = useSelector((state: RootState) => state.cart);
  
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isSuccess, setIsSuccess] = useState(false);

  const shipping = totalAmount > 100 ? 0 : 15;
  const gst = totalAmount * 0.18;
  const finalTotal = totalAmount + shipping + gst;

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">No items to checkout</h2>
        <Link to="/products" className="text-primary-600 hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsSuccess(true);
    dispatch(clearCart());
    toast.success('Order placed successfully!');
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle className="w-12 h-12 text-green-500" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-slate-900 dark:text-white mb-4"
        >
          Thank you for your order!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-slate-500 dark:text-slate-400 max-w-md mb-8 text-lg"
        >
          Your order #NX{Math.floor(Math.random() * 1000000)} has been successfully placed. We'll send you an email confirmation shortly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            to="/products"
            className="px-8 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Progress Stepper */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-200 dark:bg-slate-700 -z-10 -translate-y-1/2"></div>
            
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                {step > 1 ? <Check className="w-5 h-5" /> : 1}
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500'}`}>Address</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                {step > 2 ? <Check className="w-5 h-5" /> : 2}
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500'}`}>Delivery</span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary-600 text-white ring-4 ring-primary-100 dark:ring-primary-900/30' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}`}>
                3
              </div>
              <span className={`text-sm font-medium ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-slate-500'}`}>Payment</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Main Checkout Area */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden relative">
              <AnimatePresence mode="wait">
                
                {/* Step 1: Address */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shipping Address</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" defaultValue="Doe" />
                      </div>
                      <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Street Address</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" defaultValue="123 Nexus Boulevard, Apt 4B" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">City</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" defaultValue="New York" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">ZIP / Postal Code</label>
                        <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" defaultValue="10001" />
                      </div>
                    </div>
                    
                    <div className="pt-6 flex justify-end">
                      <button 
                        onClick={() => setStep(2)}
                        className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center gap-2"
                      >
                        Continue to Delivery <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Delivery */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <Truck className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Delivery Method</h2>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/10 cursor-pointer">
                        <div className="mt-1"><div className="w-5 h-5 rounded-full border-4 border-primary-500 bg-white"></div></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">Standard Delivery</h4>
                            <span className="font-semibold text-slate-900 dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                          </div>
                          <p className="text-sm text-slate-500">Delivered in 3-5 business days</p>
                        </div>
                      </label>

                      <label className="flex items-start gap-4 p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer transition-colors">
                        <div className="mt-1"><div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-600"></div></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-bold text-slate-900 dark:text-white">Express Delivery</h4>
                            <span className="font-semibold text-slate-900 dark:text-white">$25.00</span>
                          </div>
                          <p className="text-sm text-slate-500">Delivered in 1-2 business days</p>
                        </div>
                      </label>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button 
                        onClick={() => setStep(1)}
                        className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
                      >
                        Back
                      </button>
                      <button 
                        onClick={() => setStep(3)}
                        className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center gap-2"
                      >
                        Continue to Payment <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Method</h2>
                    </div>

                    <div className="space-y-4">
                      {['credit_card', 'upi', 'net_banking', 'cod'].map((method) => (
                        <label key={method} className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-colors ${paymentMethod === method ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}>
                          <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === method ? 'border-primary-500 border-4 bg-white' : 'border-slate-300 dark:border-slate-600'}`}></div>
                          <span className="font-semibold text-slate-900 dark:text-white capitalize">
                            {method.replace('_', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                    
                    {paymentMethod === 'credit_card' && (
                      <div className="mt-6 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Card Number</label>
                          <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">CVV</label>
                            <input type="text" placeholder="123" className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-primary-500" />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 flex justify-between">
                      <button 
                        onClick={() => setStep(2)}
                        className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handlePlaceOrder}
                        className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                      >
                        Place Order ${finalTotal.toFixed(2)}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 dark:border-slate-700 sticky top-28">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                Order Items ({totalQuantity})
              </h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-900 p-1 shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 text-slate-600 dark:text-slate-400 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
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
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
