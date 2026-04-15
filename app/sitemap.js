const baseUrl = 'https://anikage.dpdns.org';

const staticRoutes = [
          '',
          '/app-download',
          '/az-list',
          '/completed',
          '/dubbed-anime',
          '/filter',
          '/login',
          '/most-favorite',
          '/most-popular',
          '/movies',
          '/ona',
          '/ova',
          '/profile',
          '/recently-added',
          '/recently-updated',
          '/search',
          '/signup',
          '/special',
          '/subbed-anime',
          '/top-airing',
          '/top-upcoming',
          '/tv-series',
];

export default function sitemap() {
          const lastModified = new Date();

          return staticRoutes.map((route) => ({
                    url: `${baseUrl}${route}`,
                    lastModified,
          }));
}
