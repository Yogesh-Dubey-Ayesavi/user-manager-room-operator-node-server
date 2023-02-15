export class UserManager{

    constructor() {
        this.userList = ['u1','u2']
        this.c = null;
    }

    add(data){
        this.userList.push(data);
    }

    getIndex(item,data){
        return item?.name == data?.user?.name;
    }

    delete(data,res){
try{    res = this.userList.findIndex((item)=>{
            return this.getIndex(item,data)
          })
    this.userList.splice(res,res++);
          return true;
}
catch(e){
    console.debug(e)
    return false
}
    
    }


}