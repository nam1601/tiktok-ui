import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faCoins,
    faGear,
    faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import 'tippy.js/dist/tippy.css'; // optional
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import image from '~/assets/images';
import Button from '~/components/Button/Button';
import Menu from '~/components/Popper/Menu/Menu';
import Image from '~/components/Image/Image';
import Search from '../Search/Search';
import config from '~/config';
import styles from './Header.module.scss';
import * as service from '~/services/searchService';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English ',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'VietNamese',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'VietNamese',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
];

function Header() {
    const tokenItem = JSON.parse(localStorage.getItem('Token'));
    const [user, setUser] = useState({});
    const [isLogin, setIsLogin] = useState(false);
    const [token, setToken] = useState(tokenItem ?? '');
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:
                break;
        }
    };
    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coin',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
            title: 'Log out',
            to: '/logout',
            separate: true,
        },
    ];
    const Login = () => {
        const getCurrentUser = async () => {
            const response = await service.login();
            setUser(response.data);
            setToken(response.meta.token);
        };
        getCurrentUser();
        setIsLogin(true);
    };
    // useEffect(() => {
    //     const getCurrentUser = async () => {
    //         const response = await service.login();
    //         setUser(response.data);
    //         setToken(response.meta.token);
    //     };
    //     getCurrentUser();
    // }, [isLogin]);
    useEffect(() => {
        const newToken = JSON.stringify(token);
        localStorage.setItem('Token', newToken);
    }, [user]);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={image.logo} alt="tiktok" />
                </Link>
                <div>
                    <Search />
                </div>

                <div className={cx('actions')}>
                    {isLogin && (
                        <>
                            <Tippy delay={[0, 100]} content="Upload video" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <UploadIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Message" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 100]} content="Inbox" placement="bottom">
                                <button className={cx('actions-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                            <Menu items={USER_MENU} onChange={handleMenuChange}>
                                <Link>
                                    <Image className={cx('user-avatar')} src={user.avatar} alt={user.first_name} />
                                </Link>
                            </Menu>
                        </>
                    )}
                    {!isLogin && (
                        <>
                            <Button className={cx('upload-btn')} text>
                                Upload
                            </Button>
                            <Button primary onClick={Login}>
                                Log in
                            </Button>
                            <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            </Menu>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
