import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Mail, X, Save, Eye, Send, Calendar, User } from 'lucide-react';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: "EarthSaathi's Latest Breakthrough in Biogas Technology",
      subject: "Revolutionary CNS Biogas Solution Launch",
      content: "We're excited to announce our latest breakthrough in sustainable energy technology. Our CNS biogas solution has been successfully implemented at a large-scale cashew processing plant in Tanzania, transforming onsite organic waste into a self-contained energy hub. This innovative approach not only reduces disposal costs and environmental impact but also offsets the plant's energy use, making operations more circular, resilient, and cost-effective.",
      excerpt: "Revolutionary CNS biogas solution transforms waste into energy at industrial scale",
      status: "published", // draft, published, scheduled
      publishDate: "2024-01-15",
      author: "Dr. Shaurya Mohan",
      subscribers: 1250,
      openRate: 68.5,
      clickRate: 23.2,
      tags: ["biogas", "sustainability", "technology", "energy"]
    },
    {
      id: 2,
      title: "Sustainable Aviation Fuel: The Future of Clean Aviation",
      subject: "SAF Innovation and Market Opportunities",
      content: "The aviation industry is at a critical juncture in its journey toward sustainability. Our research team has been working on Sustainable Aviation Fuel (SAF) solutions that could revolutionize how we think about air travel. With increasing pressure to reduce carbon emissions and the growing demand for eco-friendly alternatives, SAF presents an unprecedented opportunity for the biofuels sector.",
      excerpt: "Exploring the future of Sustainable Aviation Fuel and market opportunities",
      status: "draft",
      publishDate: null,
      author: "Dr. Namrata",
      subscribers: 1250,
      openRate: 0,
      clickRate: 0,
      tags: ["aviation", "SAF", "biofuels", "research"]
    },
    {
      id: 3,
      title: "Carbon Capture Technology: NS-MAX™ Innovation",
      subject: "Breakthrough in Carbon Capture and Storage",
      content: "Our NS-MAX™ technology represents a significant advancement in carbon capture and storage solutions. Developed through years of research at ICT Mumbai, this innovative approach combines cutting-edge chemistry with practical industrial applications. The technology has shown remarkable efficiency in gas purification and offers a cost-effective solution for industries looking to reduce their carbon footprint.",
      excerpt: "NS-MAX™ technology advances carbon capture with practical industrial applications",
      status: "scheduled",
      publishDate: "2024-02-01",
      author: "Prof. P.D. Vaidya",
      subscribers: 1250,
      openRate: 0,
      clickRate: 0,
      tags: ["carbon capture", "NS-MAX", "technology", "industrial"]
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    content: '',
    excerpt: '',
    status: 'draft',
    publishDate: '',
    author: '',
    tags: []
  });

  const [tagInput, setTagInput] = useState('');

  const handleAddNew = () => {
    setEditingNewsletter(null);
    setFormData({
      title: '',
      subject: '',
      content: '',
      excerpt: '',
      status: 'draft',
      publishDate: '',
      author: '',
      tags: []
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleEdit = (newsletter) => {
    setEditingNewsletter(newsletter);
    setFormData({
      title: newsletter.title,
      subject: newsletter.subject,
      content: newsletter.content,
      excerpt: newsletter.excerpt,
      status: newsletter.status,
      publishDate: newsletter.publishDate || '',
      author: newsletter.author,
      tags: [...newsletter.tags]
    });
    setTagInput('');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      setNewsletters(newsletters.filter(newsletter => newsletter.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNewsletter) {
      // Update existing newsletter
      setNewsletters(newsletters.map(newsletter => 
        newsletter.id === editingNewsletter.id 
          ? { ...newsletter, ...formData }
          : newsletter
      ));
    } else {
      // Add new newsletter
      const newNewsletter = {
        id: Date.now(),
        ...formData,
        subscribers: 1250,
        openRate: 0,
        clickRate: 0
      };
      setNewsletters([...newsletters, newNewsletter]);
    }
    setIsModalOpen(false);
    setFormData({
      title: '',
      subject: '',
      content: '',
      excerpt: '',
      status: 'draft',
      publishDate: '',
      author: '',
      tags: []
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTagAdd();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'published':
        return <Send className="w-4 h-4" />;
      case 'draft':
        return <Edit className="w-4 h-4" />;
      case 'scheduled':
        return <Calendar className="w-4 h-4" />;
      default:
        return <Edit className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Management</h1>
          <p className="text-gray-600 mt-2">Create, edit, and manage your newsletter campaigns</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Create Newsletter</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Newsletters</p>
              <p className="text-2xl font-bold text-gray-900">{newsletters.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsletters.filter(n => n.status === 'published').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {newsletters.filter(n => n.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletters List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Newsletter Campaigns</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {newsletters.map((newsletter) => (
            <motion.div
              key={newsletter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{newsletter.title}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(newsletter.status)}`}>
                      {getStatusIcon(newsletter.status)}
                      <span className="ml-1">{newsletter.status}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Subject:</strong> {newsletter.subject}
                  </p>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {newsletter.excerpt}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{newsletter.author}</span>
                    </span>
                    {newsletter.publishDate && (
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(newsletter.publishDate).toLocaleDateString()}</span>
                      </span>
                    )}
                    <span>Subscribers: {newsletter.subscribers.toLocaleString()}</span>
                    {newsletter.status === 'published' && (
                      <>
                        <span>Open Rate: {newsletter.openRate}%</span>
                        <span>Click Rate: {newsletter.clickRate}%</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {newsletter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(newsletter)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    title="Edit Newsletter"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(newsletter.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete Newsletter"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingNewsletter ? 'Edit Newsletter' : 'Create New Newsletter'}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt/Summary *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Brief summary of the newsletter content"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Write your newsletter content here..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Publish Date
                  </label>
                  <input
                    type="date"
                    name="publishDate"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Newsletter author"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Add a tag and press Enter"
                    />
                    <button
                      type="button"
                      onClick={handleTagAdd}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1 text-primary-600 hover:text-primary-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center space-x-2 transition-colors duration-200"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingNewsletter ? 'Update Newsletter' : 'Create Newsletter'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;
