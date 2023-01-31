import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  books:any[];
  user:any;
  constructor(public apiService: ApiService) {
    
    this.books=[];
    this.user=this.apiService.getUser();
 
  }

  ngOnInit(): void {
    this.apiService.getBooks().subscribe((res) => {
      this.books = res.listofBooks;
    }) 
  }
   
}
