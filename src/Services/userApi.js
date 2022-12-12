import { api } from "./Api";

const userApi = () => {
    async function getData(path, options) {
        const response = await api.get(path)
        return response.data
    };

    async function deleteUser(path) {
        return await api.delete(path)
    }
}

export default userApi 