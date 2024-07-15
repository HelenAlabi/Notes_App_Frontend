import { Button} from "react-bootstrap";



interface NavBarLogoutViewProps{
   onSignUpClicked: ()=> void,
   onLoginClicked: ()=> void,
}

const NavBarLogoutView= ({onSignUpClicked, onLoginClicked}: NavBarLogoutViewProps) => {

  return (
       <>
         
          <Button onClick={onSignUpClicked}>Sign Up</Button>
          <Button onClick={onLoginClicked}>Log In</Button>
       </>
    
  )
}



export default NavBarLogoutView