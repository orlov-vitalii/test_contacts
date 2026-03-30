import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contacts-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacts-form.html',
  styleUrl: './contacts-form.scss',
})
export class ContactsFormComponent {
  @Output() createContact = new EventEmitter<Omit<Contact, 'id'>>();

  protected name = '';
  protected phone = '';

  submitForm(): void {

    this.createContact.emit({
      name: this.name.trim(),
      phone: this.phone.trim(),
    });

    this.name = '';
    this.phone = '';
  }
}