import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';


@Component({
  selector: 'app-contacts-table',
  imports: [],
  templateUrl: './contacts-table.html',
  styleUrl: './contacts-table.scss',
})
export class ContactsTableComponent {
  @Input() contacts: Contact[] = [];
  @Output() deleteContact = new EventEmitter<number>();

  protected onDelete(id:number) {
    this.deleteContact.emit(id);
  }
}