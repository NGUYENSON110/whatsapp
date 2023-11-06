import react, { useEffect } from "react";
import Sidebar from "./components/sidebar/sidebar";
import Login from "./components/login/login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./components/config/firebase";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import RouterApp from "./components/router/router";

function App() {
  const [LoggedInUser, loading, _error] = useAuthState(auth)

  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, 'users', LoggedInUser?.email), {
          email: LoggedInUser?.email,
          lastSeen: serverTimestamp(),
          photoURL: LoggedInUser?.photoURL
        },
          { merge: true } //just update what is changed !
        )
      } catch (error) {
        console.log("ERROR SETTING USER IN DB", error)
      }
    }

    if(LoggedInUser){
      setUserInDb()
    }
  }, [])

  if (loading) return <h1>Loading....</h1>

  if (!LoggedInUser) return <Login />
  return <Sidebar />
}

export default App;
