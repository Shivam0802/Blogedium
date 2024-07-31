import {  createContext, useEffect, useReducer } from "react";

const initialState = {
    currentUser: JSON.parse(localStorage.getItem('user')),
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                currentUser: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                currentUser: null,
            };
        default:
            return state;
    }
}

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
       localStorage.setItem('user', JSON.stringify( state.currentUser ));
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };