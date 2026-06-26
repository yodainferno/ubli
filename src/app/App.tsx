import React from 'react';
import './styles/index.scss';
import {classNames} from 'shared/lib/classNames/classNames'
import {useTheme} from "app/providers/ThemeProvider";
import {NavBar} from "widgets/NavBar";
import {SideBar} from "widgets/SideBar";
import AppRouter from "./providers/router/ui/AppRouter";

const App = () => {
    const {theme} = useTheme();

    return (
        <div className={classNames("app", {}, [theme])}>
            <NavBar />
            <div className="content-page">
                <SideBar />
                <AppRouter />
            </div>
        </div>
    );
};

export default App;
