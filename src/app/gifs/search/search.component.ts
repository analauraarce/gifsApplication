import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'

})
export class SearchComponent {
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>; //property

  constructor(private gifsService: GifsService) { }

  search() {

    const value = this.txtSearch.nativeElement.value;
    if (value.trim().length === 0)
      return;
    this.gifsService.searchGifs(value);// sending value to save it in gifs.service
    this.txtSearch.nativeElement.value = "";
  }

}
