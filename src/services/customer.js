import instance from './axios';

export const search = async (data) => (await instance.post('/customer/search', {
  ...data
})).data;

export const getById = async (id) => (await instance.get('/customer/' + id)).data;

export const remove = async (data) => (await instance.post('/customer/delete', {
  ...data
}));

export const update = async (data) => (await instance.post('/customer/update', {
  ...data
}));

export const create = async (data) => (await instance.post('/customer/create', {
  ...data
}));
