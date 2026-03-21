// 사용하지 않도록 함
// import NodeCache from 'node-cache';
const { name, version, description } = require('../../package.json');

export const config = {
  port: process.env.PORT || 3001,
  prefix: 'v1',
  auth: {
    jwt_secret: process.env.JWT_SECRET || 'my-jwt-secret',
    jwt_expiration: process.env.JWT_EXPIRED || '300', //'300s',
    /*
		// node cache
    handler: () => {
      const cache = new NodeCache({ stdTTL: 30 * 60 });
      return async (payload) => {
        const AccountService = require('../app/accounts/service/AccountService').default;
        let data = cache.get(`accounts:${payload.id}`);
        if (!data) {
          try {
            data = await AccountService.getAccountById(payload.id);
            cache.set(`accounts:${payload.id}`, data);
          } catch (e) {
            console.error(e);
          }
        }
        return data;
      };
    },
		*/
  },
  swagger: {
    name,
    version,
    description,
    // scheme: process.env.SCHEME || 'http',
    // host: process.env.HOST || 'localhost:3001',
  },
  file: {
    storage: 'public',
  },
};

export default config;
