export default (lang, dispatch, storeLocale) => {
    if (storeLocale[lang]) {
        dispatch({ type: 'GETEDLOCALE', nameLocale: lang });
    } else {
        fetch(`https://dev1.glaz.systems/api/v1.2/localization/${lang}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "GETEDLOCALE", data, nameLocale: lang });
            });
    };
};