import mixpanel from 'mixpanel-browser';

type EventProperties = Record<string, string | number | boolean | null | undefined>;

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'ba825f5e38a7350fa16056217a546586';
let initialized = false;
let lastTrackedPath = '';

const cleanProperties = (properties: EventProperties = {}) =>
  Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined));

const getPageType = (path: string) => {
  if (path === '/') return 'home';
  if (path === '/lab') return 'lab';
  if (path.includes('/analysis')) return 'salt_analysis';
  if (path.includes('/flow')) return 'flow_diagram';
  if (path.startsWith('/category/')) return 'category';
  return 'other';
};

export const initMixpanel = () => {
  if (typeof window === 'undefined' || initialized) return;

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: false,
    persistence: 'localStorage',
  });
  mixpanel.register({
    app: 'Salt Analysis',
    environment: process.env.NODE_ENV,
  });
  initialized = true;
};

export const trackEvent = (name: string, properties: EventProperties = {}) => {
  if (typeof window === 'undefined') return;
  if (!initialized) initMixpanel();

  try {
    mixpanel.track(name, cleanProperties(properties));
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Mixpanel event failed: ${name}`, error);
    }
  }
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;

  const parsed = new URL(url, window.location.origin);
  const path = parsed.pathname;
  if (path === lastTrackedPath) return;
  lastTrackedPath = path;

  const campaignProperties = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].reduce<EventProperties>(
    (properties, key) => {
      const value = parsed.searchParams.get(key);
      if (value) properties[key] = value;
      return properties;
    },
    {}
  );

  trackEvent('Page Viewed', {
    page_path: path,
    page_type: getPageType(path),
    page_title: document.title,
    referrer: document.referrer || undefined,
    ...campaignProperties,
  });
};
