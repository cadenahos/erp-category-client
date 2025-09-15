import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authData = JSON.parse(localStorage.getItem('authData') || '{}');
  if (authData.token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${authData.token}` }
    });
  }
  return next(req);
};
