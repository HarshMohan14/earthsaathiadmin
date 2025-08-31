import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  FolderOpen, 
  FileText, 
  TrendingUp, 
  Eye, 
  Download,
  Activity,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Projects',
      value: '156',
      change: '+8.2%',
      changeType: 'positive',
      icon: FolderOpen,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Resources',
      value: '89',
      change: '+3.1%',
      changeType: 'positive',
      icon: FileText,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Revenue',
      value: '$45.2K',
      change: '+18.7%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New user registered',
      user: 'John Doe',
      time: '2 minutes ago',
      type: 'user'
    },
    {
      id: 2,
      action: 'Project updated',
      user: 'Sarah Wilson',
      time: '15 minutes ago',
      type: 'project'
    },
    {
      id: 3,
      action: 'Resource uploaded',
      user: 'Mike Johnson',
      time: '1 hour ago',
      type: 'resource'
    },
    {
      id: 4,
      action: 'Analytics report generated',
      user: 'System',
      time: '2 hours ago',
      type: 'system'
    }
  ];

  const quickActions = [
    { name: 'Add User', icon: Users, color: 'bg-blue-500' },
    { name: 'Create Project', icon: FolderOpen, color: 'bg-green-500' },
    { name: 'Upload Resource', icon: FileText, color: 'bg-purple-500' },
    { name: 'View Analytics', icon: TrendingUp, color: 'bg-orange-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your projects today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-secondary">
            <Calendar className="w-4 h-4 mr-2" />
            Today
          </button>
          <button className="btn-primary">
            <Activity className="w-4 h-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'project' ? 'bg-green-500' :
                    activity.type === 'resource' ? 'bg-purple-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions & Analytics */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{action.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Traffic Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Page Views</span>
                </div>
                <span className="text-sm font-medium text-gray-900">12.5K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary-600 rounded-full"></div>
                  <span className="text-sm text-gray-600">Unique Visitors</span>
                </div>
                <span className="text-sm font-medium text-gray-900">8.2K</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Downloads</span>
                </div>
                <span className="text-sm font-medium text-gray-900">3.1K</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Total Views</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">45.2K</p>
          <p className="text-sm text-gray-500 mt-1">+12.5% from last month</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Download className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">Downloads</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">8.9K</p>
          <p className="text-sm text-gray-500 mt-1">+8.2% from last month</p>
        </div>
        
        <div className="card p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900">New Users</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">1.2K</p>
          <p className="text-sm text-gray-500 mt-1">+15.3% from last month</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
