import { useContext, createContext, useReducer } from 'react'
import { AuthReducer } from '../reducer/Auth.Reducer.js'

const AuthContext = createContext()

export function AuthProvider( { children }){
    const [state, dispatch] = useReducer(AuthReducer, { isAuthenticated: false, user: null})

    return (
        <AuthContext.Provider value ={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}