import instance from './axios';

export const uploadSingle = async (data) =>
  await instance({
    url: '/image/cloudinary-upload',
    method: 'POST',
    data,
  });

export const remove = async (data) =>
  await instance.post('/image/remove', data);
