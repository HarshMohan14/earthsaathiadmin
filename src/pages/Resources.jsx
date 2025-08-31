import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  File,
  Image,
  Video,
  Archive,
  Calendar,
  User,
  HardDrive,
  Upload
} from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [uploading, setUploading] = useState(false);

  const resources = [
    {
      id: 1,
      name: 'Sustainability Guidelines 2024',
      type: 'PDF',
      size: '2.4 MB',
      category: 'Guidelines',
      uploadDate: 'Mar 15, 2024',
      uploadedBy: 'John Doe',
      downloads: 156,
      description: 'Comprehensive sustainability guidelines for industrial facilities'
    },
    {
      id: 2,
      name: 'Carbon Footprint Calculator',
      type: 'Excel',
      size: '1.8 MB',
      category: 'Tools',
      uploadDate: 'Mar 10, 2024',
      uploadedBy: 'Sarah Wilson',
      downloads: 89,
      description: 'Excel-based calculator for measuring carbon emissions'
    },
    {
      id: 3,
      name: 'Solar Panel Installation Guide',
      type: 'PDF',
      size: '5.2 MB',
      category: 'Manuals',
      uploadDate: 'Mar 5, 2024',
      uploadedBy: 'Mike Johnson',
      downloads: 234,
      description: 'Step-by-step guide for solar panel installation'
    },
    {
      id: 4,
      name: 'Waste Management Flowchart',
      type: 'Image',
      size: '856 KB',
      category: 'Diagrams',
      uploadDate: 'Feb 28, 2024',
      uploadedBy: 'Emily Brown',
      downloads: 67,
      description: 'Visual flowchart for waste management processes'
    },
    {
      id: 5,
      name: 'Energy Audit Template',
      type: 'Word',
      size: '1.2 MB',
      category: 'Templates',
      uploadDate: 'Feb 20, 2024',
      uploadedBy: 'David Lee',
      downloads: 123,
      description: 'Template for conducting energy audits'
    },
    {
      id: 6,
      name: 'Green Building Standards',
      type: 'PDF',
      size: '3.7 MB',
      category: 'Standards',
      uploadDate: 'Feb 15, 2024',
      uploadedBy: 'John Doe',
      downloads: 198,
      description: 'International green building standards and requirements'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || resource.category.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getFileTypeIcon = (type) => {
    switch (type) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'Excel':
        return <File className="w-5 h-5 text-green-500" />;
      case 'Word':
        return <File className="w-5 h-5 text-blue-500" />;
      case 'Image':
        return <Image className="w-5 h-5 text-purple-500" />;
      case 'Video':
        return <Video className="w-5 h-5 text-orange-500" />;
      case 'Archive':
        return <Archive className="w-5 h-5 text-gray-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Guidelines': 'bg-blue-100 text-blue-800',
      'Tools': 'bg-green-100 text-green-800',
      'Manuals': 'bg-purple-100 text-purple-800',
      'Diagrams': 'bg-orange-100 text-orange-800',
      'Templates': 'bg-cyan-100 text-cyan-800',
      'Standards': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploading(true);
      // Simulate file upload
      setTimeout(() => {
        setUploading(false);
        // Handle successful upload
      }, 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
          <p className="text-gray-600 mt-1">Manage and organize your environmental resources</p>
        </div>
        <label className="btn-primary cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.mp4,.zip"
          />
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Upload Files'}
        </label>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 bg-blue-50 border border-blue-200"
        >
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 font-medium">Uploading files...</span>
          </div>
        </motion.div>
      )}

      {/* Filters and Search */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources by name or description..."
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
              <option value="all">All Categories</option>
              <option value="guidelines">Guidelines</option>
              <option value="tools">Tools</option>
              <option value="manuals">Manuals</option>
              <option value="diagrams">Diagrams</option>
              <option value="templates">Templates</option>
              <option value="standards">Standards</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 hover:shadow-lg transition-all duration-200"
          >
            {/* Resource Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getFileTypeIcon(resource.type)}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">{resource.name}</h3>
                  <p className="text-sm text-gray-500">{resource.type} • {resource.size}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

            {/* Category */}
            <div className="mb-4">
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(resource.category)}`}>
                {resource.category}
              </span>
            </div>

            {/* Resource Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Uploaded {resource.uploadDate}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span>by {resource.uploadedBy}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Download className="w-4 h-4 mr-2" />
                <span>{resource.downloads} downloads</span>
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
              <button className="btn-secondary text-sm py-2 px-3">
                <Download className="w-4 h-4 mr-1" />
                Download
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Storage Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <HardDrive className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Total Storage</h4>
            <p className="text-2xl font-bold text-blue-600">15.2 GB</p>
            <p className="text-sm text-gray-500">of 50 GB used</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Total Files</h4>
            <p className="text-2xl font-bold text-green-600">156</p>
            <p className="text-sm text-gray-500">resources uploaded</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900">Total Downloads</h4>
            <p className="text-2xl font-bold text-purple-600">2.4K</p>
            <p className="text-sm text-gray-500">this month</p>
          </div>
        </div>
      </motion.div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <label className="btn-primary cursor-pointer">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Upload className="w-4 h-4 mr-2" />
            Upload First Resource
          </label>
        </motion.div>
      )}
    </div>
  );
};

export default Resources;
