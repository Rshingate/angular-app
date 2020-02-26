export class User{

    constructor(public email:string,public userId:string,public _token:string,private _expiresIn:Date){}

    get token()
    { 
        return this._token;
    }
    
}