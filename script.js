import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

let extendUsers;

const collections = pb.collection('users').getFullList().then((data) =>{
    console.log("users",data);
});

const signup = pb.collection('signup').getFullList().then((user)=>{
    console.log("signup",user);
})

async function updateSignup(data) {
    const signup = pb.collection('signup').getFullList();
    return signup.update(data);
}