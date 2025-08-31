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
  Eye,
  X,
  Save,
  Image as ImageIcon
} from 'lucide-react';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Using the provided mock project data structure
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Enhancing Methane Purity at Cattle Research Institute",
      subtitle: "Ongoing Project",
      imageUrl: "/Project1.jpg",
      sections: [
        {
          title: "Client Challenge",
          content: "The Cattle Research Institute in Pune operates a biogas plant that currently achieves methane purity levels of around 80–85% using a traditional water scrubbing system. While effective to a degree, the existing setup has limitations in energy efficiency and output quality, making it less suitable for high-value clean energy applications."
        },
        {
          title: "Our Approach",
          content: "EarthSaathi is collaborating with the institute on a large-scale pilot to integrate our proprietary NS-MAX™ solvent technology into their biogas purification process. The goal is to enhance methane purity up to 99%, while also reducing energy consumption and operational inefficiencies."
        },
        {
          title: "Project Highlights",
          content: [
            "Focused on improving methane quality for better energy utilization",
            "Collaboration with a Japanese biogas plant for additional R&D support",
            "Designed for energy savings and operational efficiency"
          ]
        },
        {
          title: "Status",
          content: "The project is currently in the pilot implementation phase. Early results are promising, and ongoing testing will help validate improvements in gas quality, energy use, and system scalability."
        },
        {
          title: "Why It Matters",
          content: "This pilot represents a significant step in demonstrating how innovative solvent technologies can upgrade existing biogas systems, making them more sustainable and impactful for rural and research-based energy initiatives."
        }
      ]
    },
    {
      id: 2,
      title: "Cashew Waste to Energy - Pilot in Africa",
      subtitle: "Ongoing Project",
      imageUrl: "/Project2.jpg",
      sections: [
        {
          title: "Client Challenge",
          content: "A new cashew processing plant in Africa was looking for a sustainable way to meet its electricity demands while managing the significant organic waste generated from processing. Traditional power sources were either unreliable or costly, and waste disposal posed an environmental burden."
        },
        {
          title: "Our Approach",
          content: "EarthSaathi designed a proof-of-concept (POC) biogas solution that turns cashew waste into clean energy. The goal is to meet at least 19% of the plant's daily electricity needs by converting organic waste into biomethane using advanced digestion and purification technology."
        },
        {
          title: "Project Components",
          content: [
            "Biogas system setup: digesters, agitators, membranes, and H₂S control",
            "External biomethane storage tanks (3000m³ x 2)",
            "CHP-enabled electrical generators",
            "Biogas purification using NS-MAX™ solvent",
            "Integration of fertilizer processing for digestate reuse",
            "Full installation and implementation support"
          ]
        },
        {
          title: "Status",
          content: "The pilot is in the system design and component selection stage. Once operational, it will serve as a blueprint for other agro-processing plants across Africa to adopt circular energy solutions."
        },
        {
          title: "Why It Matters",
          content: "This project showcases how agricultural waste can be converted into power-reducing energy dependence, cutting emissions, and improving overall sustainability in rural industries. It's a strong example of EarthSaathi's mission to build low-carbon solutions tailored to real-world challenges."
        }
      ]
    }
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || project.subtitle.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (subtitle) => {
    if (subtitle.toLowerCase().includes('ongoing')) {
      return 'bg-blue-100 text-blue-800';
    } else if (subtitle.toLowerCase().includes('completed')) {
      return 'bg-green-100 text-green-800';
    } else if (subtitle.toLowerCase().includes('planning')) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (subtitle) => {
    if (subtitle.toLowerCase().includes('ongoing')) {
      return <Clock className="w-4 h-4" />;
    } else if (subtitle.toLowerCase().includes('completed')) {
      return <CheckCircle className="w-4 h-4" />;
    } else if (subtitle.toLowerCase().includes('planning')) {
      return <Target className="w-4 h-4" />;
    } else {
      return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleCreateProject = () => {
    setEditingProject({
      id: Date.now(),
      title: '',
      subtitle: '',
      imageUrl: '',
      sections: [
        { title: 'Client Challenge', content: '' },
        { title: 'Our Approach', content: '' },
        { title: 'Project Highlights', content: [] },
        { title: 'Status', content: '' },
        { title: 'Why It Matters', content: '' }
      ]
    });
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject({ ...project });
    setShowModal(true);
  };

  const handleViewProject = (project) => {
    setViewingProject(project);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId));
    setShowDeleteConfirm(null);
  };

  const handleSaveProject = () => {
    if (editingProject.title.trim() === '') {
      alert('Project title is required');
      return;
    }

    if (editingProject.id === Date.now()) {
      // New project
      setProjects([...projects, editingProject]);
    } else {
      // Update existing project
      setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
    }
    
    setShowModal(false);
    setEditingProject(null);
  };

  const handleSectionChange = (sectionIndex, field, value) => {
    const updatedSections = [...editingProject.sections];
    if (field === 'content' && Array.isArray(updatedSections[sectionIndex].content)) {
      // Handle array content (like Project Highlights)
      updatedSections[sectionIndex].content = value.split('\n').filter(item => item.trim());
    } else {
      updatedSections[sectionIndex][field] = value;
    }
    
    setEditingProject({
      ...editingProject,
      sections: updatedSections
    });
  };

  const addSection = () => {
    setEditingProject({
      ...editingProject,
      sections: [...editingProject.sections, { title: '', content: '' }]
    });
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = editingProject.sections.filter((_, index) => index !== sectionIndex);
    setEditingProject({
      ...editingProject,
      sections: updatedSections
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage and track your environmental projects</p>
        </div>
        <button 
          onClick={handleCreateProject}
          className="btn-primary"
        >
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
                placeholder="Search projects by title or subtitle..."
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
              <option value="all">All Projects</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="planning">Planning</option>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.subtitle}</p>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.subtitle)}`}>
                {getStatusIcon(project.subtitle)}
                <span className="ml-1">{project.subtitle}</span>
              </span>
            </div>

            {/* Project Image */}
            <div className="mb-4">
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
            </div>

            {/* Project Sections Preview */}
            <div className="mb-4 space-y-2">
              {project.sections.slice(0, 2).map((section, idx) => (
                <div key={idx} className="text-sm">
                  <span className="font-medium text-gray-700">{section.title}:</span>
                  <p className="text-gray-600 line-clamp-2">
                    {Array.isArray(section.content) 
                      ? section.content.join(', ')
                      : section.content
                    }
                  </p>
                </div>
              ))}
              {project.sections.length > 2 && (
                <p className="text-xs text-gray-500">+{project.sections.length - 2} more sections</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleViewProject(project)}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Project"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditProject(project)}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Edit Project"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(project.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => handleViewProject(project)}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
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
          <button 
            onClick={handleCreateProject}
            className="btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
          </button>
        </motion.div>
      )}

      {/* Create/Edit Project Modal */}
      {showModal && editingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingProject.id === Date.now() ? 'Create New Project' : 'Edit Project'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                    className="input-field w-full"
                    placeholder="Enter project title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={editingProject.subtitle}
                    onChange={(e) => setEditingProject({...editingProject, subtitle: e.target.value})}
                    className="input-field w-full"
                    placeholder="e.g., Ongoing Project"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={editingProject.imageUrl}
                  onChange={(e) => setEditingProject({...editingProject, imageUrl: e.target.value})}
                  className="input-field w-full"
                  placeholder="/Project1.jpg"
                />
              </div>

              {/* Project Sections */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Project Sections</h3>
                  <button
                    onClick={addSection}
                    className="btn-secondary text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Section
                  </button>
                </div>

                <div className="space-y-4">
                  {editingProject.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => handleSectionChange(sectionIndex, 'title', e.target.value)}
                          className="input-field flex-1 mr-2"
                          placeholder="Section title"
                        />
                        {editingProject.sections.length > 1 && (
                          <button
                            onClick={() => removeSection(sectionIndex)}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      {Array.isArray(section.content) ? (
                        <textarea
                          value={section.content.join('\n')}
                          onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
                          className="input-field w-full h-24"
                          placeholder="Enter content (one item per line)"
                        />
                      ) : (
                        <textarea
                          value={section.content}
                          onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
                          className="input-field w-full h-24"
                          placeholder="Enter section content"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject}
                className="btn-primary"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {viewingProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{viewingProject.title}</h2>
                <button 
                  onClick={() => setViewingProject(null)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">{viewingProject.subtitle}</p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Image */}
                <div>
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                </div>

                {/* Project Sections */}
                <div className="space-y-4">
                  {viewingProject.sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-primary-500 pl-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
                      {Array.isArray(section.content) ? (
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {section.content.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-600">{section.content}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => handleEditProject(viewingProject)}
                className="btn-primary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Project</h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(showDeleteConfirm)}
                  className="btn-danger"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
