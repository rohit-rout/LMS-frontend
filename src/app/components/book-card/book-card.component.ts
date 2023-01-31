import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book:any;
  user:any;
  constructor(public apiService :ApiService,public router:Router) { 
       this.user=apiService.user;
  }

  ngOnInit(): void {
    

  }
  reloadPage() {
    window.location.reload();
  }

   handleDelete(){
     this.apiService.deleteBook(this.book.id).subscribe(res=>{
      alert("book deleted");
      this.reloadPage();
      // this.router.navigate(['/']);
     })
   }
   handleUpdate(){
       this.router.navigate(['/book/update/'+this.book.id]);
   }
 
}
