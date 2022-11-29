import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "../Services/GetData";

export const getUsers = createAsyncThunk('/users', async (path) => {
    const dataUsers = await getData(path)
    return dataUsers.items
})

export const getUser = createAsyncThunk('/user', async (path) => {
    const dataUser = await getData(path)
    return dataUser
})

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        listUsers: [],
        user: {}
    },
    reducers: {
        clear_user(state) {
            state.user = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state, actions) => {

            }).addCase(getUsers.rejected, (state, actions) => {

            }).addCase(getUsers.fulfilled, (state, actions) => {
                state.listUsers = actions?.payload?.map((user) => {
                    return ({
                        ...user, key: user.id
                    })
                })
            })
            .addCase(getUser.fulfilled, (state, actions) => {
                state.user = actions.payload
            })
    }
})

export const { actions, reducers } = usersSlice
export const { clear_user } = actions
export default usersSlice.reducer