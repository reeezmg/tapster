import axios from 'axios';
import Cookies from 'js-cookie';
const API_URL = ' https://server.tapster.shop/api/users'; // Update this URL if necessary

class AuthService {
  // Register User
  static async register({ name, email, password}) {
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { name, email, password},
        { withCredentials: true } // Enable credentials
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error registering user');
    }
  }

  static async dregister({ name, email, password, id}) {
    try {
      const response = await axios.post(
        `${API_URL}/dregister`,
        { name, email, password,id},
        { withCredentials: true } // Enable credentials
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error registering user');
    }
  }

  // Login User
  static async login({ email, password, location }) {
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password, location },
        { withCredentials: true } // Enable credentials
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save token to localStorage
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error logging in');
    }
  }


  static async dlogin({ email, password }) {
    try {
      const response = await axios.post(
        `${API_URL}/dlogin`,
        { email, password },
        { withCredentials: true } 
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); 
      }
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Error logging in');
    }
  }

  // Logout User
  static logout() {
    // Clear the 'token' cookie by setting an expired date
    Cookies.remove('token', { path: '/', domain: '.reez.uk' });
  }
                 
  // Get stored token
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default AuthService;
