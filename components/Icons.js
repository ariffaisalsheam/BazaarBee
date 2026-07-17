'use client';

import React from 'react';

// Common outline styling parameters
const baseProps = (size = 24, strokeWidth = 2) => ({
  xmlns: "http://www.w3.org/2000/svg",
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: strokeWidth,
  strokeLinecap: "round",
  strokeLinejoin: "round",
});

// Navigation Icons
export const HomeIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const OrderIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </svg>
);

export const CartIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);

// Input Controls
export const SearchIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const CloseIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const CheckIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// Checkout & Forms
export const ClipboardIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </svg>
);

export const CashIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="20" height="12" x="2" y="6" rx="2" />
    <circle cx="12" cy="12" r="2" />
    <path d="M6 12h.01M18 12h.01" />
  </svg>
);

export const PhoneIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

// Tracking Info
export const LocationIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ClockIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const TruckIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M14 18H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8M14 2v16" />
    <path d="M14 9h4l4 4v5h-8" />
    <circle cx="7.5" cy="18.5" r="2.5" />
    <circle cx="17.5" cy="18.5" r="2.5" />
  </svg>
);

// Trust Badges
export const StarIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const ShieldIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const MoneyIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <line x1="12" x2="12" y1="1" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export const CalendarIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

// Category Specific Icons
export const RiceIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M12 2C8 6 6 11 6 15c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2-9-6-13z" />
    <path d="M12 6v10" />
    <path d="M9 10c2-1 4-1 6 0" />
    <path d="M9 13c2-1 4-1 6 0" />
  </svg>
);

export const FlourIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M6 3h12l3 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
    <path d="M3 10h18" />
    <ellipse cx="12" cy="16" rx="4" ry="2" />
  </svg>
);

export const OilIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M10 2h4v3h-4z" />
    <path d="M6 9h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2z" />
    <path d="M8 9V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" />
    <circle cx="12" cy="16" r="3" />
  </svg>
);

export const LentilsIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M2 12a10 10 0 0 0 20 0H2z" />
    <path d="M12 2v10" />
    <circle cx="7" cy="8" r="1.5" />
    <circle cx="17" cy="8" r="1.5" />
  </svg>
);

export const SaltIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M9 3h6v3H9z" />
    <path d="M6 10c.8-1.5 2-3 4-4h4c2 1 3.2 2.5 4 4v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
    <circle cx="9.5" cy="10.5" r="0.5" />
    <circle cx="12" cy="11.5" r="0.5" />
    <circle cx="14.5" cy="10.5" r="0.5" />
    <circle cx="12" cy="14.5" r="0.5" />
  </svg>
);

export const SugarIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="10" height="10" x="7" y="7" rx="2" transform="rotate(45 12 12)" />
    <path d="m3 3 5 5M21 3l-5 5M3 21l5-5M21 21l-5-5" />
  </svg>
);

export const TeaIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <path d="M6 2v2M10 2v2M14 2v2" />
  </svg>
);

export const BiscuitsIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="9" r="1.5" />
    <circle cx="12" cy="7" r="1.5" />
    <circle cx="16" cy="10" r="1.5" />
    <circle cx="14" cy="14" r="1.5" />
    <circle cx="9" cy="15" r="1.5" />
  </svg>
);

export const NoodlesIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M2 12a10 10 0 0 0 20 0H2z" />
    <path d="M12 12c.5-5 2.5-8 4-10" />
    <path d="M10 12C9.5 7.5 7.5 4.5 6 2" />
    <path d="M7 12c-.5-3.5 1.5-7.5 3-10" />
  </svg>
);

export const BeveragesIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="10" height="18" x="7" y="4" rx="2" />
    <path d="M11 2h2v2h-2z" />
    <path d="M14 7h.01M10 11h.01M14 15h.01" />
  </svg>
);

export const PersonalCareIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M8 8h8v12a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2Z" />
    <path d="M12 2v6" />
    <path d="M9 5h6" />
    <path d="M12 13h.01M12 17h.01" />
  </svg>
);

export const HomeCareIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M12 2 2 12h3v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8h3Z" />
    <rect width="6" height="6" x="9" y="12" rx="1" />
  </svg>
);

export const BabyCareIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <path d="M12 2v6" />
    <path d="M9 8h6l-1 10a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2Z" />
    <circle cx="12" cy="4" r="2" />
  </svg>
);

export const HealthIcon = ({ size = 24, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <line x1="12" x2="12" y1="8" y2="16" />
    <line x1="8" x2="16" y1="12" y2="12" />
  </svg>
);

export const CrosshairIcon = ({ size = 20, strokeWidth = 2 }) => (
  <svg {...baseProps(size, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <line x1="12" x2="12" y1="1" y2="5" />
    <line x1="12" x2="12" y1="19" y2="23" />
    <line x1="1" x2="5" y1="12" y2="12" />
    <line x1="19" x2="23" y1="12" y2="12" />
  </svg>
);
