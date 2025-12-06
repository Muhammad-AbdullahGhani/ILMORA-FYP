import { serviceClient } from '../utils/serviceClient.js';

/**
 * Proxy handler middleware factory
 * Creates middleware to forward requests to target microservice
 */
export const proxyRequest = (serviceKey, targetPath) => {
  return async (req, res, next) => {
    try {
      // Replace route parameters in target path
      let path = targetPath;
      Object.keys(req.params).forEach(param => {
        path = path.replace(`:${param}`, req.params[param]);
      });

      // Prepare request options
      const options = {
        method: req.method,
        path,
        data: req.body,
        params: req.query,
        headers: {
          ...req.headers,
          // Forward user context if available
          ...(req.user && {
            'X-User-Id': req.user.id,
            'X-User-Email': req.user.email,
            'X-User-Role': req.user.role
          })
        }
      };

      // Remove headers that shouldn't be forwarded
      delete options.headers.host;
      delete options.headers['content-length'];

      // Make request to target service
      const result = await serviceClient.request(serviceKey, options);

      // Forward the response
      res.json(result);
    } catch (error) {
      // Forward service errors
      const status = error.status || 500;
      const message = error.message || 'Internal server error';
      
      res.status(status).json({
        error: message,
        service: error.service,
        ...(process.env.NODE_ENV === 'development' && { details: error.data })
      });
    }
  };
};

/**
 * Custom proxy handler for complex scenarios
 */
export const customProxy = (serviceKey, pathBuilder, responseTransformer) => {
  return async (req, res, next) => {
    try {
      const path = typeof pathBuilder === 'function' 
        ? pathBuilder(req) 
        : pathBuilder;

      const options = {
        method: req.method,
        path,
        data: req.body,
        params: req.query,
        headers: req.headers
      };

      const result = await serviceClient.request(serviceKey, options);
      const transformed = responseTransformer 
        ? responseTransformer(result, req) 
        : result;

      res.json(transformed);
    } catch (error) {
      next(error);
    }
  };
};
