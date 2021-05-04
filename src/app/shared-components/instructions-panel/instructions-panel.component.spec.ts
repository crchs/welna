import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsPanelComponent } from './instructions-panel.component';

describe('InstructionsPanelComponent', () => {
  let component: InstructionsPanelComponent;
  let fixture: ComponentFixture<InstructionsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructionsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
