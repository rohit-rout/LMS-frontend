import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;
  let service: ApiService
  let alertSpy:any;
  let navigateSpy:any;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports:[HttpClientTestingModule , RouterTestingModule],
      providers:[ApiService,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
    component.router = router;
    component.apiService=service;
    alertSpy=spyOn(window,'alert');
    navigateSpy=spyOn(router,'navigate');
    component.reloadPage=()=>{};
    service.setUser=()=>{
     
    }
    component.user={
      "name":"rohit@gmail.com",
      "password":"123456"
  }

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
