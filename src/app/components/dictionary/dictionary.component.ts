import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.css']
})
export class DictionaryComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  searchQuery: string ='';
  searching:boolean = false;
  searchResult: any;
  ngOnInit() {
  }

  search() {
    this.searching = true;
    this.apiService.get('/blogs/findWords/' + this.searchQuery)
    .subscribe(res => {
      this.searchResult = res['words'];
      this.searching = false;
    })
  }
}
