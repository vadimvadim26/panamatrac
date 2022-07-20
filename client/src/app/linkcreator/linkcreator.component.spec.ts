import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkcreatorComponent } from './linkcreator.component';

describe('LinkcreatorComponent', () => {
  let component: LinkcreatorComponent;
  let fixture: ComponentFixture<LinkcreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkcreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkcreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
