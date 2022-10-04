import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';

import * as service from '~/services/searchService';
import styles from './Profiles.module.scss';

const cx = classNames.bind(styles);
function Profiles() {
    const [user, setUser] = useState({});
    let currentURL = document.URL;
    const handleURL = () => currentURL.search('@');
    const searchParams = currentURL.slice(handleURL() + 1);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await service.search(searchParams);
            setUser(response[0]);
        };
        fetchApi();
        console.log(user);
    }, [user]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('general')}>
                    <img src={user.avatar} />
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
        </div>
    );
}
export default Profiles;
