import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api.service';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { AddBookComponent } from './add-book.component';
import { Router } from '@angular/router';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;
  let service: ApiService
  let alertSpy:any;
  let navigateSpy:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[RouterTestingModule,ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;

      
    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
    component.router = router;
    component.apiService=service;
     alertSpy=spyOn(window,'alert');
     navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if no user then it should navigate to home',()=>{
    component.user=false
    expect(navigateSpy).toHaveBeenCalledWith(['/']);

  })

  it('if title or author is empty it should alert',()=>{

    component.handleSubmit();
    
    expect(alertSpy).toHaveBeenCalledWith('your title or author is empty');
  })

  it('if title and author is valid it should alert with success',()=>{
    const expectedResult={sucess:true};
    component.title="title",
    component.author="author";
    
    component.handleSubmit();
    httpMock.expectOne('http://localhost:4000/book/new').flush(expectedResult);

    expect(alertSpy).toHaveBeenCalledWith('your book is added');
    expect(navigateSpy).toHaveBeenCalledWith(['/'])

  })

});
