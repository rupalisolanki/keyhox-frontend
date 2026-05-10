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
export const apiCreateProduct = (data: any) =>
  req<{ product: any }>('/products', { method: 'POST', body: JSON.stringify(data) });
export const apiUpdateProduct = (id: string, data: any) =>
  req<{ product: any }>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) });
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
