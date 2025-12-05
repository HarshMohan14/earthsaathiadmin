import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, User, X, Save, Loader2 } from 'lucide-react';
import { teamAPI } from '../utils/api';

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    quote: '',
    src: '',
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamAPI.getAll();
      setTeams(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching team:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingTeam(null);
    setFormData({
      name: '',
      designation: '',
      quote: '',
      src: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      designation: team.designation,
      quote: team.quote,
      src: team.src,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      try {
        await teamAPI.delete(id);
        setTeams(teams.filter(team => team._id !== id));
      } catch (err) {
        alert('Error deleting team member: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let savedMember;
      if (editingTeam) {
        savedMember = await teamAPI.update(editingTeam._id, formData);
        setTeams(teams.map(team => 
          team._id === editingTeam._id ? savedMember : team
        ));
      } else {
        savedMember = await teamAPI.create(formData);
        setTeams([...teams, savedMember]);
      }
      setIsModalOpen(false);
      setFormData({
        name: '',
        designation: '',
        quote: '',
        src: '',
      });
    } catch (err) {
      alert('Error saving team member: ' + err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-2">Manage your team members and their information</p>
        </div>
        <button
          onClick={handleAddNew}
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-2 text-gray-600">Loading team members...</span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">Error: {error}</p>
          <button
            onClick={fetchTeam}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Team Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <motion.div
              key={team._id || team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-primary-600 font-medium">{team.designation}</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {team.quote}
              </p>
              
              <div className="flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleEdit(team)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(team._id || team.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingTeam ? 'Edit Team Member' : 'Add New Team Member'}
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote/Description
                </label>
                <textarea
                  name="quote"
                  value={formData.quote}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="src"
                  value={formData.src}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="/path/to/image.jpg"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4">
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
                  <span>{editingTeam ? 'Update' : 'Save'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Team;
