import "./App.css";
import { useEffect, useState } from "react";
import { app,storage } from "./firebaseConfig";
import {  ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";

//import {collection,addDoc,getDocs, updateDoc,doc,deleteDoc} from "firebase/firestore";

function App() {
  // const auth = getAuth();
  // const googleProvider=new GoogleAuthProvider();
  // const provider = new GithubAuthProvider();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //const collectionRef=collection(database,'users');

  

  // const addData = () => {
  //   signInWithPopup(auth, googleProvider)
  //   .then((response)=>{
  //     console.log(response.user);
  //   })
  //   .catch((err)=>{
  //     alert(err.message);
  //   });
  // };

  // const handlelogout = () => {
  //  addDoc(collectionRef,{
  //   email:data.email,
  //   password:data.password
  //  })
  //  .then(()=>{
  //   alert('data added');
  //  })
  //  .catch((err)=>{
  //   alert(err.message);
  //  })
  // };

  // const getdata=()=>{
  //   getDocs(collectionRef).then((response)=>{    //This line uses the getDocs function to fetch all the documents in the Firestore collection referenced by collectionRef.
  //     console.log(response.docs.map((item)=>{
  //       return {...item.data(),id:item.id}; //This line maps over the array of documents (response.docs) and transforms each document into an object. For each document, it combines the document data (item.data()) with an additional property id containing the document's ID (item.id).
  //     }))
  //   })
  // }
  
  // const updatedata=()=>{
  //   const docToUpdate=doc(database,"users",'3RxJJKNN1tLHT2eUH6sQ'); //This line creates a reference to the document you want to update. It specifies the Firestore database (database), the collection name ("users"), and the document ID ('3RxJJKNN1tLHT2eUH6sQ').
  //   updateDoc(docToUpdate,{
  //     email:'ABC',
  //     password:'1234'
  //   })
  //   .then(()=>{
  //     alert('data updated');
  //    })
  //    .catch((err)=>{
  //     alert(err.message);
  //    })
  // }

  // const deletedata=()=>{
  //   const docToUpdate=doc(database,"users",'3RxJJKNN1tLHT2eUH6sQ'); //This line creates a reference to the document you want to update. It specifies the Firestore database (database), the collection name ("users"), and the document ID ('3RxJJKNN1tLHT2eUH6sQ').
  //   deleteDoc(docToUpdate,{
  //     email:'ABC',
  //     password:'1234'
  //   })
  //   .then(()=>{
  //     alert('data updated');
  //    })
  //    .catch((err)=>{
  //     alert(err.message);
  //    })
  // }

  // useEffect(() => {
  //   onAuthStateChanged(auth, (data) => {
  //     if (data) {
  //       alert("Logged In");
  //     } else {
  //       alert("Not Logged In");
  //     }
  //   });
  // }, []);

  const handleSubmit=()=>{
    const storageRef = ref(storage, `images/${data.name}`);  //This line creates a reference to the file you want to upload in Firebase Cloud Storage.
    const uploadTask = uploadBytesResumable(storageRef, data); //This line initiates the upload task using the uploadBytesResumable function. data should be the file you want to upload. This function returns an upload task that can be used to monitor the upload progress and handle its completion.
    uploadTask.on('state_changed',(snapshot)=> {  //This sets up event listeners for the upload task:
      //'state_changed'   : This event listener monitors the upload state and calculates the upload progress percentage.
      //(error) => { ... }: This function handles errors that may occur during the upload process.
      //() => { ... }: This function runs when the upload is complete. It retrieves the download URL of the uploaded file using getDownloadURL and logs it to the console.
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },(error)=>{
      console.log(error.message);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  )};
  return (
    <div className="App-header">
      <input
        type="file"
        className="input-fields"
        onChange={(event) => setData(event.target.files[0])}
      />

      {/* <button onClick={addData}>Log In</button> */}
      <button onClick={handleSubmit}>Log out</button>
    </div>
  );
}

export default App;
