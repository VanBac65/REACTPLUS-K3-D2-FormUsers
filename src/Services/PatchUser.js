import { api } from './Api';

export const patchUser = async (path, body) => {
    return await api.put(path, {
        firstName: body?.firstName,
        lastName: body?.lastName,
        gender: body?.gender,
        phone: body?.phone,
        address: body?.address,
        dateOfBirth: body?.dateOfBirth,
        school: body?.school,
        isGraduate: body?.isGraduate,
        email: body?.email,
        favourites: body?.favourites,
    })
};