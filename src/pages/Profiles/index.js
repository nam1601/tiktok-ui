import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as service from '~/services/searchService';
import styles from './Profiles.module.scss';
import Button from '~/components/Button';
import { AuthUserContext } from '~/App';
import Image from '~/components/Image';
import Videos from './Videos';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function Profiles() {
    const authUser = useContext(AuthUserContext);
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState('Videos');
    // const currentURL = document.URL;
    // const handleURL = () => currentURL.search('@');
    // const searchParams = currentURL.slice(handleURL() + 1);
    const { nickname } = useParams();
    const accessToken = authUser && authUser.meta.token ? authUser.meta.token : '';
    const handleActive = (e) => {
        setActiveTab(e.target.textContent);
    };
    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await service.getAUser(nickname, accessToken);
            setUser(response);
        };
        fetchUserInfo();
    }, [accessToken, nickname]);
    console.log(nickname);
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
                        {nickname === authUser.data.nickname ? (
                            <Button
                                className={cx('message-btn', 'edit-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            >
                                Edit
                            </Button>
                        ) : (
                            <Button outline className={cx('message-btn')}>
                                Message
                            </Button>
                        )}
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
                <button
                    className={cx('category-button', 'videos-btn', `${activeTab === 'Videos' ? 'active' : ''}`)}
                    onClick={handleActive}
                >
                    Videos
                </button>
                <button
                    className={cx('category-button', `${activeTab === 'Liked' ? 'active' : ''}`, 'liked-btn')}
                    onClick={handleActive}
                >
                    <FontAwesomeIcon icon={faLock} />
                    Liked
                </button>
            </div>
            {activeTab === 'Videos' ? (
                <div className={cx('active-bar', 'videos-bar')}></div>
            ) : (
                <div className={cx('active-bar', 'liked-bar')}></div>
            )}
            <div className={cx('list')}>
                <Videos data={user.videos} personal={nickname === authUser.data.nickname ? true : false} />
            </div>
        </div>
    );
}
export default Profiles;
