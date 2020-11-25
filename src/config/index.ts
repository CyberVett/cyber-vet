export default {
  apiRoot: process.env.GATEWAY_URI as string,
  environment: process.env.NODE_ENV as string,
  reset_url: process.env.RESET_URL as string,
  
  storageKeys: {
    auth: 'cyber_vet', // storing data in local storage
  },
};
