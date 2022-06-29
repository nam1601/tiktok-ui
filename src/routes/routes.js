import { HeaderOnly } from '~/components/layouts';
import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profiles from '~/pages/Profiles';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Setting from '~/pages/Setting';
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.profile,
        component: Profiles,
    },
    {
        path: config.routes.upload,
        component: Upload,
        layout: HeaderOnly,
    },
    {
        path: config.routes.search,
        component: Search,
        layout: null,
    },
    {
        path: config.routes.setting,
        component: Setting,
    },
];
const privateRoutes = [];
export { publicRoutes, privateRoutes };
