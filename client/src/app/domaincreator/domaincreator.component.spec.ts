import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomaincreatorComponent } from './domaincreator.component';

describe('DomaincreatorComponent', () => {
  let component: DomaincreatorComponent;
  let fixture: ComponentFixture<DomaincreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomaincreatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomaincreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
