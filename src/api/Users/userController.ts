import { User } from "./userModel"

export default function (fastify : any ) {

    const showAll = async (request : any , reply : any )=> {
        const res = await User.find();
        reply.code(201).send(res);
    }

    const register = async (request : any, reply : any)=> {
        const user : User = request.body;
        user.password = await fastify.bcryptHash(user.password);
        if(await User.findOne({username : user.username}))
        {
            reply.code(400).send({message: "User exists"});
        }
        user.following = "{}";
        user.followers = "{}";
        user.isLoggedIn = false;
        await User.save(user);
        reply.code(201).send({message:"user created."});
    }

    const login = async (request : any, reply : any) => {
        const {username, password} = request.body; 
        let singleUser = await User.findOne({username});
        
        
        if(singleUser && singleUser.isLoggedIn !== true){

            if(await fastify.checkHash(password, singleUser.password)){
                
                singleUser.isLoggedIn = true;
                await User.save(singleUser);
                reply.code(201).send({message: "User logged in."});
            }
        }
        else if(singleUser && singleUser?.isLoggedIn === true){
            reply.code(201).send({message: "User alredy logged in. Log out."});
        }
        reply.code(400).send({message: "Credentials invalid"})
        // reply.code(400).send({message: "Credentials don't match."});

    }

    const logout = async (request : any, reply : any) => {
        const username = request.params.username; // Check how to save id and logout by id. Can just be added to api 

        let singleUser = await User.findOne({username});

        if(singleUser && singleUser.isLoggedIn === true){
            singleUser.isLoggedIn = false;
            await User.save(singleUser);
            reply.code(201).send({message: "User logged out."});
        }
        else {
            reply.code(400).send({message: "User is not logged in."});
        }
    }
    const follow = async (request : any, reply : any) => {
        const currentUser  = request.params.currentUserUsername;
        const followUser = request.params.followUserUsername;

        let oCurrentUser = await User.findOne({'username': currentUser});
        let oFollowUser = await User.findOne({'username' :followUser});
        
        // let aFollowingArray = oCurrentUser?.following!;
        // let aFollowerArray = oFollowUser?.followers!;

        let aJsonFollowing = JSON.parse(oCurrentUser?.following!);
        let aJsonFollowers = JSON.parse(oFollowUser?.followers!);

        let aJavaScriptArrayFollowing = [];
        let aJavaScriptArrayFollowers = [];

        for(let i in aJsonFollowing){
            if(aJsonFollowing[i] === typeof(Number)){
                aJavaScriptArrayFollowing.push([i, aJsonFollowing[i]])
            }
            
        }
        for(let j in aJsonFollowers){
            if(aJsonFollowers[j] === typeof(Number)){
                aJavaScriptArrayFollowers.push([j, aJsonFollowers[j]])
            }
        }
        
        aJavaScriptArrayFollowing.push(oFollowUser?.id);
        aJavaScriptArrayFollowers.push(oCurrentUser?.id);
        
        if(oCurrentUser && oFollowUser){
            oCurrentUser.following = JSON.stringify(aJavaScriptArrayFollowing);
            oFollowUser.followers = JSON.stringify(aJavaScriptArrayFollowers);

            await User.save(oCurrentUser);
            await User.save(oFollowUser);
            reply.code(201).send({message:"User followed."});
        }
    
    }  
    return {
        showAll,
        register,
        login,
        logout,
        follow
        
    }
}