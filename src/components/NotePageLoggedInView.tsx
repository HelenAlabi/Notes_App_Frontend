import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import Note from './Note';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from "../network/notes.api";
import styles from "../styles/NotePage.module.css";
import styleUti from "../styles/utility.module.css";
import AddNotes from "./AddNotes";



const NotePageLoggedInView = () => {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showNote, setShowNote] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    const [noteLoading, setNoteLoading]= useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false)


    useEffect(() => {
        const loadNotes = async () => {
          try {
            setShowNotesLoadingError(false);
            setNoteLoading(true)
            const notes = await NotesApi.fetchNote();
            console.log(notes);
    
            setNotes(notes);
          } catch (error) {
            console.error(error);
            setShowNotesLoadingError(true);
          } finally{
            setNoteLoading(false);
          }
        }
        loadNotes();
      }, []);
    
      const deleteNote = async (note: NoteModel) => {
        try {
          await NotesApi.deleteNote(note._id);
          setNotes(notes.filter(checkId => checkId._id !== note._id));
        } catch (error) {
          console.error(error),
            alert(error)
        }
      };
    
    
      const notesGrid = 
      <Row xs={1} md={2} xl={3} className= {`g-4 ${styles.noteGrid}`}>
            {notes.map((note) => (
              <Col key={note._id} >
                <Note
                  note={note}
                  className= {styles.note}
                  onClickedNote={setNoteToEdit}
                  deleteNoteHandler={deleteNote}
                />
              </Col>
            ))}
          </Row>
  return (
    <>
       <Button
        className ={`mb-4 ${styleUti.blockCenter} ${styleUti.flexCenter}`}
        onClick={() => setShowNote(true)}>
        <FaPlus />
        Add Note
      </Button>
      
      {noteLoading && <Spinner animation='border' variant='primary'/>}
      {showNotesLoadingError && <p>Something went wrong</p>}
      {!noteLoading && !showNotesLoadingError &&
      <>
         {notes.length >0 ? notesGrid : <p>You don't have Notes yet</p>}
      </>
      }
      {showNote &&
        <AddNotes
          onDismiss={() => setShowNote(false)}
          onNoteSaved={(latestNote) => {
            setNotes([...notes, latestNote])
            setShowNote(false);
          }} />
      }
      {noteToEdit &&
        <AddNotes
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updateNote) => {
            setNotes(notes.map(checkIdOfExisting => checkIdOfExisting._id === updateNote._id ? updateNote : checkIdOfExisting));
            setNoteToEdit(null);
          }}
        />
      }
    </>
  )
};

export default NotePageLoggedInView;
