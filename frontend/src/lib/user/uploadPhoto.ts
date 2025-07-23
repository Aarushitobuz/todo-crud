import api from '@/lib/api';

export const uploadProfilePhoto = async (file: File) => {
    const formData = new FormData();
    formData.append('profilePhoto', file);

    const response = await api.post('/user/upload-photo', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
  return response.data;
};
