import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Mail, X, Save, Eye, Send, Calendar, User, Loader2 } from 'lucide-react';
import { newslettersAPI, newsletterSubscribersAPI } from '../utils/api';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [sendingNewsletter, setSendingNewsletter] = useState(null);

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

  useEffect(() => {
    fetchNewsletters();
    fetchSubscriberCount();
  }, []);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newslettersAPI.getAll();
      setNewsletters(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching newsletters:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriberCount = async () => {
    try {
      const result = await newsletterSubscribersAPI.getCount();
      setSubscriberCount(result.count);
    } catch (err) {
      console.error('Error fetching subscriber count:', err);
    }
  };

  const handleSendNewsletter = async (newsletterId) => {
    if (!window.confirm('Are you sure you want to send this newsletter to all subscribers?')) {
      return;
    }

    try {
      setSendingNewsletter(newsletterId);
      const result = await newslettersAPI.send(newsletterId);
      alert(`Newsletter sent successfully!\nSent: ${result.sent}\nFailed: ${result.failed || 0}`);
    } catch (err) {
      alert('Error sending newsletter: ' + err.message);
    } finally {
      setSendingNewsletter(null);
    }
  };

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this newsletter?')) {
      try {
        await newslettersAPI.delete(id);
        setNewsletters(newsletters.filter(newsletter => newsletter._id !== id));
      } catch (err) {
        alert('Error deleting newsletter: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedNewsletter;
      if (editingNewsletter) {
        // Update existing newsletter
        savedNewsletter = await newslettersAPI.update(editingNewsletter._id, formData);
        setNewsletters(newsletters.map(newsletter => 
          newsletter._id === editingNewsletter._id ? savedNewsletter : newsletter
        ));
      } else {
        // Add new newsletter
        const newNewsletterData = {
          ...formData,
          subscribers: 1250,
          openRate: 0,
          clickRate: 0
        };
        savedNewsletter = await newslettersAPI.create(newNewsletterData);
        setNewsletters([...newsletters, savedNewsletter]);
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
    } catch (err) {
      alert('Error saving newsletter: ' + err.message);
    }
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
              <p className="text-2xl font-bold text-gray-900">{subscriberCount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading newsletters...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">Error: {error}</p>
          <button
            onClick={fetchNewsletters}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Newsletters List */}
      {!loading && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Newsletter Campaigns</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {newsletters.map((newsletter) => (
              <motion.div
                key={newsletter._id || newsletter.id}
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
                    <span>Subscribers: {subscriberCount.toLocaleString()}</span>
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
                  {newsletter.status === 'published' && (
                    <button
                      onClick={() => handleSendNewsletter(newsletter._id || newsletter.id)}
                      disabled={sendingNewsletter === (newsletter._id || newsletter.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 disabled:opacity-50"
                      title="Send Newsletter to Subscribers"
                    >
                      {sendingNewsletter === (newsletter._id || newsletter.id) ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(newsletter)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                    title="Edit Newsletter"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(newsletter._id || newsletter.id)}
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
      )}

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
