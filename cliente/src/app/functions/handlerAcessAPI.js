'use server'

const url = "https://aula-17-10-xi.vercel.app"
const getUserAuthenticated = async (user) =>{
    
    const responseOfApi = await fetch(url + "/user/authenticated",
    {
        method:"POST",
        headers:{"Content-Type":"Application/json"},
        body: JSON.stringify(user)
    });
    console.log(user)
    const userAuth = await responseOfApi.json();
    console.log(userAuth)
    return userAuth;
}

const getUsers = async() =>{
  try {
        const responseOfApi = await fetch(url+ "/users", {
        cache:"no-cache",
        })
        const users = await responseOfApi.json()
        return users
    } catch {
        return null
    }
}


const postUser = async(user) =>{
    try {
        const responseOfApi = await fetch(url+ "/user", {
        method:"POST",
        headers: {'content-Type':'Application/json'},
        body: JSON.stringify(user)
        })
        const userSave = await responseOfApi.json()
        return userSave
    } catch {
        return null
    }
}

export { getUsers, getUserAuthenticated, postUser };
