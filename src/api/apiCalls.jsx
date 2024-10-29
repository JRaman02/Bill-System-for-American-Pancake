import { API_BASE_URL } from './EndUrls';

export const fetchMenuItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/menu`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
};


