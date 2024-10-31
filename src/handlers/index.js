import initialHandler from "./user/initial.handler.js";
import { HANDLER_IDS } from "../constants/handlerIds.js";

const handlers={
    [HANDLER_IDS.INITIAL]:{
        handler:initialHandler,
        protoType:'initial.InitialPacket'//handler에서 사용하는 payload의 이름
    }
};


//handlerid를 가지고 조회하는 함수 
export const getHandlerById=(handlerId)=>{
    if(!handlers[handlerId]){
        console.log(`핸들러를 찾을 수 없습니다: ID ${handlerId}`);
    }
    return handlers[handlerId].handler;
};


//handlerId를가지고 proto를 조회하는 함수
export const getPrototypeNameByHandlerId=(handlerId)=>{
    if(!handlers[handlerId]){
        console.eroor(`프로토를 찾을 수 없습니다 :ID${handlerId}`);
    }
    return handlers[handlerId]
}