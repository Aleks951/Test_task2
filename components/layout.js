import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

function layout({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { lang } = router.query;
    if (lang === undefined) {
        fetch("https://dev1.glaz.systems/api/v1.2/localization/ru")
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "GETEDLOCALE", data, nameLocale: 'ru' });
            });
    } else {
        fetch(`https://dev1.glaz.systems/api/v1.2/localization/${lang}`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    router.push('/')
                } else {
                    dispatch({ type: "GETEDLOCALE", data, nameLocale: lang });
                };
            });
    };

    return (
        <>
            {children}
        </>
    );
};

export default layout;