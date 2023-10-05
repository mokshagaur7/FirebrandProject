import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioStocksComponent } from './portfolio-stocks.component';

describe('PortfolioStocksComponent', () => {
  let component: PortfolioStocksComponent;
  let fixture: ComponentFixture<PortfolioStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioStocksComponent]
    });
    fixture = TestBed.createComponent(PortfolioStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
