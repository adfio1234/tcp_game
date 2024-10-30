import { loadGameAssets } from "./assets.js";
import { loadProtos } from "./loadProtos.js";


const initServer = async () => {
    try {
        await loadGameAssets();
        await loadProtos();
    } catch (e) {
        console.error(e);
        process.exit(1);//서버가켜지기전에 실행되므로 loadGameAssets가 실패시 프로세스 종료
    }
}

export default initServer;