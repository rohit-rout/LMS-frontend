import { ApiService } from 'src/app/services/api.service';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let injector: TestBed;
  let service: ApiService;
  let httpMoc: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    injector = getTestBed();
    service = injector.inject(ApiService);
    httpMoc = injector.inject(HttpTestingController);
    component.apiService = service;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get books from the api', () => {
    const expectedResult = {
      success: true,
      listofBooks: [
        {
          id: 11,
          title: 'test1dsfsf',
          author: 'test2',
          createdAt: '2023-01-27T08:58:55.000Z',
          updatedAt: '2023-01-30T04:41:28.000Z',
        },
        {
          id: 16,
          title: 'THE AMAZING SPIDERMAN',
          author: 'Nitin',
          createdAt: '2023-01-30T02:01:59.000Z',
          updatedAt: '2023-01-30T02:01:59.000Z',
        },
        {
          id: 17,
          title: 'MASTER ANGULAR',
          author: 'Chakit',
          createdAt: '2023-01-30T02:02:27.000Z',
          updatedAt: '2023-01-30T02:02:27.000Z',
        },
        {
          id: 18,
          title: 'Money Heist',
          author: 'Aayush',
          createdAt: '2023-01-30T02:03:23.000Z',
          updatedAt: '2023-01-30T02:03:23.000Z',
        },
        {
          id: 19,
          title: 'The Art Of Giving The Right Fuck',
          author: 'Sumit ',
          createdAt: '2023-01-30T02:05:41.000Z',
          updatedAt: '2023-01-30T02:05:41.000Z',
        },
      ],
    };
    



    httpMoc.expectOne('http://localhost:4000/books').flush(expectedResult);

    expect(component.books).toBe(expectedResult.listofBooks);
  });
});
