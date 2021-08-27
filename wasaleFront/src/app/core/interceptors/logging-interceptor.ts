import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LoggerService } from "../services/logger.service";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private readonly _logger: LoggerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let result:
      | undefined
      | { state: "SUCCEEDED"; res: HttpResponse<any> }
      | { state: "FAILED"; res: HttpErrorResponse }
      | { state: "UNKNOWN"; res: Blob | any };

    if (environment.production) {
      return next.handle(req);
    }

    // Extend server response observable with logging
    return next.handle(req).pipe(
      tap(
        // Succeeds when there is a response; ignore other events
        (event) => {
          if (event instanceof HttpResponse) {
            result = {
              state: "SUCCEEDED",
              res: event as HttpResponse<any>,
            };
            return;
          }

          result = {
            state: "UNKNOWN",
            res: (event as any).error instanceof Blob ? (event as any).error : event,
          };
        },
        // Operation failed; error is an HttpErrorResponse
        (err) => {
          result = {
            state: "FAILED",
            res: err,
          };
        }
      ),
      // Log when response observable either completes or errors
      finalize(() => {
        const elapsed = Date.now() - started;

        if (result.state === "SUCCEEDED") {
          const message = `[${result.state}] ${req.method} "${req.urlWithParams}" ${
            result.res?.status ?? ""
          } in ${elapsed} ms.\r\n`;

          if (result.res.status === 204) {
            this._logger.logTrace(message);
            return;
          }

          try {
            const reader = new FileReader();
            reader.onload = this._onLoadHandler(message, req);
            reader.readAsText(result.res.body);
          } catch {
            this._logger.logTrace(message, { req, res: result.res });
          }
          return;
        }

        if (result.state === "FAILED") {
          const message = `[${result.state}] ${req.method} "${req.urlWithParams}"  ${
            result.res.status ?? ""
          } in ${elapsed} ms.\r\n`;

          try {
            const reader = new FileReader();
            reader.onload = this._onLoadHandler(message, req);
            reader.readAsText(result.res.error);
          } catch {
            this._logger.logTrace(message, { req, res: result.res });
          }
        }

        if (result.state === "UNKNOWN") {
          const unknown = `[${result.state}] ${req.method} "${req.urlWithParams}"  ${
            result.res.status ?? ""
          } in ${elapsed} ms.\r\n`;

          this._logger.logTrace(unknown, { req, res: result });
        }
      })
    );
  }

  private _onLoadHandler(
    message: string,
    req: HttpRequest<any>
  ): (event: ProgressEvent<FileReader>) => void {
    return (event) => {
      const result = event.target.result ? JSON.parse(event.target.result as string) : "";
      return this._logger.logTrace(message, { req, res: result });
    };
  }
}
