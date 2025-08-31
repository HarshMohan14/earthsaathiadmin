import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Download, 
  Calendar,
  Filter,
  Download as DownloadIcon,
  Share2,
  RefreshCw
} from 'lucide-react';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  const metrics = [
    {
      title: 'Total Page Views',
      value: '45.2K',
      change: '+12.5%',
      changeType: 'positive',
      icon: Eye,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Unique Visitors',
      value: '28.7K',
      change: '+8.2%',
      changeType: 'positive',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Downloads',
      value: '3.1K',
      change: '+15.3%',
      changeType: 'positive',
      icon: Download,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Conversion Rate',
      value: '6.8%',
      change: '+2.1%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const chartData = {
    pageViews: [1200, 1400, 1100, 1600, 1800, 2200, 1900, 2400, 2100, 2800, 3200, 3500],
    visitors: [800, 950, 750, 1100, 1200, 1500, 1300, 1700, 1400, 1900, 2100, 2400],
    downloads: [50, 65, 45, 80, 95, 120, 100, 140, 110, 160, 180, 220]
  };

  const topPages = [
    { name: 'Homepage', views: 12500, change: '+15.2%' },
    { name: 'Solutions', views: 8900, change: '+8.7%' },
    { name: 'About Us', views: 6700, change: '+12.3%' },
    { name: 'Resources', views: 5400, change: '+6.9%' },
    { name: 'Contact', views: 3200, change: '+4.2%' }
  ];

  const topResources = [
    { name: 'Sustainability Guidelines', downloads: 456, views: 1200 },
    { name: 'Carbon Calculator', downloads: 389, views: 980 },
    { name: 'Solar Installation Guide', downloads: 234, views: 670 },
    { name: 'Waste Management Flowchart', downloads: 198, views: 540 },
    { name: 'Energy Audit Template', downloads: 167, views: 420 }
  ];

  const trafficSources = [
    { source: 'Organic Search', percentage: 45, color: 'bg-blue-500' },
    { source: 'Direct Traffic', percentage: 28, color: 'bg-green-500' },
    { source: 'Social Media', percentage: 15, color: 'bg-purple-500' },
    { source: 'Referral', percentage: 8, color: 'bg-orange-500' },
    { source: 'Email', percentage: 4, color: 'bg-red-500' }
  ];

  const generateChartBar = (value, max, height = 40) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input-field w-32"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn-secondary">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Share2 className="w-4 h-4 mr-2" />
            Share Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last period</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Page Views Trend</h3>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {chartData.pageViews.map((value, index) => (
              <div key={index} className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 w-8">{index + 1}</span>
                {generateChartBar(value, Math.max(...chartData.pageViews))}
                <span className="text-sm font-medium text-gray-900 w-16 text-right">{value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${source.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{source.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Total Traffic</span>
              <span className="font-semibold text-gray-900">100%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Pages</h3>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{page.name}</p>
                    <p className="text-xs text-gray-500">{page.views.toLocaleString()} views</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-green-600">{page.change}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Resources</h3>
          <div className="space-y-4">
            {topResources.map((resource, index) => (
              <div key={resource.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32">{resource.name}</p>
                    <p className="text-xs text-gray-500">{resource.downloads} downloads</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{resource.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Growth Rate</h4>
            <p className="text-2xl font-bold text-blue-600">+12.5%</p>
            <p className="text-sm text-gray-500">vs last period</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">User Engagement</h4>
            <p className="text-2xl font-bold text-green-600">4.2 min</p>
            <p className="text-sm text-gray-500">average session</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Content Performance</h4>
            <p className="text-2xl font-bold text-purple-600">89%</p>
            <p className="text-sm text-gray-500">satisfaction rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
