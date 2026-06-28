import React from 'react';
import { 
  BarChart3, Users, Package, ShoppingBag, 
  ArrowUpRight, ArrowDownRight, 
  DollarSign, Activity 
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminDashboard: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);
  
  // Dummy stats
  const stats = [
    { title: 'Total Revenue', value: '$124,563', change: '+14.5%', isPositive: true, icon: DollarSign },
    { title: 'Total Orders', value: '1,423', change: '+8.2%', isPositive: true, icon: ShoppingBag },
    { title: 'Total Users', value: '8,234', change: '-2.4%', isPositive: false, icon: Users },
    { title: 'Total Products', value: products.length.toString(), change: '+12.0%', isPositive: true, icon: Package },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-900 flex items-center justify-center shadow-lg text-white font-bold text-xl">
              NX
            </div>
            <span className="text-2xl font-bold tracking-tight">Admin</span>
          </Link>
          
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary-600 rounded-xl font-medium">
              <BarChart3 className="w-5 h-5" /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
              <Package className="w-5 h-5" /> Products
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
              <ShoppingBag className="w-5 h-5" /> Orders
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
              <Users className="w-5 h-5" /> Customers
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-colors">
              <Activity className="w-5 h-5" /> Analytics
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, Admin. Here's what's happening today.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Export Data
            </button>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-colors">
              Add Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                  {stat.isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Revenue Analytics</h2>
              <select className="bg-slate-100 dark:bg-slate-900 border-none text-sm font-medium rounded-lg px-3 py-1 text-slate-700 dark:text-slate-300">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="h-72 flex items-end justify-between gap-2 px-2 pb-6 border-b border-slate-100 dark:border-slate-700 relative">
              {/* Fake bars */}
              {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
                <div key={i} className="w-full relative group">
                  <div 
                    className="absolute bottom-0 w-full bg-primary-200 dark:bg-primary-900/50 rounded-t-sm group-hover:bg-primary-300 transition-colors"
                    style={{ height: '100%' }}
                  ></div>
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-sm"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-slate-400 font-medium px-2">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
              <button className="text-sm text-primary-600 font-medium hover:underline">View All</button>
            </div>
            
            <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {[
                { id: '#1244', name: 'MacBook Pro', price: '$3499.00', status: 'Delivered', color: 'green' },
                { id: '#1245', name: 'Sony Headphones', price: '$348.00', status: 'Processing', color: 'blue' },
                { id: '#1246', name: 'Apple Watch', price: '$799.00', status: 'Shipped', color: 'amber' },
                { id: '#1247', name: 'Logitech Mouse', price: '$99.00', status: 'Delivered', color: 'green' },
                { id: '#1248', name: 'DJI Drone', price: '$959.00', status: 'Cancelled', color: 'red' },
              ].map((order, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 text-slate-500">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{order.name}</p>
                      <p className="text-xs text-slate-500">{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{order.price}</p>
                    <p className={`text-xs font-medium text-${order.color}-500`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
