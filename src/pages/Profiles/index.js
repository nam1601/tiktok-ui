import { faCircleCheck, faVideo } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import { useEffect, useContext, useState } from 'react';

import Button from '~/components/Button';
import * as service from '~/services/searchService';
import styles from './Profiles.module.scss';
import Image from '~/components/Image';
import { AuthUserContext } from '~/App';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function Profiles() {
    const authUser = useContext(AuthUserContext);
    const [user, setUser] = useState({});
    // const currentURL = document.URL;
    // const handleURL = () => currentURL.search('@');
    // const searchParams = currentURL.slice(handleURL() + 1);
    const { nickname } = useParams();
    const accessToken = authUser && authUser.meta.token ? authUser.meta.token : '';
    const category = [
        {
            title: 'Videos',
            icon: <FontAwesomeIcon icon={faVideo} />,
        },
        {
            title: 'Liked',
            icon: <FontAwesomeIcon icon={faHeart} />,
        },
    ];
    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await service.getAUser(nickname, accessToken);
            setUser(response);
        };
        fetchUserInfo();
    }, [accessToken, nickname]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('general')}>
                    <Image src={user.avatar} alt="" />
                    <div className={cx('name')}>
                        <div className={cx('nick-name')}>
                            <h2>{user.nickname}</h2>
                            {user.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCircleCheck} />}
                        </div>
                        <h1 className={cx('full-name')}>{user.first_name + ' ' + user.last_name}</h1>
                        <Button outline className={cx('message-btn')}>
                            Message
                        </Button>
                    </div>
                </div>
                <div className={cx('introduces')}>
                    <span>
                        <strong>{user.followings_count}</strong> Followings
                    </span>
                    <span>
                        <strong>{user.followers_count}</strong> Followers
                    </span>
                    <span>
                        <strong>{user.likes_count}</strong> Likes
                    </span>
                </div>
                <span className={cx('bio')}>{user.bio}</span>
            </div>
            <div className={cx('category')}>
                {category.map((item, index) => (
                    <div className={cx('category-title')} key={index}>
                        {item.title}
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Profiles;
