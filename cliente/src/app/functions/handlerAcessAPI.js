'use server'

const url = "http://localhost:3001"
const getUserAuthenticated = async (user) =>{

    const responseOfApi = await fetch(url + "/user/authenticated",
    {
        method:"POST",
        headers:{"Content-type":"Application/json"},
        body: JSON.stringify(user)
    });
    const userAuth = await responseOfApi.json();
    return userAuth;
}

const getUsers = async() =>{

  try {
        const responseOfApi = await fetch(url+ "/usuarios/listar", {
        cache:"no-cache",
        headers:{
            Cookie:`token=${token}`
        }
        })
        const users = await responseOfApi.json();
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
