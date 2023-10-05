import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioStocksComponent } from './portfolio-stocks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PortfolioStocksComponent', () => {
  let component: PortfolioStocksComponent;
  let fixture: ComponentFixture<PortfolioStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioStocksComponent],
      imports: [HttpClientTestingModule,FormsModule]
    });
    fixture = TestBed.createComponent(PortfolioStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
