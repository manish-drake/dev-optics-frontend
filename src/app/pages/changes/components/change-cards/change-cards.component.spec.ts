import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCardsComponent } from './change-cards.component';

describe('ChangeCardsComponent', () => {
  let component: ChangeCardsComponent;
  let fixture: ComponentFixture<ChangeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
