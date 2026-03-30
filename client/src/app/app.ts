import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsService } from './services/contacts.service';
import { Contact } from './models/contact.model';
import { ContactsFormComponent } from './components/contacts-form/contacts-form';
import { ContactsTableComponent } from './components/contacts-table/contacts-table';

@Component({
  selector: 'app-root',
  imports: [ContactsFormComponent, ContactsTableComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private contactsService = inject(ContactsService);
  
  protected contacts: Contact[] = [];

  ngOnInit() {
    this.loadContacts();
  }

  private loadContacts() {
    this.contactsService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = contacts;
      },
      error: (error) => {
        console.log('Failed to load contacts', error)
      }
    })
  }

  protected onCreateContact(contact: Omit<Contact, 'id'>) {
    this.contactsService.addContact(contact).subscribe({
      next: (newContact) => {
        this.contacts = [...this.contacts, newContact];
      },
      error: (error) => {
        console.log('Failed to create contact', error)
      }
    })
  }

  protected onDeleteContact(id:number) {
    this.contactsService.deleteContact(id).subscribe({
      next: () => {
        this.contacts = this.contacts.filter(i => i.id !== id)
      },
      error: (error) => {
        console.log('Failed to delete contact', error)
      }
    })
  }

}
