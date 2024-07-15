import NotePageLoggedInView from '../components/NotePageLoggedInView';
import NotePageLoggedOutView from '../components/NotePageLoggedOutView';
import styles from "../styles/NotePage.module.css";
import { Container } from 'react-bootstrap';
import { User } from '../models/user';


interface NotePageProps{
    loggedInUser:User|null,
}

const NotesPage = ({loggedInUser}:NotePageProps) => {
  return (
    <Container className= {styles.notesPage}>
    <>
    {loggedInUser
    ?<NotePageLoggedInView/>
    :<NotePageLoggedOutView/>}
    </>

    
  </Container>
  )
}

export default NotesPage