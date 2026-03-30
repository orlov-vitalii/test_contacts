import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsTableComponent } from './contacts-table';

describe('ContactsTable', () => {
  let component: ContactsTableComponent;
  let fixture: ComponentFixture<ContactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
