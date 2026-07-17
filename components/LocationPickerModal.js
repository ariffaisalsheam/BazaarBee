'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CrosshairIcon, LocationIcon, CloseIcon, CheckIcon } from './Icons';

// Debounce helper
function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// Reverse geocode via Nominatim (free, no API key)
// zoom=18 forces building/neighbourhood-level detail
async function reverseGeocode(lat, lng, lang = 'en') {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&zoom=18&accept-language=${lang === 'BN' ? 'bn' : 'en'}`,
      { headers: { 'User-Agent': 'BazaarBee/1.0' } }
    );
    const data = await res.json();
    if (data && data.address) {
      const a = data.address;
      // Priority: neighbourhood (Sardarpara, Dhap, Hazipara) → suburb → village → road → city
      const area = a.neighbourhood || a.suburb || a.quarter || a.village || a.hamlet || '';
      const road = a.road || '';
      const main = area || road || a.city_district || a.town || a.city || 'Rangpur';
      const subParts = [
        road && area ? road : '',  // show road only if area is also available
        a.city_district || '',
        a.city || a.town || 'Rangpur',
        a.postcode || ''
      ].filter(Boolean);
      const sub = subParts.join(', ');
      return { main, sub, full: data.display_name || sub };
    }
  } catch (e) {
    console.warn('Nominatim geocode failed:', e);
  }
  return { main: 'Rangpur', sub: 'Rangpur City, Bangladesh', full: 'Rangpur, Bangladesh' };
}

export default function LocationPickerModal({ isOpen, onClose, onConfirm, initialCoords }) {
  const { language } = useLanguage();
  const [mapReady, setMapReady] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [address, setAddress] = useState({ main: '', sub: '', full: '' });
  const [centerCoords, setCenterCoords] = useState(
    initialCoords || { lat: 25.7439, lng: 89.2752 } // Rangpur City center
  );
  const mapRef = useRef(null);
  const geocodeRef = useRef(null);

  // Load Leaflet CDN
  useEffect(() => {
    if (!isOpen) return;
    if (typeof window === 'undefined') return;
    if (window.L) { setMapReady(true); return; }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setMapReady(true);
    document.head.appendChild(script);
  }, [isOpen]);

  // Debounced reverse geocode
  useEffect(() => {
    geocodeRef.current = debounce(async (lat, lng) => {
      setIsGeocoding(true);
      const result = await reverseGeocode(lat, lng, language);
      setAddress(result);
      setIsGeocoding(false);
    }, 600);
  }, [language]);

  // Initialize map
  useEffect(() => {
    if (!isOpen || !mapReady || mapRef.current) return;
    const L = window.L;
    if (!L) return;

    const container = document.getElementById('loc-map-canvas');
    if (!container) return;

    const map = L.map('loc-map-canvas', {
      zoomControl: false,
      attributionControl: false
    }).setView([centerCoords.lat, centerCoords.lng], 15);
    mapRef.current = map;

    // Add zoom control top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Google Maps tiles
    L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 19
    }).addTo(map);

    // Small attribution bottom-left
    L.control.attribution({ prefix: '© Google Maps' }).addTo(map);

    // Initial geocode
    geocodeRef.current?.(centerCoords.lat, centerCoords.lng);

    // Listen for map movement
    map.on('movestart', () => setIsMoving(true));
    map.on('moveend', () => {
      setIsMoving(false);
      const c = map.getCenter();
      setCenterCoords({ lat: c.lat, lng: c.lng });
      geocodeRef.current?.(c.lat, c.lng);
    });

    // Fix tile rendering after modal animation
    setTimeout(() => map.invalidateSize(), 400);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen, mapReady]);

  // GPS locate
  const handleGPS = useCallback(() => {
    if (!navigator.geolocation) return;
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapRef.current) {
          mapRef.current.flyTo([latitude, longitude], 17, { duration: 1.2 });
        }
        setGpsLoading(false);
      },
      () => {
        setGpsLoading(false);
        alert(language === 'BN'
          ? 'অবস্থান সনাক্ত করতে ব্যর্থ। ব্রাউজারে লোকেশন অনুমতি দিন।'
          : 'Failed to detect location. Please enable location permission.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [language]);

  // Confirm handler
  const handleConfirm = () => {
    onConfirm({
      address: address.main || 'Rangpur',
      fullAddress: address.full || 'Rangpur, Bangladesh',
      subAddress: address.sub || 'Rangpur City',
      coords: centerCoords
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="loc-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="loc-modal">
        {/* Header */}
        <div className="loc-modal-header">
          <h2>{language === 'BN' ? 'ডেলিভারি লোকেশন সেট করুন' : 'Set delivery location'}</h2>
          <button className="loc-modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Map */}
        <div className="loc-map-wrap">
          <div id="loc-map-canvas" />

          {/* Fixed center pin */}
          <div className={`loc-center-pin ${isMoving ? 'is-moving' : ''}`}>
            <svg viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 0C8.954 0 0 8.954 0 20c0 15 20 32 20 32s20-17 20-32C40 8.954 31.046 0 20 0z" fill="#E65100"/>
              <circle cx="20" cy="19" r="8" fill="#fff"/>
              <circle cx="20" cy="19" r="4" fill="#E65100"/>
            </svg>
          </div>

          {/* GPS button */}
          <button
            className={`loc-gps-btn ${gpsLoading ? 'is-loading' : ''}`}
            onClick={handleGPS}
            title={language === 'BN' ? 'আমার অবস্থান' : 'Use my location'}
          >
            <CrosshairIcon size={20} />
          </button>
        </div>

        {/* Bottom card */}
        <div className="loc-bottom-card">
          <div className="loc-address-row">
            <div className="loc-address-icon">
              <LocationIcon size={18} />
            </div>
            <div className="loc-address-text">
              {isGeocoding ? (
                <div className="loc-address-loading">
                  <div className="loc-spinner" />
                  <span>{language === 'BN' ? 'ঠিকানা খুঁজছি...' : 'Finding address...'}</span>
                </div>
              ) : (
                <>
                  <p className="loc-address-main">{address.main || (language === 'BN' ? 'লোকেশন নির্বাচন করুন' : 'Select a location')}</p>
                  <p className="loc-address-sub">{address.sub || ''}</p>
                </>
              )}
            </div>
          </div>

          <button
            className="loc-confirm-btn"
            onClick={handleConfirm}
            disabled={isGeocoding || !address.main}
          >
            <CheckIcon size={18} />
            {language === 'BN' ? 'এই লোকেশন নিশ্চিত করুন' : 'Confirm this location'}
          </button>
        </div>
      </div>
    </div>
  );
}
