import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentCardsComponent } from './deployment-cards.component';

describe('DeploymentCardsComponent', () => {
  let component: DeploymentCardsComponent;
  let fixture: ComponentFixture<DeploymentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeploymentCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeploymentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
