import * as actionTypes from "./actionTypes";

export function getUserDetailSuccess(user) {
  return { type: actionTypes.GET_USER_DETAIL_SUCCESS, payload: user };
}
export function getUserDetail(id = "5fdf3f4bef1da737b0ebc285") {
  return function (dispatch) {
    let url = "http://localhost:3000/api/user/" + id;
    return fetch(url)
      .then((response) => response.json())
      .then((result) => {
        dispatch(getUserDetailSuccess(result));
      });
  };
}

export function postUserRegisterSuccess(register) {
  console.log(register)
  return { type: actionTypes.POST_USER_REGISTER_SUCCESS, payload: register };
}

export function postUserLoginSuccess(login) {
  return { type: actionTypes.POST_USER_LOGİN_SUCCESS, payload: login };
}
export function postUserLoginApi(email,password) {
  console.log(email,password);
  return fetch("http://localhost:3000/api/user/login", {
    method:"POST",
    headers: { "content-type": "application/json",
    'Accept': 'application/json' },
    body: JSON.stringify({
      email:email,
      password:password,
    }),
  })
      .then(handleLoginResponse)
    .catch(handleLoginError);
}
export function postUserLogin(email,password) {
  console.log(email,password);
  return function (dispatch) {
    return postUserLoginApi(email,password)
      .then((postUserLogin) => {
       dispatch(postUserLoginSuccess(postUserLogin));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export function postUserRegisterApi(name,email,password,id) {
  console.log(name,email,password);
  return fetch("http://localhost:3000/api/user/register", {
    method: id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then(handleResponse)
    .catch(handleError);
}
export function postUserRegister(name,email,password,id) {
  console.log(name,email,password);
  return function (dispatch) {
    return postUserRegisterApi(name,email,password,id)
      .then((postUserRegister) => {
        id ? dispatch() : dispatch(postUserRegisterSuccess(postUserRegister));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("Hata..");
  throw error;
}
export async function handleLoginResponse(response) {
  if (response.ok) {
    console.log("giriş yapıldı");
    //return response.json();
  }
  else{
  const error = await response.text();
  throw new Error(error);
}
}

export function handleLoginError(error) {
  console.error(error);
  throw error;
}