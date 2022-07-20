import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrelandingcreatorComponent } from './prelandingcreator.component';

describe('PrelandingcreatorComponent', () => {
  let component: PrelandingcreatorComponent;
  let fixture: ComponentFixture<PrelandingcreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrelandingcreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrelandingcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
