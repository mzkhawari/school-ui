import { Injectable } from '@angular/core';
import { HttpApiService } from '../http-service/http-api.service';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {

  constructor(private httpApi: HttpApiService) {

  }



  get(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "get").pipe(debounceTime(1500));
  }  // all active item

  getFullUrl(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi).pipe(debounceTime(1500));
  }  // all active item

  getInclude(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "getInclude").pipe(debounceTime(1500));
  }

  getById(urlApi: string, id: number): Observable<any> {
    return this.httpApi.get<any>(urlApi + "GetItem/" + id).pipe(debounceTime(1500));
  }

  getAll(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "getAll").pipe(debounceTime(1500));
  } // all active Or deactive

  getActive(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "getActive").pipe(debounceTime(1500));
  }

  getDeActive(urlApi: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "getDeActive").pipe(debounceTime(1500));
  }

  getDataByModel(urlApi: string, model: any): Observable<any> {
    return this.httpApi.getByModel<any>(urlApi + "getData", model).pipe(debounceTime(1500));
  }
  getDataUrlByModel(urlApi: string, model: any): Observable<any> {
    return this.httpApi.getByModel<any>(urlApi, model).pipe(debounceTime(1500));
  }

  getBySearchValue(urlApi: string, value: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + "getItem/" + value).pipe(debounceTime(1500));
  }

  getDataUrlById(urlApi: string, urlMethod: string, id: number): Observable<any> {
    return this.httpApi.get<any>(urlApi + urlMethod + "/" + id).pipe(debounceTime(1500));
  }
  getDataUrlByValue(urlApi: string, urlMethod: string, value: any): Observable<any> {
    return this.httpApi.get<any>(urlApi + urlMethod + "/" + value).pipe(debounceTime(1500));
  }
  getDataUrl(urlApi: string, urlMethod: string): Observable<any> {
    return this.httpApi.get<any>(urlApi + urlMethod).pipe(debounceTime(1500));
  }
  postAdd(urlApi: string, model: any): Observable<any> {
    return this.httpApi.post(`${urlApi}Post`, model).pipe(debounceTime(1500));
  }
  postDataUrl(urlApi: string, urlMethod: string, model: any): Observable<any> {
    return this.httpApi.post(`${urlApi}${urlMethod}`, model).pipe(debounceTime(1500))
  }
  postFormData(urlApi: string, model: FormData): Observable<any> {
    return this.httpApi.postFormData(urlApi, model).pipe(debounceTime(1500))
  }
  postHeaderData(urlApi: string, model: any): Observable<any> {
    return this.httpApi.postHeaderData(urlApi, model).pipe(debounceTime(1500))
  }
  putData(urlApi: string, model: any, id: number): Observable<any> {
    return this.httpApi.put(urlApi + `put`, model).pipe(debounceTime(1500))
  }

  putDataUrl(urlApi: string, urlMethod: string, model: any): Observable<any> {
    let data = { model: model };
    return this.httpApi.put(urlApi + `${urlMethod}`, model).pipe(debounceTime(1500))
  }

  deleteById(urlApi: string, id: number): Observable<any> {
    return this.httpApi.delete<any>(`${urlApi}Delete/`, id).pipe(debounceTime(1500))
  }

  deleteByUrlId(urlApi: string, urlMethod: string, id: number): Observable<any> {
    return this.httpApi.delete<any>(`${urlApi}${urlMethod}/`, id).pipe(debounceTime(1500))
  }

  getLocalFile(urlLocation: string): Observable<any> {
    return this.httpApi.get(urlLocation).pipe(debounceTime(1500));
  }


  getDataUrl_Lang(urlApi: string, urlMethod: string, lang: string): Observable<any> {
    return this.httpApi.get<any>(`${urlApi}${urlMethod}/${lang}`).pipe(debounceTime(1500));
  }
}

