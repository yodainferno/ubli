import React, { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const availableRoutes = useMemo(
        () => Object.values(routeConfig).filter(
            // авторизован или публичная страница
            (route) => isAuth || !route.authOnly,
        ),
        [isAuth],
    );

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {
                    availableRoutes.map(({ path, element }) => (
                        <Route
                            key={path}
                            path={path}
                            element={<div className="page-wrapper">{element}</div>}
                        />
                    ))
                }
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
