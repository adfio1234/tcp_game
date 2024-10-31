import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import protobuf from'protobufjs';
import {packetNames} from '../protobuf/packetName.js';

const __filename = fileURLToPath(import.meta.url);//file의절대경로를 찾는다
const __dirname = path.dirname(__filename);
//최상위경로+assets폴더
const protoDir = path.join(__dirname, '../protobuf');

const getAllprotoFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {//directory인지 아닌지 확인해라
            getAllprotoFiles(filePath, fileList);//directory면 재귀함수 호출
        } else if (path.extname(file) === '.proto') {
            fileList.push(filePath)
        }
    })
    return fileList;
}

const protoFiles = getAllprotoFiles(protoDir);



//proto메세지들을 저장할 객체| 호출해서 사용함
const protoMessages = {}


export const loadProtos=async()=>{
    try{
        const root=new protobuf.Root();//instance 생성

        //병렬처리로 로드
        await Promise.all(protoFiles.map((file)=>root.load(file)));

        for(const [packageName,types] of Object.entries(packetNames))
        {
            protoMessages[packageName]={};
            for(const [type,typeName] of Object.entries(types)){
                protoMessages[packageName][type]=root.lookupType(typeName);
            }
        }
        
        console.log(`protobuf파일이 로드되었습니다.`);
    }catch(error){
        console.log(`protobuf파일 로드중 오류가 발생했습니다`,error);
    }
}


//protoMessages원본 변경 확률줄이기위해 얕은복사해서 사용
export const getProtoMessages=()=>{
    return{...protoMessages};//얕은복사
}