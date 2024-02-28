import React, { createContext, useContext, useReducer } from 'react'
const cartStateContext = createContext();
const cartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case "REMOVE":
            return state.filter((item) => item._id !== action.payload)
        default:
            return console.log("reducer undefined")
    }

}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <cartStateContext.Provider value={state}>
            <cartDispatchContext.Provider value={dispatch}>
                {children}
            </cartDispatchContext.Provider>
        </cartStateContext.Provider>
    )
}
export const useCart = () => useContext(cartStateContext)
export const useDispatchCart = () => useContext(cartDispatchContext)
