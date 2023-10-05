import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EmailFormComponent } from './email-form.component';
import { FormsModule } from '@angular/forms';

describe('EmailFormComponent', () => {
  let component: EmailFormComponent;
  let fixture: ComponentFixture<EmailFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailFormComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,FormsModule]
    });

    fixture = TestBed.createComponent(EmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should send email on submit', () => {
    // Arrange
    spyOn(component, 'onsubmit');

    // Act
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    // Assert
    expect(component.onsubmit).toHaveBeenCalled();
  });
});
