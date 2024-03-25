import { cartEmpty } from "../../core/helper/CartHelper"

export const signup = user => {
    return fetch('http://localhost:8000/api/user/', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch((err) => console.log(err))
}


export const login = (user)  =>{
    const formData = new FormData()

    for(const name in user){
        console.log(user[name])
        formData.append(name, user[name])
    }

    return fetch('http://localhost:8000/api/user/login/',{
        method: "POST",
        body: formData
    })
    .then(response => {
    console.log("SUCCESS", response);
    return response.json();
    })
    .catch((err) => console.log(err));
}


export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", JSON.stringify(data));
        next();
    }
}

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("token")) {
        return JSON.parse(localStorage.getItem("token"));
    } else {
        return false;
    }
};


export const logout = (next) => {
    const userId = isAuthenticated() && isAuthenticated().user.id

    console.log("USERID: ", userId)

    if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        cartEmpty(() => {});

        return fetch("http://localhost:8000/api/logout/" + userId, {method:"GET"})
        .then(response => {
            console.log("Signout Success");
            next();
        })
        .catch((err) => console.log(err))
    }
}