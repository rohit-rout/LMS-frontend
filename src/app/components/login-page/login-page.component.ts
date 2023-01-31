import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  

  name:string;
  password:string;
  
  constructor(public router: Router,public apiService:ApiService) { 
    // console.log(this.apiService.user);
    if(this.apiService.user)
    router.navigate(['/']);
  }

  ngOnInit(): void {

  }

  handleSubmit(){
    this.apiService.login({name:this.name,password:this.password}).subscribe(res=>{
      if(res.success){
        this.apiService.loadUser(res.user);
        this.router.navigate(['/']);

      }else{
        alert('Invalid Credentials. Try Again!!!');
      } 

    })
      
  }
}
