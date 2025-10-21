/**
 * Class representing a network service for making HTTP requests.
 */
let __globalPendingRequests = 0;
let __spinnerStylesInjected = false;

function __injectSpinnerStyles(): void {
  if (__spinnerStylesInjected) return;
  const style = document.createElement('style');
  style.id = 'xployt-global-spinner-styles';
  style.textContent = `@keyframes xployt-spin { to { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
  __spinnerStylesInjected = true;
}

function __showGlobalOverlay(): void {
  if (document.getElementById('xployt-global-loading-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'xployt-global-loading-overlay';
  overlay.setAttribute('style', [
    'position:fixed',
    'inset:0',
    'background:rgba(0,0,0,0.25)',
    'display:flex',
    'align-items:center',
    'justify-content:center',
    'z-index:2147483647',
    'pointer-events:all'
  ].join(';'));

  const spinner = document.createElement('div');
  spinner.setAttribute('style', [
    'width:48px',
    'height:48px',
    'border:4px solid rgba(255,255,255,0.4)',
    'border-top-color:#ffffff',
    'border-radius:50%',
    'animation:xployt-spin 1s linear infinite'
  ].join(';'));

  overlay.appendChild(spinner);
  document.body.appendChild(overlay);
}

function __hideGlobalOverlay(): void {
  const overlay = document.getElementById('xployt-global-loading-overlay');
  if (overlay && overlay.parentNode) {
    overlay.parentNode.removeChild(overlay);
  }
}

function __incrementGlobalSpinner(): void {
  __globalPendingRequests += 1;
  if (__globalPendingRequests === 1) {
    __injectSpinnerStyles();
    __showGlobalOverlay();
  }
}

function __decrementGlobalSpinner(): void {
  __globalPendingRequests = Math.max(0, __globalPendingRequests - 1);
  if (__globalPendingRequests === 0) {
    __hideGlobalOverlay();
  }
}

function __ensureErrorBanner(message: string): void {
  let banner = document.getElementById('xployt-global-error-banner') as HTMLDivElement | null;
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'xployt-global-error-banner';
    banner.setAttribute('style', [
      'position:fixed',
      'top:12px',
      'left:50%'
      ,'transform:translateX(-50%)',
      'background:#ef4444',
      'color:#ffffff',
      'padding:6px 10px',
      'border-radius:6px',
      'box-shadow:0 2px 6px rgba(0,0,0,0.25)',
      'font-size:14px',
      'z-index:2147483647',
      'display:flex',
      'align-items:center',
      'gap:8px',
      'opacity:0.9',
      'min-width:400px',
      'max-width:90%'
    ].join(';'));

    const text = document.createElement('div');
    text.id = 'xployt-global-error-banner-text';
    text.setAttribute('style', 'flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; opacity:0.95');

    const close = document.createElement('button');
    close.setAttribute('style', [
      'all:unset',
      'cursor:pointer',
      'color:#ffffff',
      'opacity:0.95',
      'font-size:16px',
      'line-height:1',
      'padding:0 4px'
    ].join(';'));
    close.textContent = '✕';
    close.addEventListener('click', () => {
      const el = document.getElementById('xployt-global-error-banner');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });

    banner.appendChild(text);
    banner.appendChild(close);
    document.body.appendChild(banner);
  }
  const textEl = document.getElementById('xployt-global-error-banner-text');
  if (textEl) textEl.textContent = message;
}

function __formatErrorMessage(error: any, method: string, url: string): string {
  if (error && typeof error === 'object') {
    const parts: string[] = [];
    if ((error as any).message) parts.push(String((error as any).message));
    if ((error as any).errorDescription) parts.push(String((error as any).errorDescription));
    if (parts.length) return parts.join(' - ');
  }
  return `${method} ${url} failed`;
}

class Network {
  baseURL: string;
  private cache: Map<string, { valid: boolean; response: any }> = new Map();

  /**
   * Creates an instance of Network.
   *
   * @param {string} baseURL - The base URL for the network requests.
   */
  constructor(baseURL: string) {
    this.baseURL = 'http://' + baseURL;
  }

  /**
   * Sends an HTTP request using XMLHttpRequest.
   *
   * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
   * @param {string} url - The URL endpoint for the request.
   * @param {object} [data={}] - The data to be sent with the request.
   * @returns {Promise<any>} A promise that resolves with the response data.
   */
  public sendHttpRequest(
    method: string,
    url: string,
    data: any = {},
    type: string = 'application/json'
  ): Promise<any> {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    return new Promise((resolve, reject) => {
      // Validate method and URL
      if (!['GET', 'POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
        return reject(new NetworkError(0, url, null, 'Invalid HTTP method'));
      }
      if (!url || typeof url !== 'string') {
        return reject(new NetworkError(0, url, null, 'Invalid URL'));
      }

      console.log(`Sending ${method} request to ${url}`);
      xhr.open(method, this.baseURL + url);

      if (type !== 'multipart/form-data') {
        xhr.setRequestHeader('Content-Type', type);
      }

      // Add authentication token if available
      const token = localStorage.getItem('xployt_token');
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }

      xhr.onload = () => {
        console.log(`Request to ${url} completed with status: ${xhr.status}`);
        // console.log(xhr.response);
        if (xhr.status >= 400) {
          // console.log('> 400');
          reject(new NetworkError(xhr.status, url, xhr.response));
        } else {
          try {
            const response = xhr.response ? JSON.parse(xhr.response) : null;
            // console.log('response', response);
            if (method === 'GET') {
              this.cache.set(url, { valid: true, response });
            }
            resolve(response);
          } catch (e) {
            reject(new NetworkError(xhr.status, url, null, 'Failed to parse JSON response'));
          }
        }
      };

      xhr.onerror = event => {
        console.log('XHR request failed: ' + event.type);
        reject(new NetworkError(xhr.status, url, null, `XHR request failed: ${event.type}`));
      };

      if (type === 'application/json') {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  }

  private recognizedOptions = [
    'showLoading',
    'handleError',
    'throwError',
    'showSuccess',
    'successCallback',
    'localLoading',
    'elementId',
    'dataTransferType',
  ]; // Added new options

  private normalizeOptions(options: any): {
    showLoading: boolean;
    handleError: boolean;
    throwError: boolean;
    showSuccess: boolean;
    successCallback: () => void;
    localLoading: boolean;
    elementId: string | null;
    dataTransferType: string;
  } {
    const defaultOptions = {
      showLoading: true,
      handleError: true,
      throwError: true,
      showSuccess: false,
      successCallback: () => {},
      localLoading: false,
      elementId: null,
      dataTransferType: 'application/json',
    };

    // Check if any unrecognized option is set
    Object.keys(options).forEach(key => {
      if (!this.recognizedOptions.includes(key)) {
        console.error(`Unrecognized option in network options`);
        throw new Error(`Unrecognized option`);
      }
      // console.log('key was good:', key);
    });

    return { ...defaultOptions, ...options }; // Merge with defaults
  }

  private async handleRequest(
    method: string,
    url: string,
    data: any = {},
    options: any = {}
  ): Promise<any> {
    let normalizedOptions: any;
    try {
      normalizedOptions = this.normalizeOptions(options);
      // console.log('normalizedOptions', normalizedOptions);
    } catch (error: any) {
      console.error(`Error catched in handleRequest: ${method}:`, error);
      throw error;
    }

    if (method === 'GET' && this.cache.has(url) && this.cache.get(url)?.valid) {
      return this.cache.get(url)?.response;
    }

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      this.cache.delete(url);
    }

    const shouldShowGlobalLoading = !!normalizedOptions.showLoading;
    if (shouldShowGlobalLoading) {
      __incrementGlobalSpinner();
    }

    try {
      const response = await this.sendHttpRequest(
        method,
        url,
        data,
        normalizedOptions.dataTransferType
      );

      if (normalizedOptions.successCallback && !normalizedOptions.showSuccess) {
        normalizedOptions.successCallback();
      }
      return response;
    } catch (error: any) {
      console.error(`Error catched in handleRequest: ${method}:`, error);
      try {
        __ensureErrorBanner(__formatErrorMessage(error, method, url));
      } catch (_) {}
      if (normalizedOptions.handleError) {
        if (normalizedOptions.throwError) {
          throw error;
        }
      } else {
        throw error;
      }
    } finally {
      if (shouldShowGlobalLoading) {
        __decrementGlobalSpinner();
      }
    }
  }

  public async get(url: string, options: any = {}): Promise<any> {
    return this.handleRequest('GET', url, {}, options);
  }

  public async post(url: string, data: any, options: any = {}): Promise<any> {
    return this.handleRequest('POST', url, data, options);
  }

  public async put(url: string, data: any, options: any = {}): Promise<any> {
    return this.handleRequest('PUT', url, data, options);
  }

  /**
   * Sends a DELETE request to the server.
   *
   * @param {string} url - The URL endpoint for the request.
   * @param {any} [options] - Additional options for the request.
   * @param {boolean} [options.successCallback] - A callback function to be called if the request is successful.
   * @param {string} [options.elementId] - The ID of the element to show a local loading screen.
   * @returns {Promise<any>} A promise that resolves with the response data.
   */
  public async delete(url: string, options: any = {}): Promise<any> {
    return this.handleRequest('DELETE', url, {}, options);
  }

  /**
   * Open a Server-Sent Events (SSE) connection to the given path.
   * - Accepts either an absolute URL or a path that will be appended to this.baseURL
   * - Will automatically append a token query param if one exists in localStorage
   * - Returns the raw EventSource so callers can attach listeners as needed
   *
   * @param {string} pathOrUrl - Absolute URL or path (e.g. '/scan-collections/:id/stream')
   * @param {{[key:string]:string}} [queryParams] - Additional query params to add to the URL
   * @param {{onOpen?:()=>void, onMessage?:(e:MessageEvent)=>void, onError?:(e:any)=>void, events?: {[eventName:string]:(e:MessageEvent)=>void}}} [handlers]
   * @param {number} [idleTimeoutMs] - If set, will close the connection when no messages are received for this interval (ms)
   * @returns {EventSource}
   */
  public openEventSource(
    pathOrUrl: string,
    queryParams: { [key: string]: string } = {},
    handlers: {
      onOpen?: () => void;
      onMessage?: (e: MessageEvent) => void;
      onError?: (e: any) => void;
      events?: { [eventName: string]: (e: MessageEvent) => void };
    } = {},
    idleTimeoutMs: number = 60_000
  ): EventSource {
    // Build base URL
    const isAbsolute = /^https?:\/\//i.test(pathOrUrl);
    let url = isAbsolute ? pathOrUrl : this.baseURL + pathOrUrl;

    // Prefer tokens used elsewhere in the app; include as query param because EventSource cannot set headers
    const token = localStorage.getItem('access_token') || localStorage.getItem('xployt_token');

    const params = new URLSearchParams(queryParams as Record<string, string>);
    if (token && !params.has('token')) {
      params.set('token', token);
    }

    const separator = url.includes('?') ? '&' : '?';
    url = params.toString() ? `${url}${separator}${params.toString()}` : url;

    const source = new EventSource(url);

    // Watchdog to close connection if idle for too long
    let lastMessageTime = Date.now();
    let checkInterval: number | undefined;

    if (idleTimeoutMs > 0) {
      checkInterval = window.setInterval(() => {
        if (Date.now() - lastMessageTime > idleTimeoutMs) {
          console.warn('SSE idle timeout reached — closing connection for', url);
          try {
            source.close();
          } catch (e) {
            // ignore
          }
          if (checkInterval) clearInterval(checkInterval);
        }
      }, Math.max(10_000, Math.floor(idleTimeoutMs / 6)));
    }

    source.onopen = () => {
      lastMessageTime = Date.now();
      handlers.onOpen?.();
    };

    const handleMessage = (e: MessageEvent) => {
      lastMessageTime = Date.now();
      handlers.onMessage?.(e);
    };

    source.onmessage = handleMessage;

    // attach any custom named events
    if (handlers.events) {
      Object.keys(handlers.events).forEach((ev) => {
        source.addEventListener(ev, (e: MessageEvent) => {
          lastMessageTime = Date.now();
          handlers.events![ev](e);
        });
      });
    }

    source.onerror = (err) => {
      handlers.onError?.(err);
      // Close if server closed connection
      source.close();
    };

    // When closed explicitly by caller, clear watchdog
    const originalClose = source.close.bind(source);
    (source as any).close = () => {
      try {
        originalClose();
      } finally {
        if (checkInterval) clearInterval(checkInterval);
      }
    };

    return source;
  }

  invalidateCache(url: string): void {
    console.log('invalidating cache for', url);
    try {
      const regex = new RegExp(url);
      console.log('regex', regex);
      const keysToInvalidate = Array.from(this.cache.keys()).filter(cacheUrl =>
        regex.test(cacheUrl)
      );
      console.log('keysToInvalidate', keysToInvalidate);
      keysToInvalidate.forEach(key => this.cache.delete(key));
    } catch (error) {
      console.error('Error invalidating cache:', error);
    }
  }
}

/**
 * Interface representing a network response.
 */
export interface Response {
  is_successful: boolean;
  data?: object;
  error?: string;
  trace?: string;
}

/**
 * Class representing a network error.
 */
export class NetworkError {
  statusCode: number;
  url: string;
  errorDescription?: string;
  stackTrace?: string;
  message?: string;

  servlet?: string; // The servlet that handled the request
  uri?: string; // The URI of the request
  code?: string; // The code of the error
  data?: any; // The data from the server

  /**
   * Creates an instance of NetworkError.
   *
   * @param {number} statusCode - The HTTP status code of the error.
   * @param {string} url - The URL that caused the error.
   * @param {any} [data] - Additional data about the error.
   * @param {string} [message] - An optional error message.
   */
  constructor(statusCode: number, url: string, data?: any, message?: string) {
    this.statusCode = statusCode;
    this.url = url;
    this.message = message;
    // console.log('data', data);
    if (data) {
      try {
        if (typeof data === 'string') {
          // console.log('Data is a string. Attempting to parse as JSON...');
          data = JSON.parse(data); // Parse the JSON string into an object
        }

        this.errorDescription = data['error'];
        this.stackTrace = data['trace'];
        this.message = data['message'];
        // this.uri = data['uri'];
        this.code = data['code'];
        this.servlet = data['servletClass'];
        this.data = data['data'];
        // console.log('this.data', this.data);
        // console.log('this.message', this.message);
        // console.log('this.errorDescription', this.errorDescription);
        // console.log('this.stackTrace', this.stackTrace);
        // console.log('this.uri', this.uri);
        // console.log('this.code', this.code);
        // console.log('this.servlet', this.servlet);
      } catch (e: any) {
        this.stackTrace = e.stack;
        this.errorDescription = 'Failed to extract data from network error: ' + e.message;
      }
    }
  }

  /**
   * Returns a string representation of the network error.
   *
   * @returns {string} A string describing the network error.
   */
  toString(): string {
    return `Status Code: ${this.statusCode}\n
        URL: ${this.url}\n
        Description: ${this.errorDescription || 'No description'}\n
        StackTrace: ${this.stackTrace || 'No stack trace'}\n
        Message: ${this.message || 'No message'}`;
  }
}

const NETWORK = new Network('localhost:8000/api/v1');
export default NETWORK;
