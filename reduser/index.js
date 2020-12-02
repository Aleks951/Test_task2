const initialState = {
    locale: {},
    stateForm: {
        email: '',
        password: ''
    }
};

export default (state = initialState, action) => {
    // GETEDLOCALE
    if (action.type === "GETEDLOCALE") {
        return {
            ...state,
            locale: action.data
        };
    };

    // CHANGEDFORM
    if (action.type === "CHANGEDFORM") {
        const newStateForm = {
            ...state.stateForm
        };

        newStateForm[action.name] = action.value;
        
        return {
            ...state,
            stateForm: newStateForm
        };
    };

    return state;
};