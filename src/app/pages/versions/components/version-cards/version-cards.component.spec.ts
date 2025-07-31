import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionCardsComponent } from './version-cards.component';

describe('VersionCardsComponent', () => {
  let component: VersionCardsComponent;
  let fixture: ComponentFixture<VersionCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersionCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
