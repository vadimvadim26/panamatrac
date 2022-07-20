import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffercreatorComponent } from './offercreator.component';

describe('OffercreatorComponent', () => {
  let component: OffercreatorComponent;
  let fixture: ComponentFixture<OffercreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffercreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OffercreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
