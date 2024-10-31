import { getProtoMessages } from "../../init/loadProtos.js"

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
        console.error(e);
    }

    const handlerId=packet.handlerId;
    const userId=packet.userId;
    const clientVersion=packet.clientVersion;
    const payload=packet.payload;
    const sequence=packet.sequence;

    console.log(`clientVersion: ${clientVersion}`);

    return {handlerId,packet,payload,sequence};
};