import mixpanel from 'mixpanel-browser';

export const initMixpanel = () => {
  if (typeof window !== 'undefined') {
    mixpanel.init('ba825f5e38a7350fa16056217a546586', {
      debug: process.env.NODE_ENV === 'development',
      track_pageview: true,
      persistence: 'localStorage',
    });
  }
};

export const trackPageView = (path: string) => {
  mixpanel.track('Page View', {
    path,
  });
};
