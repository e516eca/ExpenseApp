import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFrom } from './transaction-from';

describe('TransactionFrom', () => {
  let component: TransactionFrom;
  let fixture: ComponentFixture<TransactionFrom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFrom],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFrom);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
