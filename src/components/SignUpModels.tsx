import { useForm } from 'react-hook-form';
import { User } from './../models/user';
import { SignUpCredentials } from '../network/notes.api';
import * as NoteApi from '../network/notes.api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInput from './inputs/TextInput';
import StyleUtils from '../styles/utility.module.css';
import { useState } from 'react';
import { ConflictError } from '../errors/httpErrors';



interface SignUpModalProps {
    onDismiss: () => void,
    onSignUPSuccessful: (user:User) => void,
}

const SignUpModels =({onDismiss, onSignUPSuccessful}:SignUpModalProps) =>{

    const [errorText, setErrorText] = useState<string | null>(null);
    
     const {register, handleSubmit, formState: {errors, isSubmitting}}= useForm<SignUpCredentials>();

     const onSubmit= async (credentials :SignUpCredentials) => {
        try {
            const newUser = await NoteApi.signUp(credentials);
            onSignUPSuccessful(newUser)
        } catch (error) {
            if (error instanceof ConflictError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            
        }
     }

    return(
        <Modal show onHide={ onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                Sign Up
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorText &&
                   <Alert variant='danger'>
                        {errorText}
                   </Alert>

                }
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                    name='username'
                    label='Username'
                    type ="text"
                    placeholder = "Username"
                    register={register}
                    registerOptions={{required: "Required" }}
                    error={errors.username}
                    />
                    <TextInput
                    name='email'
                    label='Email'
                    type ="email"
                    placeholder = "Email"
                    register={register}
                    registerOptions={{required: "Required" }}
                    error={errors.email}
                    />
                    <TextInput
                    name='password'
                    label='Password'
                    type ="password"
                    placeholder = "Password"
                    register={register}
                    registerOptions={{required: "Required" }}
                    error={errors.password}
                    />
                    <Button 
                    type = "submit"
                    disabled = {isSubmitting}
                    className= {StyleUtils.width100}>
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )

}

export default SignUpModels;