// api.ts - Fetch API wrapper with interceptors and error handling

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Get auth token from localStorage
const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

// Request interceptor - adds auth token and default headers
const buildHeaders = (customHeaders?: HeadersInit): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const token = getToken();
  if (token) {
    (headers as Record<string, string>).Authorization = `Bearer ${token}`;
  }

  return headers;
};

// Response interceptor - handles errors globally
const handleResponse = async (response: Response): Promise<any> => {
  // Handle different status codes
  if (!response.ok) {
    let errorMessage = "An error occurred";
    let errorData = null;

    try {
      errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }

    // Handle specific status codes
    switch (response.status) {
      case 401:
        // Unauthorized - clear token and redirect to login
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/auth/login";
        }
        throw new ApiError("Unauthorized. Please login again.", 401, errorData);
      case 403:
        throw new ApiError("Access forbidden", 403, errorData);
      case 404:
        throw new ApiError("Resource not found", 404, errorData);
      case 500:
        throw new ApiError("Server error. Please try again later.", 500, errorData);
      default:
        throw new ApiError(errorMessage, response.status, errorData);
    }
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  return await response.text();
};

// Base fetch wrapper with interceptors
const fetchWithInterceptors = async (
  url: string,
  options: RequestInit = {}
): Promise<any> => {
  const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;

  const config: RequestInit = {
    ...options,
    headers: buildHeaders(options.headers as HeadersInit),
  };

  try {
    const response = await fetch(fullUrl, config);
    return await handleResponse(response);
  } catch (error) {
    // Handle network errors
    if (error instanceof ApiError) {
      throw error;
    }

    // Network or other errors
    throw new ApiError(
      error instanceof Error ? error.message : "Network error. Please check your connection.",
      0
    );
  }
};

// API Helper Functions

/**
 * GET request
 * @param url - API endpoint (relative to baseURL or full URL)
 * @param options - Optional fetch options
 */
export const get = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  return fetchWithInterceptors(url, {
    ...options,
    method: "GET",
  });
};

/**
 * POST request
 * @param url - API endpoint (relative to baseURL or full URL)
 * @param data - Request body data
 * @param options - Optional fetch options
 */
export const post = async <T = any>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> => {
  return fetchWithInterceptors(url, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PUT request
 * @param url - API endpoint (relative to baseURL or full URL)
 * @param data - Request body data
 * @param options - Optional fetch options
 */
export const put = async <T = any>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> => {
  return fetchWithInterceptors(url, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PATCH request
 * @param url - API endpoint (relative to baseURL or full URL)
 * @param data - Request body data
 * @param options - Optional fetch options
 */
export const patch = async <T = any>(
  url: string,
  data?: any,
  options?: RequestInit
): Promise<T> => {
  return fetchWithInterceptors(url, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * DELETE request
 * @param url - API endpoint (relative to baseURL or full URL)
 * @param options - Optional fetch options
 */
export const del = async <T = any>(url: string, options?: RequestInit): Promise<T> => {
  return fetchWithInterceptors(url, {
    ...options,
    method: "DELETE",
  });
};

// Export API base URL for reference
export { API_BASE_URL };
