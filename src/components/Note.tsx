import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import style from "../styles/Note.module.css";
import { formatDate } from "../utility/formatDate";
import { MdDelete } from "react-icons/md";
import styleUti from "../styles/utility.module.css"

interface  NoteProps{
    note: NoteModel,
    onClickedNote: (note:NoteModel) => void,
    deleteNoteHandler: (note:NoteModel) => void,
    className?: string,
}

const Note = ({note,onClickedNote ,deleteNoteHandler, className}: NoteProps)=>{
    const {
      title,
      text,
      createdAt,
      updatedAt
    }=note;


    let createdUpdatedText:string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated" + formatDate(updatedAt);
    }else{
        createdUpdatedText = "Created" + formatDate(createdAt);
    }
    return(
        <Card 
            className= {`${style.noteCard} ${className}`}
            onClick={()=>onClickedNote(note)}>
            <Card.Body className= {style.cardBody}>
                <Card.Title className= {styleUti.flexCenter}>
                    {title}
                    <MdDelete 
                      className= {` ms-auto ${style.Delicon}`}
                      onClick={(e)=>{
                        deleteNoteHandler(note);
                        e.stopPropagation();
                      }}
                    />
                </Card.Title>
                <Card.Text className= {style.noteText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className= {`text-muted ${style.notDateAt}`  }>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    )
}




export default Note;