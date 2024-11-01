import { createResponse } from "../response/createResponse.js";
import { ErrorCodes } from "./errorCodes.js";

//try catch로 에러 인식
export const handlerError=(socket,error)=>{

    let responseCode;
    let message;

    console.error(error);

    if(error.code){
        responseCode=error.code;
        message=error.message;
        console.error(`에러코드: ${error.code}, 메시지: ${error.message}`);
    }else{//예상하지못한 에러일떄
        responseCode=ErrorCodes.SOKCET_ERROR;
        message=error.message;
        console.error(`일반 에러:${error.message}`);
    }

    //response로 만들어서 보낸다
    const errorResponse=createResponse(-1,responseCode,{message},null);
    socket.write(errorResponse);
};