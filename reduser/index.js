const initialState = {
    storeLocale: {},
    locale: {},
    // thisLocale: 'ru',
    // locale: {},
    stateForm: {
        email: '',
        password: ''
    }
};

export default (state = initialState, action) => {
    // GETEDLOCALE
    if (action.type === "GETEDLOCALE") {
        if (state.storeLocale[action.nameLocale]) {
            const locale = state.storeLocale[action.nameLocale];
            return {
                ...state,
                locale
            };
        } else {
            const storeLocale = { ...state.storeLocale };
            storeLocale[action.nameLocale] = action.data;
            const locale = storeLocale[action.nameLocale];
            return {
                ...state,
                storeLocale,
                locale
            };
        };
    };

    // if (action.type === "GETEDLOCALE") {
    //     if (state.locale[action.nameLocale]) {
    //         const thisLocale = action.nameLocale;
    //         return {
    //             ...state,
    //             thisLocale
    //         };
    //     } else {
    //         const locale = { ...state.locale };
    //         locale[action.nameLocale] = action.data;
    //         const thisLocale = action.nameLocale;
    //         return {
    //             ...state,
    //             thisLocale,
    //             locale
    //         };
    //     };
    // };

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