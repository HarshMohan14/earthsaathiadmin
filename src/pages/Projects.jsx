import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Users, 
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      name: 'Carbon Footprint Reduction',
      description: 'Implementing sustainable practices to reduce carbon emissions across all facilities',
      status: 'In Progress',
      progress: 75,
      startDate: 'Jan 15, 2024',
      endDate: 'Jun 30, 2024',
      team: ['John Doe', 'Sarah Wilson', 'Mike Johnson'],
      budget: '$50,000',
      category: 'Sustainability'
    },
    {
      id: 2,
      name: 'Renewable Energy Integration',
      description: 'Solar and wind energy integration project for industrial facilities',
      status: 'Completed',
      progress: 100,
      startDate: 'Oct 1, 2023',
      endDate: 'Mar 15, 2024',
      team: ['Emily Brown', 'David Lee'],
      budget: '$75,000',
      category: 'Energy'
    },
    {
      id: 3,
      name: 'Waste Management System',
      description: 'Advanced waste sorting and recycling system implementation',
      status: 'Planning',
      progress: 25,
      startDate: 'Apr 1, 2024',
      endDate: 'Dec 31, 2024',
      team: ['John Doe', 'Emily Brown'],
      budget: '$100,000',
      category: 'Waste Management'
    },
    {
      id: 4,
      name: 'Green Building Certification',
      description: 'LEED certification for new office building construction',
      status: 'On Hold',
      progress: 40,
      startDate: 'Feb 1, 2024',
      endDate: 'Aug 31, 2024',
      team: ['Sarah Wilson', 'Mike Johnson'],
      budget: '$200,000',
      category: 'Construction'
    },
    {
      id: 5,
      name: 'Water Conservation',
      description: 'Smart irrigation and water recycling system for campus',
      status: 'In Progress',
      progress: 60,
      startDate: 'Mar 1, 2024',
      endDate: 'Sep 30, 2024',
      team: ['David Lee', 'John Doe'],
      budget: '$35,000',
      category: 'Water Management'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.status.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Planning':
        return <Target className="w-4 h-4" />;
      case 'On Hold':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Sustainability': 'bg-emerald-100 text-emerald-800',
      'Energy': 'bg-blue-100 text-blue-800',
      'Waste Management': 'bg-orange-100 text-orange-800',
      'Construction': 'bg-purple-100 text-purple-800',
      'Water Management': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track your environmental projects</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="sm:w-48">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="input-field"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in progress">In Progress</option>
              <option value="planning">Planning</option>
              <option value="on hold">On Hold</option>
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 hover:shadow-lg transition-all duration-200"
          >
            {/* Project Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Status and Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  <span className="ml-1">{project.status}</span>
                </span>
                <span className="text-sm text-gray-500">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-secondary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{project.startDate} - {project.endDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{project.team.length} team members</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Target className="w-4 h-4 mr-2" />
                <span className="font-medium">{project.budget}</span>
              </div>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(project.category)}`}>
                {project.category}
              </span>
            </div>

            {/* Team Members */}
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                {project.team.slice(0, 3).map((member, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold">
                      {member.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs font-bold">+{project.team.length - 3}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
