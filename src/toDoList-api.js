import request from 'superagent';
// TODO: change this URL depending on environment
const URL = process.env.REACT_APP_API_URL;
// prevents having to login every time we make a change in react

export function signUp(userData) {
    try {
        return request.post(`${URL}/auth/signup`, userData);
    } catch(e) {
        throw { error: e.message }
    }
}

export function signIn(userData) {
    try {
        return request.post(`${URL}/auth/signin`, userData);
    } catch(e) {
        throw { error: e.message }
    }
}

export function fetchtoDoList() {
    const token = localStorage.getItem('token');

    try{
        return request
            .get(`${URL}/api/toDoList`)
            .set('Authorization', token);
    } catch(e) {
        return { error: e.message }
    }
}


export function fetchListItem(id) {
    const token = localStorage.getItem('token');

    return request.get(`${URL}/api/toDoList/${id}`)
        .set('Authorization', token);
}

export function deleteListItem(id) {
    const token = localStorage.getItem('token');

    return request.delete(`${URL}/api/toDoList/${id}`)
        .set('Authorization', token);
}

export function updateListItem(id, updatedListItem) {
    const token = localStorage.getItem('token');

    return request.put(`${URL}/api/guitars/${id}`, updatedListItem)
        .set('Authorization', token);   
}
  
// lets assume they pass us some guitar data . . .
export function createListItem(listItemData) {
    const token = localStorage.getItem('token');

    return request.post(`${URL}/api/toDoList`, listItemData)
        .set('Authorization', token);
}