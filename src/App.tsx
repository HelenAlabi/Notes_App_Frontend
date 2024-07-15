

import LoginModels from './components/LoginModels';
import NavBar from './components/NavBar';
import SignUpModels from './components/SignUpModels';
import styleApp from './styles/App.module.css';
import { useEffect, useState } from 'react';
import { User } from './models/user';
import * as NotesApi from "./network/notes.api";
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/NotesPage';
import PrivacyPage from './pages/PrivacyPage';
import NoteFoundPage from './pages/NoteFoundPage';



const App = () => {
  const [loggedInUser, setLoggedInUser]= useState<User|null>(null);
  const[showSignUpModal, setShowSignUpModal] = useState(false);
  const[showLoginModal, setShowLoginModal] = useState(false);


  useEffect(()=>{
    const fetchLoggedInUser = async () => {
      
      try {
        const user = await NotesApi.loggedInUser();
        setLoggedInUser(user)
      } catch (error) {
        console.error(error);
        
      }
    }
    fetchLoggedInUser();

  },[])




  return (
    <BrowserRouter>
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)} />
       <Container className= {styleApp.pageContainer} >
        <Routes>
          <Route
             path='/'
             element ={<NotesPage loggedInUser={loggedInUser}/>}
          />
          <Route
             path='/privacy'
            element ={<PrivacyPage/>}
          />
          <Route
             path='/*'
             element ={<NoteFoundPage/>}
          />
        </Routes>

      </Container> 
      {showSignUpModal &&
          <SignUpModels
            onDismiss={() => setShowSignUpModal(false)}
            onSignUPSuccessful={(user) => { 
               setLoggedInUser(user);
               setShowSignUpModal(false)
            }} />
        }
        {showLoginModal&&
          <LoginModels
            onDismiss={() => setShowLoginModal(false)}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false)
             }} />
        }
    </div>
    </BrowserRouter>
  );
};

export default App;







