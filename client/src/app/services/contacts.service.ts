import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private http = inject(HttpClient);
  private URL = 'http://localhost:3000/contacts';

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.URL);
  }

  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this.http.post<Contact>(this.URL, contact);
  }

  deleteContact(id: number) {
    return this.http.delete(`${this.URL}/${id}`)
  }
}




