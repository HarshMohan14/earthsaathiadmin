const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text.substring(0, 200));
      throw new Error(`Server returned non-JSON response. Status: ${response.status}. Make sure the backend server is running on ${API_BASE_URL}`);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: `HTTP ${response.status}: ${response.statusText}` }));
      throw new Error(error.error || error.message || `API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Cannot connect to backend server at ${API_BASE_URL}. Please ensure the backend is running.`);
    }
    throw error;
  }
};

// Projects API
export const projectsAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (data) => apiCall('/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Newsletters API
export const newslettersAPI = {
  getAll: () => apiCall('/newsletters'),
  getById: (id) => apiCall(`/newsletters/${id}`),
  getPublished: () => apiCall('/newsletters/published/all'),
  create: (data) => apiCall('/newsletters', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/newsletters/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/newsletters/${id}`, {
    method: 'DELETE',
  }),
  send: (id) => apiCall(`/newsletters/${id}/send`, {
    method: 'POST',
  }),
};

// Newsletter Subscribers API
export const newsletterSubscribersAPI = {
  getAll: () => apiCall('/newsletter-subscribers'),
  getCount: () => apiCall('/newsletter-subscribers/count'),
  subscribe: (data) => apiCall('/newsletter-subscribers/subscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  unsubscribe: (data) => apiCall('/newsletter-subscribers/unsubscribe', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/newsletter-subscribers/${id}`, {
    method: 'DELETE',
  }),
};

// Advisors API
export const advisorsAPI = {
  getAll: () => apiCall('/advisors'),
  getById: (id) => apiCall(`/advisors/${id}`),
  create: (data) => apiCall('/advisors', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/advisors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/advisors/${id}`, {
    method: 'DELETE',
  }),
};

// Team API
export const teamAPI = {
  getAll: () => apiCall('/team'),
  getById: (id) => apiCall(`/team/${id}`),
  create: (data) => apiCall('/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/team/${id}`, {
    method: 'DELETE',
  }),
};

// Resources API
export const resourcesAPI = {
  getAll: () => apiCall('/resources'),
  getById: (id) => apiCall(`/resources/${id}`),
  create: (data) => apiCall('/resources', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/resources/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/resources/${id}`, {
    method: 'DELETE',
  }),
  incrementDownload: (id) => apiCall(`/resources/${id}/download`, {
    method: 'PATCH',
  }),
};

// Users API
export const usersAPI = {
  getAll: () => apiCall('/users'),
  getById: (id) => apiCall(`/users/${id}`),
  create: (data) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiCall(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiCall(`/users/${id}`, {
    method: 'DELETE',
  }),
  updateLastLogin: (id) => apiCall(`/users/${id}/last-login`, {
    method: 'PATCH',
  }),
};

export default {
  projects: projectsAPI,
  newsletters: newslettersAPI,
  newsletterSubscribers: newsletterSubscribersAPI,
  advisors: advisorsAPI,
  team: teamAPI,
  resources: resourcesAPI,
  users: usersAPI,
};

