import PocketBase from 'pocketbase';

export const client = new PocketBase("http://127.0.0.1:8090");



const loginpb = new PocketBase("http://127.0.0.1:8090");
loginpb.autoCancellation(false);

export { loginpb };

//new

export const adminpb = new PocketBase("http://127.0.0.1:8090");

export const login = new PocketBase("http://127.0.0.1:8090");