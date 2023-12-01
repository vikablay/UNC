import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LoggingInterceptorService implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                next: (event: HttpEvent<any>) => {
                    console.log(event)
                },
                error: error => {
                    console.log(error)
                }
            }));
    }
}
