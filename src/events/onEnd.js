import{removeUser} from '../session/user.session.js'
export const onEnd=(socket)=>()=>{
  console.log('Client disconnected');
  removeUser(socket);
}