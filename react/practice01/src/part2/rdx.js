

const initialValue = value = 0;

export const CounterSlice = CreateSlice({
    name:"counter",
    reducers: {
        increament : (state) => {
            state.value +=1;
        },
        decrement:(state) =>{
            state.value -= 1;
        }
    }
})

export const