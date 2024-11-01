import net from 'net';
import initServer from './init/index.js';
import {config} from './config/config.js'
import { onConnection } from './events/onConnection.js';
const PORT = 5555;

const server = net.createServer(onConnection);//서버연결을 events폴더에 onConnection파일에서 관리


initServer().then(()=>{
    server.listen(config.server.port,config.server.host, () => {
        console.log(`서버가 ${config.server.host}: ${config.server.port}에서 실행 중입니다.`);
        console.log(server.address());
    });
}).catch((e)=>{
    console.error(e);
    process.exit(1);
})