import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthTokenService } from "src/app/global/modules/shop/auth/auth-token.service";
import { isSameOriginUrl } from "src/app/shared/utilities/utils";
import { StatusCodes } from "../models/status-codes";
import { ModalService } from "../services/modal.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly _router: Router,
    private readonly _tokenSrv: AuthTokenService,
    private readonly _modal: ModalService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only intercept same origin & api requests
    if (!isSameOriginUrl(req.url)) {
      return next.handle(req);
    }

    const headers: any = {
      "Accept-Language": "ar-EG",
      "Authorization": `Bearer ${this._tokenSrv.token?.user.accessToken || ""}`,
    };

    req = req.clone({ setHeaders: headers });

    return next.handle(req).pipe(catchError((err) => this._handleErrorReq(err)));
  }

  private _handleErrorReq(err: HttpErrorResponse): Observable<never> {
    switch (err.status) {
      case StatusCodes.Unauthorized:
        this._tokenSrv.clear();
        setTimeout(() => this._router.navigateByUrl("/shop/login"));
        break;

      case StatusCodes.InternalError:
        setTimeout(() => this._modal.snackbar("حدث خطأ في الخادم (500)."));
        break;

      case StatusCodes.BadRequest:
        setTimeout(() =>
          this._router.navigateByUrl("/shop").then(() => {
            this._modal.snackbar(
              "الطلب خاطئ ربما هناك نسخة جديدة والموقع يحتاج لتحديث قم باعادة تحميل الصفحة واعد المحاولة مرة اخري."
            );
          })
        );
        break;
    }

    return throwError(err);
  }
}
