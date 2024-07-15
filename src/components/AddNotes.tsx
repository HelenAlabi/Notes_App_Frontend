import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes.api";
import * as NoteApi from "../network/notes.api";
import { Note } from "../models/note";
import TextInput from "./inputs/TextInput";


interface AddNoteProps{
    noteToEdit?:Note,
    onDismiss :()=>void,
    onNoteSaved: (note:Note)=> void,
}


const AddNotes = ({noteToEdit, onDismiss, onNoteSaved }:AddNoteProps) => {

    const {register, handleSubmit, formState : {errors, isSubmitting}}= useForm<NoteInput>({
        defaultValues:{
            title:noteToEdit?.title || "",
            text:noteToEdit?.text || "",
        }
    });

    const onSubmit =  async (input: NoteInput)=> {
        try {
            let noteResponse:Note;
            if(noteToEdit){
                noteResponse = await NoteApi.updateNote(noteToEdit._id, input);
            }else{
               noteResponse = await NoteApi.createNote(input)
            }
            
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
  return (
    <Modal show onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>
                {noteToEdit ? "Edit Note":"Add Note"}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

                <TextInput
                name="title"
                label="Title"
                type ="text"
                placeholder = "Title"
                register={register}
                registerOptions={{required: "Required" }}
                error={errors.title}
                />

               <TextInput
                name="text"
                label="Text"
                as ="textarea"
                rows = {5}
                placeholder = "Text"
                register={register}
                />

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button 
            type="submit"
            form="addEditNoteForm"
            disabled ={isSubmitting}
            >Submit
            </Button>
        </Modal.Footer>

    </Modal>
  )
}
export  default AddNotes;