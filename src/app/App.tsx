import React, { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { NavBar } from 'widgets/NavBar';
import { Sidebar } from 'widgets/Sidebar';
import AppRouter from 'app/providers/router/ui/AppRouter';

const App = () => (
    <div className={classNames('app', {}, [])}>
        <Suspense fallback="">
            <NavBar />
            <div className="content-page">
                <Sidebar />
                <AppRouter />
            </div>
        </Suspense>
    </div>
);

export default App;
