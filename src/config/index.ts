export default {
  apiRoot: process.env.GATEWAY_URI as string,
  environment: process.env.NODE_ENV as string,

  storageKeys: {
    auth: 'cyber_vet', // storing data in local storage
  },
};
