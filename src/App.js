import "./App.css";
import { useEffect, useState } from "react";
import { app,database } from "./firebaseConfig";
import {
  collection,addDoc,getDocs, updateDoc,doc,deleteDoc
} from "firebase/firestore";

function App() {
  // const auth = getAuth();
  // const googleProvider=new GoogleAuthProvider();
  // const provider = new GithubAuthProvider();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const collectionRef=collection(database,'users');

  const handleInputs = (event) => {
    let inputs = { [event.target.name]: event.target.value };

    setData({ ...data, ...inputs });
  };

  // const addData = () => {
  //   signInWithPopup(auth, googleProvider)
  //   .then((response)=>{
  //     console.log(response.user);
  //   })
  //   .catch((err)=>{
  //     alert(err.message);
  //   });
  // };

  const handlelogout = () => {
   addDoc(collectionRef,{
    email:data.email,
    password:data.password
   })
   .then(()=>{
    alert('data added');
   })
   .catch((err)=>{
    alert(err.message);
   })
  };

  const getdata=()=>{
    getDocs(collectionRef).then((response)=>{    //This line uses the getDocs function to fetch all the documents in the Firestore collection referenced by collectionRef.
      console.log(response.docs.map((item)=>{
        return {...item.data(),id:item.id}; //This line maps over the array of documents (response.docs) and transforms each document into an object. For each document, it combines the document data (item.data()) with an additional property id containing the document's ID (item.id).
      }))
    })
  }
  
  const updatedata=()=>{
    const docToUpdate=doc(database,"users",'3RxJJKNN1tLHT2eUH6sQ'); //This line creates a reference to the document you want to update. It specifies the Firestore database (database), the collection name ("users"), and the document ID ('3RxJJKNN1tLHT2eUH6sQ').
    updateDoc(docToUpdate,{
      email:'ABC',
      password:'1234'
    })
    .then(()=>{
      alert('data updated');
     })
     .catch((err)=>{
      alert(err.message);
     })
  }

  const deletedata=()=>{
    const docToUpdate=doc(database,"users",'3RxJJKNN1tLHT2eUH6sQ'); //This line creates a reference to the document you want to update. It specifies the Firestore database (database), the collection name ("users"), and the document ID ('3RxJJKNN1tLHT2eUH6sQ').
    deleteDoc(docToUpdate,{
      email:'ABC',
      password:'1234'
    })
    .then(()=>{
      alert('data updated');
     })
     .catch((err)=>{
      alert(err.message);
     })
  }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     if (data) {
  //       alert("Logged In");
  //     } else {
  //       alert("Not Logged In");
  //     }
  //   });
  // }, []);
  return (
    <div className="App-header">
      <input
        placeholder="Email"
        name="email"
        type="email"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />
      <input
        placeholder="Password"
        name="password"
        type="password"
        className="input-fields"
        onChange={(event) => handleInputs(event)}
      />

      {/* <button onClick={addData}>Log In</button> */}
      <button onClick={deletedata}>Log out</button>
    </div>
  );
}

export default App;
