'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// Reverse geocode via Nominatim (free, no API key)
// zoom=18 forces building/neighbourhood-level detail
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&zoom=18&accept-language=en`,
      { headers: { 'User-Agent': 'BazaarBee/1.0' } }
    );
    const data = await res.json();
    if (data && data.address) {
      const a = data.address;
      // Priority: neighbourhood → suburb → quarter → residential → village → hamlet → road
      const area =
        a.neighbourhood ||
        a.suburb ||
        a.quarter ||
        a.residential ||
        a.allotments ||
        a.village ||
        a.hamlet ||
        '';
      const road = a.road || a.pedestrian || a.footway || a.path || '';

      // Strip administrative suffixes: "Rangpur Metropolitan City" → "Rangpur"
      const cityRaw = a.city || a.town || a.municipality || '';
      const city = cityRaw
        .replace(/\s*Metropolitan City\s*/gi, '')
        .replace(/\s*City Corporation\s*/gi, '')
        .trim() || 'Rangpur';

      const main = area || road || a.city_district || city;
      const subParts = [
        area && road ? road : '',
        a.city_district || '',
        city,
        a.postcode || ''
      ].filter(Boolean);
      const sub = subParts.join(', ');
      return { address: main, subAddress: sub, fullAddress: data.display_name || sub };
    }
  } catch (e) {
    console.warn('Nominatim geocode failed:', e);
  }
  return { address: 'Rangpur', subAddress: 'Rangpur City', fullAddress: 'Rangpur, Bangladesh' };
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Delivery location state
  const [deliveryAddress, setDeliveryAddress] = useState('Rangpur');
  const [deliverySubAddress, setDeliverySubAddress] = useState('Rangpur City');
  const [deliveryFullAddress, setDeliveryFullAddress] = useState('Rangpur, Bangladesh');
  const [deliveryCoords, setDeliveryCoords] = useState({ lat: 25.7439, lng: 89.2752 });

  // Load cart + location from localStorage, then auto-detect GPS
  useEffect(() => {
    // Cart
    const stored = localStorage.getItem('bazaarbee_cart');
    if (stored) {
      try { setCartItems(JSON.parse(stored)); } catch (e) { /* ignore */ }
    }

    // Saved location
    const savedLoc = localStorage.getItem('bazaarbee_location_v2');
    if (savedLoc) {
      try {
        const loc = JSON.parse(savedLoc);
        setDeliveryAddress(loc.address || 'Rangpur');
        setDeliverySubAddress(loc.subAddress || 'Rangpur City');
        setDeliveryFullAddress(loc.fullAddress || 'Rangpur, Bangladesh');
        setDeliveryCoords(loc.coords || { lat: 25.7439, lng: 89.2752 });
      } catch (e) { /* ignore */ }
    } else {
      // First visit: auto-detect via GPS + Nominatim
      if (typeof window !== 'undefined' && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const result = await reverseGeocode(latitude, longitude);
            const loc = {
              address: result.address,
              subAddress: result.subAddress,
              fullAddress: result.fullAddress,
              coords: { lat: latitude, lng: longitude }
            };
            setDeliveryAddress(loc.address);
            setDeliverySubAddress(loc.subAddress);
            setDeliveryFullAddress(loc.fullAddress);
            setDeliveryCoords(loc.coords);
            localStorage.setItem('bazaarbee_location_v2', JSON.stringify(loc));
          },
          null,
          { timeout: 5000 }
        );
      }
    }

    setIsLoaded(true);
  }, []);

  // Persist cart
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bazaarbee_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoaded]);

  // Called from LocationPickerModal onConfirm
  const setDeliveryLocation = ({ address, subAddress, fullAddress, coords }) => {
    setDeliveryAddress(address || 'Rangpur');
    setDeliverySubAddress(subAddress || 'Rangpur City');
    setDeliveryFullAddress(fullAddress || 'Rangpur, Bangladesh');
    setDeliveryCoords(coords || { lat: 25.7439, lng: 89.2752 });
    localStorage.setItem('bazaarbee_location_v2', JSON.stringify({
      address, subAddress, fullAddress, coords
    }));
  };

  // Cart CRUD
  const addItem = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.sku === item.sku);
      if (existing) {
        return prev.map((x) => x.sku === item.sku ? { ...x, quantity: x.quantity + 1 } : x);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (sku) => {
    setCartItems((prev) => prev.filter((x) => x.sku !== sku));
  };

  const updateQuantity = (sku, quantity) => {
    if (quantity <= 0) { removeItem(sku); return; }
    setCartItems((prev) => prev.map((x) => (x.sku === sku ? { ...x, quantity } : x)));
  };

  const clearCart = () => setCartItems([]);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalMrp = cartItems.reduce((sum, item) => sum + item.mrp * item.quantity, 0);
  const savings = totalMrp - subtotal;
  const deliveryCharge = subtotal > 1000 ? 0 : 50;
  const total = subtotal + deliveryCharge;

  return (
    <CartContext.Provider value={{
      cartItems, addItem, removeItem, updateQuantity, clearCart,
      subtotal, totalMrp, savings, deliveryCharge, total, isLoaded,
      deliveryAddress, deliverySubAddress, deliveryFullAddress, deliveryCoords,
      setDeliveryLocation
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
