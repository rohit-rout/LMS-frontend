import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  title:string;
  author:string;
  user:any;

  constructor(public apiService:ApiService,public router:Router) { }

  ngOnInit(): void {

    this.user=this.apiService.user;
    if(!this.user){
      this.router.navigate(['/']);
    }
  }
  handleSubmit(){
    if(!this.title|| !this.author)
    {
      alert("your title or author is empty");
      return;
    }

    this.apiService.createBooks({title:this.title, author:this.author}).subscribe(res=>{
        alert("your book is added");
        this.router.navigate(['/']);
      
    })
  }

}
