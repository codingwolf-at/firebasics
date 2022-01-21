import { useEffect, useState } from 'react';
import { getDocs, collection, addDoc, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import './App.css';
import {db} from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async (e) => {
    e.preventDefault();
    await addDoc(usersCollectionRef, {
      name: e.target.name.value,
      age: Number(e.target.age.value)
    });
  }

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, {age: age+1});
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  useEffect(() => {
    (async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    })();
  }, [usersCollectionRef])

  return (
    <div className="App">
      <nav className="nav nav-primary p-1">
        <span className="nav-brand">Firebasics</span>
        <div className="nav-link-container">
          <span className="nav-link">Home</span>
          <span className="nav-link">Contact</span>
          <span className="nav-link">Services</span>
        </div>
      </nav>
      <form onSubmit={(e) => createUser(e)} className='m-1'>
        <input type="text" className="input" name="name" placeholder="Enter Name" />
        <input type="number" className="input mx-1" name="age" placeholder="Enter Age" />
        <button type='submit' className='btn btn-primary' >Create User</button>
      </form>
      <main>
        {
          users.map(({id, name, age}) => (
            <div key={id} className="card">
              <img src={`https://ui-avatars.com/api/?name=${name.split(" ")[0]}+${name.split(" ")[1]}`} className="card-img-top" alt="" />
              <div className="card-body">
                  <h2>{name}</h2>
                  <h4>{age} years</h4>
                  <button 
                    className="btn btn-primary btn-block"
                    onClick={() => updateUser(id, age)}
                  >
                    Increase Age
                  </button>
                  <button 
                    className="btn btn-danger btn-block"
                    onClick={() => deleteUser(id)}
                  >
                    Delete User
                  </button>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;
