import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from "../../constants/handlerIds.js";
import { addUser } from "../../session/user.session.js";
import { handlerError } from "../../utils/error/errorHandler.js";
//DB접근을 위한 async
const initialHandler=async({socket,userId,payload})=>{
    try{
        const{deviceId}=payload;

    addUser(socket,deviceId);

    //유저정보 응답 생성
    const initialResponse=createResponse(
        HANDLER_IDS.INITIAL,
        RESPONSE_SUCCESS_CODE,
        {userId:deviceId},
        deviceId,
    );
    //처리가 끝났을떄 보내는것
    socket.write(initialResponse);
    }catch(e){
        handlerError(socket,e);
    }
}

export default initialHandler;