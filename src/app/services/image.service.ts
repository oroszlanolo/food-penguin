import { HttpClient, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, finalize, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  serverUrl = `${environment.serverPath}api/addImage`;

  fileName = '';
  uploadInProgress = false;
  constructor(private http: HttpClient) { }

  addImage(event: Event) : Observable<string> {
    const file:File = (event.target as HTMLInputElement)?.files![0];
    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.uploadInProgress = true;

      return this.http.post(this.serverUrl, formData, {
          reportProgress: true,
          observe: 'response'
      })
      .pipe(finalize(() => this.reset()))
      .pipe(map((res) => res.body as string));
    }
    return of('');
  }

  reset() {
    this.uploadInProgress = false;
  }
}
