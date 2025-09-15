import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'https://be-erp-category-client.onrender.com',
  apiVersion: 'v1'
};
