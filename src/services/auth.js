import instance from './axios';

export const search = async (data, token) =>
  (
    await instance.post(
      '/auth/search',
      {
        ...data,
      },
      {
        headers: {
          'auth-token': token,
        },
      }
    )
  ).data;

export const getById = async (id, token) =>
  (
    await instance.get('/auth/' + id, {
      headers: {
        'auth-token': token,
      },
    })
  ).data;

export const register = async (data) =>
  await instance.post('/auth/register', {
    ...data,
  });

export const login = async (data) =>
  await instance.post('/auth/login', {
    ...data,
  });

export const changePassword = async (data, token) =>
  await instance.post(
    '/auth/change-password',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );

export const remove = async (data, token) =>
  await instance.post(
    '/auth/delete',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );

export const update = async (data, token) =>
  await instance.post(
    '/auth/update',
    {
      ...data,
    },
    {
      headers: {
        'auth-token': token,
      },
    }
  );
