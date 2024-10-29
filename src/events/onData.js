import { config } from "../config/config.js";
import { TOTAL_LENGTH } from "../constants/header.js";
//스트림
export const onData = (socket) => async(data) => {


    socket.buffer = Buffer.concat([socket.buffer, data]);//들어오는 data를 계속 합쳐준다.

    //헤더의 전체 길이
    const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;


    while (socket.buffer.length >= totalHeaderLength)//헤더의 길이보다 길다면 데이터가 계속 온다는 뜻
    {
        const length = socket.buffer.readUInt32BE(0);
        const packetType = socket.buffer.readUInt8(config.packet.typeLength);

        if (socket.buffer.length>=length) {
            //packet처리
            const packet=socket.buffer.slice(totalHeaderLength,length);
            //다음 packet이 같이 올수도 있으므로 다시 집어넣는다
            socket.buffer=socket.buffer.slice(length);
            
            console.log(`length: ${length}, packetType: ${packetType}`);
            console.log(`packet ${packet}`);
        }
        else {
            //아직 전체 패킷이 도착 하지 않았음
            break;
        }

    }


}