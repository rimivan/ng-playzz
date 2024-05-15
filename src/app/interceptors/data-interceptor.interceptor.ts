import { HttpInterceptorFn } from '@angular/common/http';

export const dataInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = 'YOUR_AUTH_TOKEN';

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(authReq);
};
