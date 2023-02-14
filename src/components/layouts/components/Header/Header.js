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
import * as service from '~/services/services';

import { useState, useContext } from 'react';
import { AuthUserContext } from '~/App';
import LoginModal from '~/components/LoginModal/LoginModal';

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
    const authUser = useContext(AuthUserContext);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                break;
            default:
                break;
        }
        switch (menuItem.to) {
            case '/@profile':
                window.location.href = `/@${authUser.data.nickname}`;
                break;
            default:
                break;
        }
    };
    const USER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View Profile',
            to: '/@profile',
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
            to: '/',
            separate: true,
            logOut: true,
        },
    ];
    const Login = () => {
        const getCurrentUser = async () => {
            const response = await service.login();
            localStorage.setItem('user', JSON.stringify(response));
            window.location.reload();
        };
        getCurrentUser();
    };
    // const Login = () => {
    //     setIsOpenModal(true);
    // };
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
                    {authUser ? (
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
                                    <Image
                                        className={cx('user-avatar')}
                                        src={authUser.data.avatar}
                                        alt={authUser.data.first_name}
                                    />
                                </Link>
                            </Menu>
                        </>
                    ) : (
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
                            {/* {isOpenModal && <LoginModal />} */}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
