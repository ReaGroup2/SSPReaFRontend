import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedCauseComponent } from './featured-cause.component';

describe('FeaturedCauseComponent', () => {
  let component: FeaturedCauseComponent;
  let fixture: ComponentFixture<FeaturedCauseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeaturedCauseComponent]
    });
    fixture = TestBed.createComponent(FeaturedCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
