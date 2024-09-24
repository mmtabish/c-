import {useSelector,Provider,connect} from 'react-redux';
import {createStore} from 'redux';

//reducer

const reducer1 = (state ={count:0},  action)=> {

    switch(action.type){
        case'INCREAMENT':
    }
}



const INCREAMENT ="redux/increment";
const initialState1 ={
    counter:0,
};





// store 

import {createStore} from "redux";
import {reducer} from "./reduxModule";

const store = createStore(reducer);

// get state

const state = store.getState();


//action & reducer

// A reducer is a function that determines how the state of an application changes in response to an action. 
// It’s a core concept in Redux, a state management library for JavaScript applications. Here’s a simple way to understand reducers:




export const reducer =(state = initialState, action) => {
    switch (action.type){
        case INCREAMENT:
            return {
                counter: state.counter + action.amount
            };
            default:
                return state;
    }
};


// sleltor are function that know that how extract the specific pieces


const initialState = {value: 0 }

const selectCountValue = state => state.value;

const currentValue = selectCounterValue(store.getState);
console.log(currentValue);



const AddItem = {

    item : 'list_of_item',
    payload:{id: 1, name:'apple'}

}

function CartReducer({state[], action}){

}