import { api } from "./Api"

export const deleteUser = async (path) => {
    return await api.delete(path)
}