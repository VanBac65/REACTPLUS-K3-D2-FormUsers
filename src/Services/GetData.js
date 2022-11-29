import { api } from "./Api";

export const getData = async (path, options) => {
    const response = await api.get(path)
    return response.data
};