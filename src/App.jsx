import "./App.css";
import contactList from "./contacts.json";
import { useState } from "react";

const [first, second, third, fourth, fifth] = contactList;
const copyContactsArray = [...contactList];

function App() {
  const [contacts, setContacts] = useState([
    first,
    second,
    third,
    fourth,
    fifth
  ]);
  function addRandomContact() {
    setContacts(contacts => {
      const copyContacts = [...contacts]
      let randomIndex = Math.floor(Math.random() * (copyContactsArray.length - 5) + 5);
      copyContacts.push(copyContactsArray[randomIndex])
      copyContactsArray.splice(randomIndex, 1);
      return copyContacts
    });
    
  }
  function  sortByPopularity(){
  const copyContacts = [...contacts] 
  const sortedContacts=copyContacts.sort((a, b)=>{return b.popularity-a.popularity})
  setContacts( sortedContacts)
  }
  function sortByName(){
    const copyContacts = [...contacts] 
    const sortedContacts=copyContacts.sort((a, b)=>{return a.name.localeCompare(b.name)})
    setContacts(sortedContacts)

  }
  function deleteContact(id){
    const copyContacts = [...contacts] 
    const filteredContacts=copyContacts.filter(contact=>{return contact.id!==id})
    setContacts(filteredContacts)

  }
  return (
    <div className="app">
      <h1>LAB | React IronContacts</h1>
      <div className="btns">
      <button onClick={addRandomContact}>Add Random Contact</button> 
      <button onClick={sortByPopularity}>Sort By Popularity</button> 
      <button onClick={sortByName}>Sort By Name</button> 
      </div>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
        {contacts.map((contact) => {
          const roundPopularity = contact.popularity.toFixed(2);
          return (
            <tr key={contact.id}>
              <td>
                <img className="image" src={contact.pictureUrl} alt="error" />
              </td>
              <td>{contact.name}</td>
              <td>{roundPopularity}</td>
              {contact.wonOscar ? <td>🏆</td> : <td></td>}
              {contact.wonEmmy ? <td>🌟</td> : <td></td>}
              <td><button className="delete" onClick={()=>{deleteContact(contact.id)}}>Delete</button></td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
