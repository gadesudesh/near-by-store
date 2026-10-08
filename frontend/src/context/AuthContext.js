import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext(null);

// Safely import Capacitor Geolocation — falls back to browser API if not available
let CapacitorGeo = null;
try {
  // eslint-disable-next-line
  const { Geolocation } = require('@capacitor/geolocation');
  CapacitorGeo = Geolocation;
} catch (e) {
  // Running in browser without Capacitor native layer — that's fine
}

const MUMBAI_DEFAULT = { lat: 19.0760, lng: 72.8777 };

const getUserLocation = () =>
  new Promise((resolve) => {
    const fallback = () => resolve(MUMBAI_DEFAULT);

    if (CapacitorGeo) {
      // Native Capacitor path (Android / iOS)
      CapacitorGeo.requestPermissions()
        .then(() =>
          CapacitorGeo.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
          })
        )
        .then((pos) =>
          resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        )
        .catch(fallback);
    } else if (navigator.geolocation) {
      // Browser / PWA path
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        fallback,
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      fallback();
    }
  });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Restore session from localStorage
    const savedToken = localStorage.getItem('nbs_token');
    const savedUser = localStorage.getItem('nbs_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);

    // Get location using Capacitor (native) or browser API
    getUserLocation().then(setLocation);
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    const { token: t, user: u } = res.data;
    setToken(t);
    setUser(u);
    localStorage.setItem('nbs_token', t);
    localStorage.setItem('nbs_user', JSON.stringify(u));
    return u;
  };

  const register = async (data) => {
    const res = await API.post('/auth/register', data);
    const { token: t, user: u } = res.data;
    setToken(t);
    setUser(u);
    localStorage.setItem('nbs_token', t);
    localStorage.setItem('nbs_user', JSON.stringify(u));
    return u;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('nbs_token');
    localStorage.removeItem('nbs_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, location, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};