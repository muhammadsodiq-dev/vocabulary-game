/**
 * Barcha backend so'rovlari shu yerdan o'tadi.
 * api.request('GET', CONFIG.ENDPOINTS.lessons)
 * api.request('POST', CONFIG.ENDPOINTS.login, { email, password })
 */
const api = {
  async request(method, path, body, opts = {}) {
    const url = CONFIG.API_BASE_URL + path;
    const headers = { 'Content-Type': 'application/json' };
    const token = Auth.getToken();
    if (token && !opts.noAuth) headers['Authorization'] = `Bearer ${token}`;

    let res;
    try {
      res = await fetch(url, {
        method,
        headers,
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch (networkErr) {
      throw new ApiError(
        0,
        "Serverga ulanib bo'lmadi. Backend manzili (CONFIG.API_BASE_URL) va tarmoq ulanishini tekshiring."
      );
    }

    if (res.status === 204) return null;

    let data = null;
    const text = await res.text();
    if (text) {
      try { data = JSON.parse(text); } catch (e) { data = text; }
    }

    if (!res.ok) {
      const message =
        (data && (data.message || data.error || data.detail)) ||
        `So'rov bajarilmadi (${res.status})`;
      throw new ApiError(res.status, message, data);
    }

    // Ba'zi backendlar xatoni HTTP 200 bilan, lekin javob ichida
    // success:false / status:"error" ko'rinishida qaytaradi — shuni ham ushlaymiz.
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const failed = data.success === false || data.status === 'error' || data.status === 'ERROR';
      if (failed) {
        const message = data.message || data.error || data.detail || "So'rov muvaffaqiyatsiz bo'ldi.";
        throw new ApiError(res.status, message, data);
      }
    }

    return data;
  },

  get(path, opts) { return this.request('GET', path, undefined, opts); },
  post(path, body, opts) { return this.request('POST', path, body, opts); },
  put(path, body, opts) { return this.request('PUT', path, body, opts); },
  patch(path, body, opts) { return this.request('PATCH', path, body, opts); },
  delete(path, opts) { return this.request('DELETE', path, undefined, opts); },
};

class ApiError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
