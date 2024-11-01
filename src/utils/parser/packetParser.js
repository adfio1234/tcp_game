import { getPrototypeNameByHandlerId } from "../../handlers/index.js";
import { getProtoMessages } from "../../init/loadProtos.js"
import {config} from'../../config/config.js';
import CustomError from "../error/customError.js";
import { ErrorCodes } from "../error/errorCodes.js";




//최초로 데이터를 받는 onData.js에서 호출받음
//data에 byte배열이 들어간다.
export const packetParser=(data)=>{
    const protoMessages=getProtoMessages();

    //공통 패킷 구조 디코딩
    //common.proto
    const Packet=protoMessages.common.Packet;
    let packet;
    try{
        packet=Packet.decode(data);//decode해서 저장
    }catch(e){
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR,'패킷 디코딩 중 오류가 발생했습니다.');
    }
    const handlerId=packet.handlerId;//2
    const userId=packet.userId;//xyz
    const clientVersion=packet.clientVersion;//1.0.0
    const sequence=packet.sequence;//0

    // console.log(handlerId,userId,clientVersion,sequence);
    if(clientVersion!==config.client.version)
    {
        throw new CustomError(ErrorCodes.CLIENT_VERSION_MISMATCH,'클라이언트 버전이 다릅니다.');
    }

    //payload파싱
    const protoTypeName=getPrototypeNameByHandlerId(handlerId);
    // console.log(`protoTypeName: ${protoTypeName}`);
    if(!protoTypeName){
        throw new CustomError(ErrorCodes.UNKNOWN_HANDLER_ID,`알 수 없는 핸들러 ID:${handlerId}`);
    }

    const [namespace,typeName]=protoTypeName.split('.');
    const PayloadType=protoMessages[namespace][typeName];
    let payload;

    try{
        payload=PayloadType.decode(packet.payload);
    }catch(e){
        throw new CustomError(ErrorCodes.PACKET_DECODE_ERROR,'패킷 디코딩 중 오류가 발생했습니다.');
    }

    //decode할때 이러한 과정을 한번더 거침
    const errorMessage=PayloadType.verify(payload);
    if(errorMessage)
    {
        throw new CustomError(ErrorCodes.INVALID_PACKET,`패킷 구조가 일치하지 않습니다:${errorMessage}.`);
    }


    //필드가 비어있는 경우=필수 필드 누락
    const expectedFields=Object.keys(payloadType.fields);
    const actualFields=Object.keys(payload);
    //expectedFIelds에 있어야하는게 actualFields에 없으면 필수 필드 누락
    const missingFields=expectedFields.filter((field)=>!actualFields.includes(field));
    
    if(missingFields.length>0)
    {
        throw new CustomError(ErrorCodes.MISSING_FIELDS,`필수 필드가 누락되었습니다: ${missingFields.join(',')}`);
    }
    
    return {handlerId,userId,payload,sequence};
};