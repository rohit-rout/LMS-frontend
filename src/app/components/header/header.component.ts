import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit} from '@angular/core';;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:any;
  search:string;

  
  constructor(public apiService: ApiService,public router:Router) {

   
  }

  ngOnInit(): void {
    this.apiService.setUser();
  this.user=this.apiService.user;
  }

  reloadPage(){

    window.location.reload();
  }

  handleLogout(){
    localStorage.clear();
     this.reloadPage();

  }


}
