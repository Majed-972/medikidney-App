const appJson = require('./app.json');

const { expo } = appJson;
const { android = {}, extra = {}, owner, ...restExpo } = expo;
const { googleServicesFile: _googleServicesFile, ...restAndroid } = android;

module.exports = {
  expo: {
    ...restExpo,
    android: {
      ...restAndroid,
      ...(process.env.GOOGLE_SERVICES_FILE
        ? { googleServicesFile: process.env.GOOGLE_SERVICES_FILE }
        : {}),
    },
    extra: {
      ...extra,
      eas: {
        ...extra.eas,
        projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID || extra?.eas?.projectId,
      },
    },
    owner: process.env.EXPO_OWNER || owner,
  },
};
