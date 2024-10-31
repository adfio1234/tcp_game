import { addUser } from "../../session/user.session.js";
//DB접근을 위한 async
const initialHandler=async({socket,userId,payload})=>{
    const{deviceId}=payload;

    addUser(socket,deviceId);


    //처리가 끝났을떄 보내는것
    socket.write("");
}

export default initialHandler;