import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;
  let service: ApiService



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports:[HttpClientTestingModule , RouterTestingModule],
      providers:[ApiService,RouterTestingModule]
    })
    .compileComponents();

  });
  
  beforeEach(async () => {


    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    
    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
    component.router = router;
    component.apiService=service;

    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user and navigate to home page' , () => {
    const navigateSpy = spyOn(router, 'navigate');

    const cred = {
      username : 'rohit@gmail.com',
      password : '123456'
    };

    const expectedResult = {
      success : true
    }

    component.handleSubmit();
    httpMock.expectOne('http://localhost:4000/login').flush(expectedResult);

    expect(navigateSpy).toHaveBeenCalledWith(['/']);

  })

  it('should not login on invalid credentials' , () => {
    spyOn(window , 'alert');

    const cred = {
      username : 'rohit@gmail.com',
      password : 'admin'
    };

    const expectedResult = {
      success : false
    }

    component.handleSubmit();
    httpMock.expectOne('http://localhost:4000/login').flush(expectedResult);

    expect(window.alert).toHaveBeenCalledWith('Invalid Credentials. Try Again!!!');

  })
});
