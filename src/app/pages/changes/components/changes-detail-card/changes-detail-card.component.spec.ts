import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesDetailCardComponent } from './changes-detail-card.component';

describe('ChangesDetailCardComponent', () => {
  let component: ChangesDetailCardComponent;
  let fixture: ComponentFixture<ChangesDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangesDetailCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangesDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
