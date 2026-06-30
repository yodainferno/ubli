import React, { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { NavBar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import AppRouter from 'app/providers/router/ui/AppRouter';

const App = () => {
    const { theme } = useTheme();

    // useEffect(() => {
    //     if (Math.random() < 0.5) {
    //         throw new Error();
    //     }
    // }, []);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <NavBar />
                <div className="content-page">
                    <Sidebar />
                    <AppRouter />
                </div>
            </Suspense>
        </div>
    );
};

export default App;
