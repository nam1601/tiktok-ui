import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes/routes.js';
import { DefaultLayout } from '~/components/layouts';
import { Fragment, createContext } from 'react';

export const AuthUserContext = createContext();

function App() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    console.log(authUser);
    console.log(publicRoutes);
    return (
        <AuthUserContext.Provider value={authUser}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((publicRoute, index) => {
                            const Page = publicRoute.component;
                            let Layout = DefaultLayout;
                            if (publicRoute.layout) {
                                Layout = publicRoute.layout;
                            } else if (publicRoute.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={publicRoute.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AuthUserContext.Provider>
    );
}
export default App;
