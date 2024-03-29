import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'xxz9IfhlIQDMnkZHJLPti9YawP5stiKd';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public results: Gif[] = [];

  get historial() {
    return [... this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }
  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);//only 10 elements in the array
      localStorage.setItem('historial', JSON.stringify(this._historial));


    }
    const params = new HttpParams()
      //set('apiKey', this.apiKey)
      .set('limit', 10)
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search?api_key=${this.apiKey}`, { params })
      .subscribe((ans) => {
        this.results = ans.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
