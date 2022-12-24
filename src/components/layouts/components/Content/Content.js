import classNames from 'classnames/bind';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

import * as service from '~/services/searchService';
import styles from './Content.module.scss';
import Video from './Video';
import Button from '~/components/Button';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Content({ ...props }) {
    const [content, setContent] = useState([]);
    const [pagination, setPagination] = useState(INIT_PAGE);
    const [noMoreVideo, setNoMoreVideo] = useState(false);
    // useEffect(() => {
    //     fetchApi();
    //     console.log('state: ', props.state);
    //     console.log('page: ', pagination);
    // }, []);
    const fetchApi = async () => {
        const res = await service.videoContent('for-you', pagination);
        console.log('res: ', res);
        setContent((prev) => [...prev, ...res.data]);
        setPagination((prev) => prev + 1);
        console.log('page: ', pagination);
        if (res.data.length === 0 || pagination === res.meta.pagination.total) {
            console.log('page max');
            setNoMoreVideo(true);
        }
    };
    const loadMore = useCallback(() => {
        return setTimeout(() => {
            fetchApi();
            //     service
            //         .videoContent('for-you', pagination)
            //         .then((res) => {
            //             if (Array.isArray(res.data)) {
            //                 setContent((prev) => [...prev, ...res.data]);
            //                 setPagination((prev) => prev + 1);
            //             }

            //             if (res.data.length === 0 || pagination === res.meta.pagination.total) {
            //                 setNoMoreVideo(true);
            //             }
            //         })
            //         .catch((error) => {
            //             console.log(error);
            //         });
        }, 1000);
    }, [setContent, pagination]);

    useEffect(() => {
        if (!noMoreVideo) {
            loadMore();
        }
        return () => clearTimeout(loadMore);
    }, [loadMore]);
    // const fetchApi = async () => {
    //     const res = await service.videoContent('for-you', pagination);
    //     console.log('res: ', res);
    //     setContent((prev) => [...prev, ...res]);
    // };
    return (
        <div className={cx('wrapper')} id="content">
            {content.map((item, index) => (
                <div className={cx('post-block')} key={index}>
                    <div className={cx('account')}>
                        <div className={cx('block-ava')}>
                            <Link to={`/@${item.user.nickname}`} className={cx('ava')}>
                                <Image className={cx('avatar')} alt="" src={item.user.avatar} />
                            </Link>
                        </div>

                        <div className={cx('info-block')}>
                            <div className={cx('info')}>
                                <div className={cx('identify')}>
                                    <div className={cx('name')}>
                                        <h3 className={cx('nick-name')}>
                                            {item.user.nickname}
                                            {item.user.tick && <FontAwesomeIcon icon={faCircleCheck} />}
                                        </h3>
                                        <p>
                                            {item.user.first_name} {item.user.last_name}
                                        </p>
                                    </div>
                                    <span className={cx('descriptions')}>{item.description}</span>
                                </div>
                                <Button outline small className={cx('follow-btn')}>
                                    Follow
                                </Button>
                            </div>
                            <div className={cx('video-block')}>
                                <Video description={item.description} src={item.file_url} index={index} />
                                <div className={cx('interactives')}>
                                    <div className={cx('action-block')}>
                                        <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                                        <p className={cx('quantity')}>{item.likes_count}</p>
                                    </div>
                                    <div className={cx('action-block')}>
                                        <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
                                        <p className={cx('quantity')}>{item.comments_count}</p>
                                    </div>
                                    <div className={cx('action-block')}>
                                        <FontAwesomeIcon icon={faShare} className={cx('icon')} />
                                        <p className={cx('quantity')}>{item.shares_count}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Content;
