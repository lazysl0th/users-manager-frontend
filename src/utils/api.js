const apiConfig = {
  baseUrl: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}` : 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const register = async({name, email, password}) => {
  const res = await fetch(`${apiConfig.baseUrl}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig.headers,
    body: JSON.stringify({ name, email, password })
  });
  return checkResponse(res);
}

export const authorize = async ({email, password, remember}) => {
  const res = await fetch(`${apiConfig.baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig.headers,
    body: JSON.stringify({email, password, remember})
  })
  return await checkResponse(res);
}

export const checkToken = async () => {
  const res = await fetch(`${apiConfig.baseUrl}/users/me`, {
    method: 'GET',
    credentials: 'include',
  });
  return await checkResponse(res);
}

export const logout = async() => {
  const res = await fetch(`${apiConfig.baseUrl}/signout`, {
    method: 'GET',
    credentials: 'include',
  });
  return await checkResponse(res);
}

const checkResponse = async (res) => {
  if (res.ok) {
    return await res.json();
  }
  const errorData = await res.json();
  return Promise.reject(errorData); 
}

export const getUsers = async() => {
  const res = await fetch(`${apiConfig.baseUrl}/users`, {
    credentials: 'include',
    headers: apiConfig.headers
  });
  return await checkResponse(res);
}

export const deleteUsers = async(usersId) => {
  const res = await fetch(`${apiConfig.baseUrl}/users/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: apiConfig.headers,
    body: JSON.stringify({ usersId: usersId })
  });
  return await checkResponse(res);
}

export const deleteUnverifiedUsers = async() => {
  const res = await fetch(`${apiConfig.baseUrl}/users/status/unverified`, {
    method: 'DELETE',
    credentials: 'include',
    headers: apiConfig.headers,
  });
  return await checkResponse(res);
}

export const unblockUsers = async(usersId) => {
  const res = await fetch(`${apiConfig.baseUrl}/users/status/unblocked`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    credentials: 'include',
    body: JSON.stringify({ usersId: usersId })
  });
  return await checkResponse(res);
}

export const blockUsers = async(usersId) => {
  const res = await fetch(`${apiConfig.baseUrl}/users/status/blocked`, {
    method: 'PATCH',
    headers: apiConfig.headers,
    credentials: 'include',
    body: JSON.stringify({ usersId: usersId })
  });
  return await checkResponse(res);
}

export const changePassword = async({password, token}) => {
  console.log(password, token)
  const res = await fetch(`${apiConfig.baseUrl}/changepassword`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig.headers,
    body: JSON.stringify({ password, token})
  });
  return checkResponse(res);
}

export const resetPassword = async({email}) => {
  const res = await fetch(`${apiConfig.baseUrl}/resetpassword`, {
    method: 'POST',
    credentials: 'include',
    headers: apiConfig.headers,
    body: JSON.stringify({ email })
  });
  return checkResponse(res);
}