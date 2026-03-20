import React from 'react';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  image?: string; // Optional as some use imageColor/logo
  coverImage?: string;
  price: number;
  oldPrice?: number; // Changed from originalPrice to match data
  rating: number;
  reviews: number;
  category: string;
  tags?: string[];
  features?: string[];
  imageColor?: string;
  logo?: string;
  logoType?: 'text' | 'image' | 'svg';
  imageText?: { main: string; sub: string };
  platform?: string;
  inStock?: boolean;
  viewingCount?: number;
  description?: {
    bullets: string[];
    sections: { title: string; text: string }[];
  };
  activationGuide?: {
    steps: string[];
    note: string;
  };
  systemRequirements?: Record<string, string>;
  keys?: string[]; // For admin to manage keys
}

export interface Testimonial {
  id: string;
  logo: string; // URL or name of company
  rating: number;
  text: string;
  author: string;
  handle: string;
}

export interface NavItem {
  label: string;
  icon?: React.ReactNode;
  hasDropdown?: boolean;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  imageColor: string;
  logo: string; // URL or text
  quantity: number;
}

export interface WishlistItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  imageColor: string;
  logo: string;
}