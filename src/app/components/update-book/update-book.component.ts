import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
   
  title:string;
  author:string;
  id:Number;
  user:any;
  constructor(public route: ActivatedRoute,public apiService:ApiService, public router:Router) { 
 
  }
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id=Number(params['id']);
    })
    this.apiService.getParticularBook(this.id).subscribe(res=>{
      this.title=res.book.title;
      this.author=res.book.author;
    })

    this.user=this.apiService.user;
    
    if(!this.user){
      this.router.navigate(['/']);
    }
  }
  handleSubmit(){
    this.apiService.updateBook(this.id,{title:this.title,author:this.author}).subscribe(res=>{
      console.log(res);
      alert('your book is updated');
      this.router.navigate(['/']);
    })

  }

}
