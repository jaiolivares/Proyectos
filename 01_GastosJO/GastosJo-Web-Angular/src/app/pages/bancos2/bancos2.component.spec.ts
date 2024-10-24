import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bancos2Component } from './bancos2.component';

describe('Bancos2Component', () => {
  let component: Bancos2Component;
  let fixture: ComponentFixture<Bancos2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bancos2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Bancos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
