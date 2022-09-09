import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomnsetstatComponent } from './domnsetstat.component';

describe('DomnsetstatComponent', () => {
  let component: DomnsetstatComponent;
  let fixture: ComponentFixture<DomnsetstatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomnsetstatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomnsetstatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
