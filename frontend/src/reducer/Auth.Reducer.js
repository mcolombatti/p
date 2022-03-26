
export function AuthReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            } 
    case 'USERID':
            return {
                ...state, 
                userid: action.payload
            } 
    
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null
            } 
        case 'REGISTER':
            return {
                ...state,
                isAuthenticated: false,
                user: null
            } 
    
        default:
            return state;
    }
}
    