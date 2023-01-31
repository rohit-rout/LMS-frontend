import { RouterTestingModule } from '@angular/router/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;
  let service: ApiService
  let alertSpy:any;
  let navigateSpy:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCardComponent ],
      imports:[HttpClientTestingModule , RouterTestingModule],
      providers:[ApiService,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
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

    component.book={
      "id": 11,
      "title": "test1dsfsf",
      "author": "test2",
      "createdAt": "2023-01-27T08:58:55.000Z",
      "updatedAt": "2023-01-30T04:41:28.000Z"
  }
   

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('it should call the api and alert for deleted book',()=>{
      
      let expectedResult="book deleted";
      component.handleDelete();
    const request= httpMock.expectOne('http://localhost:4000/book/delete/11');

    request.flush(expectedResult);

    expect(alertSpy).toHaveBeenCalledWith('book deleted');

    

  })

  it('it should navigate to the update route',()=>{

    component.handleUpdate();

    expect(navigateSpy).toHaveBeenCalledWith(['/book/update/11']);
  })

});
