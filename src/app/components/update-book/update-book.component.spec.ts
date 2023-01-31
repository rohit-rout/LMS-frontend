import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiService } from 'src/app/services/api.service';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { UpdateBookComponent } from './update-book.component';

describe('UpdateBookComponent', () => {
  let component: UpdateBookComponent;
  let fixture: ComponentFixture<UpdateBookComponent>;

  let injector : TestBed;
  let httpMock : HttpTestingController;
  let router : Router;
  let service: ApiService
  let route : ActivatedRoute
  let alertSpy:any;
  let navigateSpy:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBookComponent ],
      imports:[HttpClientTestingModule , RouterTestingModule],
      providers:[ApiService,RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBookComponent);
    component = fixture.componentInstance;    
    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
    route= injector.inject(ActivatedRoute);
    component.router = router;
    component.route= route;
    component.apiService=service;
    component.id=14;

    alertSpy=spyOn(window,'alert');
    navigateSpy=spyOn(router,'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it('it should mock the get particular book route',()=>{
    let expectedResult={
      success: true,
      book :{
        title:"title",
        author:"author"
      }
    }

    httpMock.expectOne(`${'http://localhost:4000/book'}/${component.id}`).flush(expectedResult);

    expect(component.title).toBe("title");
    expect(component.author).toBe("author");

  })
  it('if no user present it should navigate to home ',()=>{
    component.user=false;
     
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  })
});
