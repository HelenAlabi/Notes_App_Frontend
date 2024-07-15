import { useForm } from 'react-hook-form';
import { User } from './../models/user';
import { LoginCredentials } from '../network/notes.api';
import * as NoteApi from '../network/notes.api';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import TextInput from './inputs/TextInput';
import StyleUtils from '../styles/utility.module.css';
import { UnauthorizedError } from '../errors/httpErrors';
import { useState } from 'react';


interface LoginModalProps {
  onDismiss: () => void,
  onLoginSuccessful: (user:User) => void,
}


const LoginModels = ({onDismiss,onLoginSuccessful }:LoginModalProps) => {
      
      const [errorText, setErrorText] = useState<string | null>(null);

      const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm<LoginCredentials>();
     
       const onSubmit = async (credentials: LoginCredentials)=>{

        try {
          const user = await NoteApi.login(credentials);
          onLoginSuccessful(user);
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setErrorText(error.message);
            } else {
                alert(error);
            }
            console.error(error);
        }
       }
  return (
    <Modal show onHide={ onDismiss}>
    <Modal.Header closeButton>
        <Modal.Title>
        Log In
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
         {errorText &&
            <Alert variant="danger">
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
                Log In
            </Button>
        </Form>
    </Modal.Body>
</Modal>
  )
};


export default LoginModels; 