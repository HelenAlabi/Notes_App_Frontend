import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import * as NoteApi from '../network/notes.api';


interface NavBarLoggedInViewProps{
    user: User,
    onLogoutSuccessful : ()=> void,
}

const NavBarLoggedInView = ({user, onLogoutSuccessful}: NavBarLoggedInViewProps) => {

      const logout = async ()=>{
        try {
            await NoteApi.logout();
            onLogoutSuccessful();
        } catch (error) {
           console.error(error);
           alert(error); 
        }
      }
  return (
       <>
          <Navbar.Text className= "me-2">
            Signed in as: {user.username}
          </Navbar.Text>
          <Button onClick={logout}>Log out</Button>
       </>
    
  )
}

export default NavBarLoggedInView;