// const API_URL = 'http://localhost:3000/api/v1'
const API_URL = process.env.REACT_APP_API_URL;
const VER = '/api/v1';

export const loginUrl = `${API_URL}${VER}/login`;
export const LoggedinUrl = `${API_URL}${VER}/logged_in`;
export const logoutURL = `${API_URL}${VER}/logout`;

export const root = `${API_URL}${VER}/`;
export const signupURL = `${API_URL}${VER}/signup`;
// 編集へ
export const userEditURL = (userId) => `${API_URL}${VER}/users/${userId}`;
// お気に入りへ//削除も一緒
export const favoURL = (recipeId) => `${API_URL}${VER}/recipes/${recipeId}/favorites`;
export const getFavoURL = (userId) => `${API_URL}${VER}/users/${userId}`;
export const setFavoURL = (recipeId) => `${API_URL}${VER}/recipes/${recipeId}/setFavo`;

export const mypage = (userId) => `${API_URL}${VER}/${userId}`;
export const post = `${API_URL}${VER}/recipes`;
export const index = `${API_URL}${VER}/recipes`;
export const recipeEditURL = (recipeId) => `${API_URL}${VER}/recipes/${recipeId}`;
