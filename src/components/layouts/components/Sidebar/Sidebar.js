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
import * as searchService from '~/services/searchService';

import SideBarStage from './SideBarStage';
const cx = classNames.bind(styles);
function Sidebar() {
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
            <SideBarStage title="Suggested Account" apiLink={searchService.search('n')} />
            <SideBarStage title="Following" apiLink={searchService.search('n')} />
        </aside>
    );
}

export default Sidebar;
