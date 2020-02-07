const initialState = {
    loginError: null,
    loginLoading: false,
    loginMessage: null,
    registerLoading: false,
    registerError: null,
    registerMessage: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN_LOADING':
            return {
                ...state,
                loginLoading: true,
            };
        default: 
            return state;
    }
}
