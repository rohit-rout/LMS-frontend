import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, getTestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports:[HttpClientTestingModule],
     providers:[]
    });
    service = TestBed.inject(ApiService);
    injector=getTestBed();
    httpMock=injector.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add book to the database ',()=>{
    const expectedResult="book created";
    
    let result:any;

    service.createBooks({
      name:"The night and the owl",
      author:"Mk Singh"
    }).subscribe(data=> result=data );

    httpMock.expectOne('http://localhost:4000/book/new').flush(expectedResult)

    expect(result).toBe(expectedResult);

  })

  it('should get all the books from database', () => {

    const expectedResult = [];

    let result: any;

    service.getBooks().subscribe(res => result = res);
    httpMock.expectOne('http://localhost:4000/books').flush(expectedResult);
    expect(result).toBe(expectedResult);
  })

  it('should delete book with an id from the database',()=>{
    const expectedResult = "Record Deleted";
    let result : any;

    service.deleteBook(2).subscribe(res => result = res);

    httpMock.expectOne('http://localhost:4000/book/delete/2').flush(expectedResult);

    expect(result).toBe(expectedResult);
  })

  it('should update a book with an id', ()=>{
    const expectedResult = "Record updated";
    let result : any;

    service.updateBook(2,{name:"title",author:"Rohit"}).subscribe(res => result = res);

    let request=httpMock.expectOne('http://localhost:4000/book/edit/2');
    request.flush(expectedResult);

    expect(request.request.method).toBe('POST');

    expect(result).toBe(expectedResult);
  })

  it('should get a particular book details from the database',()=>{
    const expectedResult = "Record fetched";
    let result : any;

    service.getParticularBook(2).subscribe(res=>result=res);

    let request=httpMock.expectOne('http://localhost:4000/book/2');

    request.flush(expectedResult);
    expect(result).toBe(expectedResult);

    expect(request.request.method).toBe('GET');



  })

  


  
});
