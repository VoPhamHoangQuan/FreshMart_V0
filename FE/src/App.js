import { Fragment } from "react";
import { DefaultLayout } from "./components/layouts";
import { PrivateRoutes, PublicRoutes } from "./routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopUpNotify from "~/components/popupComponents/PopUpNotify";

function App() {
    return (
        <div className="App">
            <div id="catchaVerifier"></div>

            <Router>
                <Routes>
                    {PublicRoutes.map((route, key) => {
                        let Layout = DefaultLayout;
                        const Component = route.component;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {PrivateRoutes.map((route, key) => {
                        let Layout = DefaultLayout;
                        const Component = route.component;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={key}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Component />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
