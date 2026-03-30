const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

const contactsFile = path.join(__dirname, 'contacts.json');

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
}));

app.use((req, res, next) => {
  const currentDate = new Date();
  console.log(`[${req.method}] - ${currentDate.toLocaleTimeString()}`);
  next();
});


app.get('/contacts', (req, res) => {
  fs.readFile(contactsFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ message: 'Error receiving contacts' });
    }

      const contacts = JSON.parse(data);
      res.json(contacts);
  });
});


app.post('/contacts', (req, res) => {
  const newContact = req.body;

  if (!newContact.phone || !newContact.name) {
    return res.status(400).json({ message: 'Missed name or phone in request body'})
  }

  fs.readFile(contactsFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ message: 'Error receiving contacts' });
    }

    const contacts = JSON.parse(data);
    const newId = contacts.length + 1;

    const newUserWithId = {
      id: newId,
      ...newContact,
    };

    contacts.push(newUserWithId);

    fs.writeFile(contactsFile, JSON.stringify(contacts), (error) => {
      if (error) {
        return res.status(500).json({ message: 'Error saving contact' });
      }

      res.status(201).json(newUserWithId);
    });
  });
});

app.delete('/contacts/:id', (req, res) => {
  const id = +req.params.id;

  fs.readFile(contactsFile, 'utf-8', (error, data) => {
    if (error) {
      return res.status(500).json({ message: 'Error receiving contacts' });
    }

    const contacts = JSON.parse(data);

    const newContacts = contacts.filter((contact) => contact.id !== id);

    fs.writeFile(
      contactsFile,
      JSON.stringify(newContacts),
      (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error deleting contact' });
        }

        res.status(204).send();
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});