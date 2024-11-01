import initialHandler from "./user/initial.handler.js";
import { HANDLER_IDS } from "../constants/handlerIds.js";
import CustomError from "../utils/error/customError.js";
import { ErrorCodes } from "../utils/error/errorCodes.js";

console.log(initialHandler);
const handlers={
    [HANDLER_IDS.INITIAL]:{
        handler:initialHandler,
        protoType:'initial.InitialPacket'//handler에서 사용하는 payload의 이름
    }
};


//handlerid를 가지고 조회하는 함수 
export const getHandlerById=(handlerId)=>{
    if(!handlers[handlerId]){
        throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `핸들러를 찾을 수 없습니다: ID ${handlerId}`);
    }
    
    return handlers[handlerId].handler;
};


//handlerId를가지고 proto를 조회하는 함수
export const getPrototypeNameByHandlerId=(handlerId)=>{
 
    if(!handlers[handlerId]){
        throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID, `프로토타입을 찾을 수 없습니다: ID ${handlerId}`);
    }
    return handlers[handlerId].protoType;
}