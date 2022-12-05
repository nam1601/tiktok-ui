import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';

import * as service from '~/services/searchService';
import styles from './Profiles.module.scss';

const cx = classNames.bind(styles);
function Profiles() {
    const tokenItem = JSON.parse(localStorage.getItem('Token'));
    const [token, setToken] = useState(tokenItem ?? '');
    const [user, setUser] = useState({});
    // const [listVideo, setListVideo] = useState([]);
    const [userVideos, setUserVideos] = useState([]);
    let currentURL = document.URL;
    const handleURL = () => currentURL.search('@');
    const searchParams = currentURL.slice(handleURL() + 1);
    useEffect(() => {}, []);
    useEffect(() => {
        // const fetchApi = async () => {
        //     const response = await service.search(searchParams);
        //     setUser(response[0]);
        // };
        // fetchApi();
        // console.log(user);
        const fetchVideos = async () => {
            const response = await service.getUserListVideos(user.id);
            setUserVideos(response);
        };
        const fetchCurrentUser = async () => {
            const response = await service.getCurrentUser(token);
            setUser(response);
        };
        fetchCurrentUser();
        fetchVideos();
    }, [user, userVideos]);
    // useEffect(() => {
    //     const fetchVideos = async () => {
    //         const response = await service.getUserListVideos(user.id);
    //     };
    //     fetchVideos();
    // }, [user]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('general')}>
                    <img src={user.avatar} alt="" />
                    <div className={cx('name')}>
                        <div className={cx('nick-name')}>
                            <h2>{user.nickname}</h2>
                            {user.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCircleCheck} />}
                        </div>
                        <h1 className={cx('full-name')}>{user.first_name + ' ' + user.last_name}</h1>
                        {/* <Button outline className={cx('message-btn')}>
                            Message
                        </Button> */}
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
