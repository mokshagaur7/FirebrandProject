import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChartComponent } from './chart.component';
import { DataService } from '../data.service';
import { Chart } from 'chart.js';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ChartComponent],
      providers: [DataService] // Add any additional services if needed
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch historical data', () => {
    const spy = spyOn(component, 'fetchHistoricalData').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  
});
