import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoaComponent } from './pedidoa.component';

describe('PedidoaComponent', () => {
  let component: PedidoaComponent;
  let fixture: ComponentFixture<PedidoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidoaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
