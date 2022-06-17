import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes/index.js';
import { DefaultLayout } from '~/components/Layout';
import { Fragment } from 'react';
function App() {
    return (
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
                        console.log(publicRoute.layout);
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
    );
}
export default App;
