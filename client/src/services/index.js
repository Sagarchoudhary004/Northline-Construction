import apiClient from './apiClient';

export const authService = {
  async login(credentials) {
    const { data } = await apiClient.post('/auth/login', credentials);
    if (data.data?.token) {
      localStorage.setItem('northline_admin_token', data.data.token);
    }
    return data.data;
  },
  async logout() {
    await apiClient.post('/auth/logout').catch(() => null);
    localStorage.removeItem('northline_admin_token');
  },
  async getMe() {
    const { data } = await apiClient.get('/auth/me');
    return data.data.admin;
  },
};

export const contentService = {
  async getContent() {
    const { data } = await apiClient.get('/content');
    return data.data;
  },
  async updateSection(section, payload) {
    const { data } = await apiClient.put(`/content/${section}`, payload);
    return data.data;
  },
};

export const projectService = {
  async getPublicProjects() {
    const { data } = await apiClient.get('/projects');
    return data.data;
  },
  async getAllProjectsAdmin() {
    const { data } = await apiClient.get('/projects/admin/all');
    return data.data;
  },
  async createProject(payload) {
    const { data } = await apiClient.post('/projects', payload);
    return data.data;
  },
  async updateProject(id, payload) {
    const { data } = await apiClient.put(`/projects/${id}`, payload);
    return data.data;
  },
  async togglePublish(id) {
    const { data } = await apiClient.patch(`/projects/${id}/toggle-publish`);
    return data.data;
  },
  async reorderProjects(orderedIds) {
    const { data } = await apiClient.patch('/projects/reorder', { orderedIds });
    return data.data;
  },
  async deleteProject(id) {
    const { data } = await apiClient.delete(`/projects/${id}`);
    return data;
  },
};

export const enquiryService = {
  async submit(payload) {
    const { data } = await apiClient.post('/enquiries', payload);
    return data.data;
  },
  async list(params = {}) {
    const { data } = await apiClient.get('/enquiries', { params });
    return data.data;
  },
  async update(id, payload) {
    const { data } = await apiClient.patch(`/enquiries/${id}`, payload);
    return data.data;
  },
  async remove(id) {
    const { data } = await apiClient.delete(`/enquiries/${id}`);
    return data;
  },
};

export const mediaService = {
  async list(category = 'all') {
    const { data } = await apiClient.get('/media', { params: { category } });
    return data.data;
  },
  async upload(file, metadata = {}) {
    const formData = new FormData();
    formData.append('image', file);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.alt) formData.append('alt', metadata.alt);
    if (metadata.category) formData.append('category', metadata.category);
    const { data } = await apiClient.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
  async replace(id, file, metadata = {}) {
    const formData = new FormData();
    formData.append('image', file);
    if (metadata.title) formData.append('title', metadata.title);
    if (metadata.alt) formData.append('alt', metadata.alt);
    if (metadata.category) formData.append('category', metadata.category);
    const { data } = await apiClient.put(`/media/${id}/replace`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },
  async remove(id) {
    const { data } = await apiClient.delete(`/media/${id}`);
    return data;
  },
};

export const dashboardService = {
  async getOverview() {
    const { data } = await apiClient.get('/dashboard/overview');
    return data.data;
  },
};
