class CustomError extends Error{
    constructor(code,message){
        super(message);//Error객체 생성자에서 받아오는 값
        this.code=code;
        this.name='CusomError';
    }
}

export default CustomError;