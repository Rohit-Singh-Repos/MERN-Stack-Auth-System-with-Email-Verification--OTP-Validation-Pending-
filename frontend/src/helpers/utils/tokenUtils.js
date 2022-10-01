const storeToken = (tokenValue) => {
    localStorage.setItem("authToken",tokenValue)
    // localStorage.setItem("authToken",JSON.stringify(tokenValue)) -- In case when storing objects
}

const getToken = () => {
    let token = localStorage.getItem("authToken")
    return token;
    // return JSON.parse(token) -- In case when parsing objects
}

const removeToken = (authKey) => {
    localStorage.removeItem(authKey)
}

export const TOKEN_UTILS = {
    storeToken,
    getToken,
    removeToken
}