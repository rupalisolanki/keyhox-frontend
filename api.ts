const BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

async function req<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || data.errors?.[0]?.msg || 'Request failed');
  return data;
}

// Auth
export const apiLogin = (email: string, password: string) =>
  req<{ token: string; user: any }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const apiRegister = (name: string, email: string, password: string) =>
  req<{ token: string; user: any }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });

export const apiGetMe = () => req<{ user: any }>('/users/me');

// Products (public)
export const apiGetProducts = () => req<{ products: any[]; total: number }>('/products');
export const apiGetProductBySlug = (slug: string) => req<{ product: any }>(`/products/${slug}`);

// Products (admin)
export const apiGetAdminProducts = () => req<{ products: any[] }>('/admin/products');

export const apiCreateProduct = async (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'imageUrl' && data[key]?.startsWith('data:image/')) {
      // Convert base64 to File
      const blob = dataURLtoBlob(data[key]);
      formData.append('image', blob, 'product-image.png');
    } else if (key === 'description' || key === 'activationGuide' || key === 'systemRequirements') {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  
  const token = getToken();
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Failed to create product');
  return result;
};

export const apiUpdateProduct = async (id: string, data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    if (key === 'imageUrl' && data[key]?.startsWith('data:image/')) {
      const blob = dataURLtoBlob(data[key]);
      formData.append('image', blob, 'product-image.png');
    } else if (key === 'description' || key === 'activationGuide' || key === 'systemRequirements') {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== undefined && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });
  
  const token = getToken();
  const res = await fetch(`${BASE}/products/${id}`, {
    method: 'PUT',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Failed to update product');
  return result;
};

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) u8arr[n] = bstr.charCodeAt(n);
  return new Blob([u8arr], { type: mime });
}

export const apiDeleteProduct = (id: string) =>
  req<{ message: string }>(`/products/${id}`, { method: 'DELETE' });

// Keys (admin)
export const apiAddKeys = (productId: string, keys: string[]) =>
  req<any>(`/products/${productId}/keys`, { method: 'POST', body: JSON.stringify({ keys }) });
export const apiGetKeysByProduct = (productId: string, status?: string) =>
  req<any>(`/products/${productId}/keys${status ? `?status=${status}` : ''}`);
export const apiDeleteKey = (keyId: string) =>
  req<any>(`/keys/${keyId}`, { method: 'DELETE' });
export const apiGetInventory = () => req<any>('/admin/inventory');
