import { createSlice } from "@reduxjs/toolkit"
import { fetchHouses, replaceComentById } from "./AsuncThunk"




const mainSLice = createSlice({
    name: 'main', 
    initialState: {
        houses: [],
        statusOfCReatingHouse: 'idle',
        isLoading: true,
        isTop: false,
    },
    reducers: {
        setStatusOfFulfiledHouses: (state) => {
            state.statusOfCReatingHouse = 'idle'
        },
        setIsTop: (state) => {
            state.isTop = !state.isTop
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHouses.fulfilled, (state, action) => {
            state.houses = action.payload
            state.isLoading = false
            console.log(state.houses);
            console.log(action.payload);
        }),
        // builder.addCase(replaceComentById.fulfilled, (state, action)=>{
        //     state.houses.coments = action.payload.coments
        //     console.log(state.houses.coments);
        //     console.log(action.payload.data.coments);
        // })
        builder.addCase(replaceComentById.fulfilled, (state, action) => {
        const updatedHouse = action.payload;
        const index = state.houses.findIndex((h) => h.id === updatedHouse.id);

        if (index !== -1) {
            state.houses[index] = updatedHouse;
        }
})

    }
})


export const {incremented, decremented,setStatusOfFulfiledHouses } = mainSLice.actions
