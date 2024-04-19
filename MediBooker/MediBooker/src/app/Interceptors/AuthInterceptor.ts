import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { TokenInfoDTO } from "../ModelsDTO/TokenInfoDTO";
import { Route, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { DecodeTokenService } from "../Services/decode-token.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private decode: DecodeTokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const token = JSON.parse(localStorage.getItem('BearerToken')!);
    if (token) {

      if (Date.now() >= JSON.parse(localStorage.getItem('BearerTokenExp')!) * 1000) { //Sprawdzenie czy token już wygasł
        token.accessToken = token.refreshToken;
        const decodeToken = this.decode.getDecodedAccessToken(token.accessToken);

        localStorage.removeItem('BearerToken');
        localStorage.setItem('BearerToken', JSON.stringify(token));

        localStorage.removeItem('BearerTokenExp');
        localStorage.setItem('BearerTokenExp', decodeToken.exp);
      }

      const authReq = request.clone({
        headers: request.headers.set('authorization', `Bearer ${token.accessToken}`)
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.router.navigate(['/error']);
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}

