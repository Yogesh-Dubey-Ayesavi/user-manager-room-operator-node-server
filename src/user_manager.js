export class UserManager{

    constructor() {
        this.userMap = {}
    } 

    add(data){
        !Object.entries(this.userMap).includes(data?.uid)? 
           this.userMap[data?.uid] = data?.user : this.userMap[data?.uid] = this.userMap[data?.uid].sid;
        }


    delete(data){
    try {    
        delete this.userMap[data?.uid];
        return true
    }
    catch(e){
        console.debug(e)
        return false
    }

    }

    confirmation(usersList){
       return usersList.find((item)=>{
            if (this.userMap[item?.uid]!=null){
                
                     return this.delete(item)
            }
            else {
                return false
            }
        });
    }

    async recommendation(user){
 /// addition of user
        this.add(user);
        let sampleUserList ;
        
       /// sequentially defining them.
        sampleUserList = Object.values(this.userMap)
        sampleUserList.sort((a,b)=>{
         return Math.abs(a?.age - user?.age)  < Math.abs(b?.age - user?.age) ? -1: Math.abs(a?.age - user?.age ) == Math.abs(b?.age - user?.age)?0:1;
        })
        return this.confirmation(sampleUserList.slice(0,5)) 
        // for (let i = 0 ;i < Object.length(this.userMap) ;i++){

        // }

        // profiling is the most important thing to do t
        /// take user data recommend and send rooms with respective id's
        /// nearest Age Group
        /// common matching channels 
        /// irrespective of gender

        

    }


}