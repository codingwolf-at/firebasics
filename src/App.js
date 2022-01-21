import { useEffect, useState } from 'react';
import { getDocs, collection } from "@firebase/firestore";
import './App.css';
import {db} from "./firebase-config";

function App() {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

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
      <main>
        {
          users.map(({id, name, age}) => (
            <div key={id} className="card">
              <img src={`https://ui-avatars.com/api/?name=${name.split(" ")[0]}+${name.split(" ")[1]}`} className="card-img-top" alt="" />
              <div className="card-body">
                  <h2>{name}</h2>
                  <h4>{age} years</h4>
                  <button className="btn btn-primary btn-block">ADD TO CART</button>
              </div>
            </div>
          ))
        }
      </main>
    </div>
  );
}

export default App;
