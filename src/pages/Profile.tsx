import React from 'react';
import { User, Package, Heart, CreditCard, LogOut, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">My Account</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 font-medium rounded-xl border-l-4 border-primary-500">
              <User className="w-5 h-5" /> Profile Overview
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-xl transition-colors">
              <Package className="w-5 h-5" /> My Orders
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-xl transition-colors">
              <Heart className="w-5 h-5" /> Wishlist
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-xl transition-colors">
              <CreditCard className="w-5 h-5" /> Payment Methods
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium rounded-xl transition-colors">
              <Settings className="w-5 h-5" /> Settings
            </button>
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 font-medium rounded-xl transition-colors">
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-3xl text-white font-bold shadow-lg">
                  JD
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">John Doe</h2>
                  <p className="text-slate-500 dark:text-slate-400">john.doe@example.com</p>
                  <p className="text-sm text-primary-600 dark:text-primary-400 mt-1 font-medium">Nexus Premium Member</p>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-100 dark:border-slate-700">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Full Name</p>
                  <p className="font-medium text-slate-900 dark:text-white">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email Address</p>
                  <p className="font-medium text-slate-900 dark:text-white">john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Phone Number</p>
                  <p className="font-medium text-slate-900 dark:text-white">+1 (555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Shipping Address</p>
                  <p className="font-medium text-slate-900 dark:text-white">123 Nexus Boulevard, Apt 4B, New York, 10001</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h3>
                <button className="text-primary-600 hover:underline text-sm font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0">
                      <Package className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Order #NX983421</p>
                      <p className="text-sm text-slate-500">Placed on June 20, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:gap-8 justify-between">
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">$349.00</p>
                      <p className="text-sm text-green-500 font-medium">Delivered</p>
                    </div>
                    <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-900 dark:text-white">
                      Track
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
