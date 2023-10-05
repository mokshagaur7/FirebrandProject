import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PortfolioComponent } from './portfolio.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [PortfolioComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch portfolios on initialization', () => {
    const mockPortfolios = [{ portfolioId: 1, portfolioName: 'Portfolio 1' }];
    httpClient.get.and.returnValue(of(mockPortfolios));

    component.ngOnInit();

    expect(component.portfolios).toEqual(mockPortfolios);
  });

  it('should create a new portfolio', () => {
    const mockResponse = { success: true };
    httpClient.get.and.returnValue(of('someId')); // Mock the first HTTP GET call
    httpClient.post.and.returnValue(of(mockResponse)); // Mock the HTTP POST call

    component.createPortfolio();

    expect(httpClient.get).toHaveBeenCalledWith(component.apiUrl);
    expect(httpClient.post).toHaveBeenCalledWith(component.apiUrl, {
      portfolioId: 5,
      userId: 9,
      stockId: 1,
      portfolioName: 'New Portfolio Name'
    });
    expect(router.navigate).toHaveBeenCalledWith(['/portfolio-stocks', 5]); // Check the router navigation
  });

  it('should navigate to portfolio stocks', () => {
    const portfolioId = 123;

    component.navigateToPortfolioStocks(portfolioId);

    expect(router.navigate).toHaveBeenCalledWith(['/portfolio-stocks', portfolioId]);
  });
});
