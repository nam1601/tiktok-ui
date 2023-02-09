import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import config from '~/config';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeIconActive,
    UserGroupIcon,
    UserGroupIconActive,
    LiveIcon,
    LiveIconActive,
} from '~/components/Icons';
import { useContext, useEffect, useState } from 'react';

import * as service from '~/services/services';

import SideBarStage from './SideBarStage';
import Discover from './Discover';
import Footer from '../Footer';
import { AuthUserContext } from '~/App';

const cx = classNames.bind(styles);
function Sidebar() {
    const authUser = useContext(AuthUserContext);
    // useEffect(() => {
    //     window.addEventListener('storage', () => {
    //         const newToken = localStorage.getItem('Token');
    //         setToken(newToken);
    //     });
    // }, [token]);
    // const [suggest, setSuggest] = useState([]);
    // useEffect(() => {
    //     const fetchSuggested = async () => {
    //         const response = await service.suggestAccount(1, 5);
    //         setSuggest(response);
    //     };
    //     fetchSuggested();
    // }, []);
    // const [followed, setFollowed] = useState([]);
    // useEffect(() => {
    //     const fetchFollowed = async () => {
    //         const response = await service.followList(1, 5, authUser.meta.token);
    //         setFollowed(response);
    //     };
    // }, [authUser.meta.token]);
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="For you" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeIconActive />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupIconActive />}
                />
                <MenuItem
                    title="Livestream"
                    to={config.routes.profile}
                    icon={<LiveIcon />}
                    activeIcon={<LiveIconActive />}
                />
            </Menu>
            <SideBarStage title="Suggested Account" />
            {authUser && (
                <SideBarStage
                    title="Following"
                    // apiLink={service.followList('1', '5', authUser.meta.token)}
                    token={authUser.meta.token}
                />
            )}

            <Discover />
            <Footer />
        </aside>
    );
}

export default Sidebar;
