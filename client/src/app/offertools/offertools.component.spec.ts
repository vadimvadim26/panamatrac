import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffertoolsComponent } from './offertools.component';

describe('OffertoolsComponent', () => {
  let component: OffertoolsComponent;
  let fixture: ComponentFixture<OffertoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffertoolsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffertoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
