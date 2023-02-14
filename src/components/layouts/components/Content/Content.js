import classNames from 'classnames/bind';
import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as service from '~/services/services';
import styles from './Content.module.scss';
import Video from './Video';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);
const INIT_PAGE = 1;
function Content({ ...props }) {
    const [content, setContent] = useState([]);

    const [pagination, setPagination] = useState(INIT_PAGE);
    const [hasMore, setHasMore] = useState(true);
    const [firstFetching, setFirstFetching] = useState(true);
    const listInnerRef = useRef();

    const fetchApi = async () => {
        const res = await service.videoContent('for-you', pagination);
        setContent((prev) => [...prev, ...res.data]);
        console.log('content: ', content);
        setPagination(pagination + 1);
        if (res.data.length === 0 || pagination === res.meta.pagination.total) {
            console.log('page max');
            setHasMore(false);
        }
        console.log('page', pagination);
    };
    useEffect(() => {
        fetchApi('for-you', 1);
        console.log('first fetching: ', content);
    }, []);
    // useEffect(() => {
    //     fetchApi(pagination);
    //     // if (content.meta.total < pagination) {
    //     //     setHasMore(false);
    //     // }
    // }, [pagination]);
    // const onScroll = () => {
    //     const scrollTop = document.documentElement.scrollTop;
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const clientHeight = document.documentElement.clientHeight;
    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         setPagination(pagination + 1);
    //     }
    // };
    // const onScroll = () => {
    //     if (listInnerRef.current) {
    //         const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
    //         if (scrollTop + clientHeight === scrollHeight) {
    //             setPagination(pagination + 1);
    //         }
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('scroll', onScroll);
    //     return () => window.removeEventListener('scroll', onScroll);
    // }, [content]);
    // return (
    //     <div className={cx('wrapper')} id="content" ref={listInnerRef}>
    //         {content.map((item, index) => (
    //             <div className={cx('post-block')} key={index}>
    //                 <div className={cx('account')}>
    //                     <div className={cx('block-ava')}>
    //                         <Link to={`/@${item.user.nickname}`} className={cx('ava')}>
    //                             <Image className={cx('avatar')} alt="" src={item.user.avatar} />
    //                         </Link>
    //                     </div>

    //                     <div className={cx('info-block')}>
    //                         <div className={cx('info')}>
    //                             <div className={cx('identify')}>
    //                                 <div className={cx('name')}>
    //                                     <h3 className={cx('nick-name')}>
    //                                         {item.user.nickname}
    //                                         {item.user.tick && <FontAwesomeIcon icon={faCircleCheck} />}
    //                                     </h3>
    //                                     <p>
    //                                         {item.user.first_name} {item.user.last_name}
    //                                     </p>
    //                                 </div>
    //                                 <span className={cx('descriptions')}>{item.description}</span>
    //                             </div>
    //                             <Button outline small className={cx('follow-btn')}>
    //                                 Follow
    //                             </Button>
    //                         </div>
    //                         <div className={cx('video-block')}>
    //                             <Video description={item.description} src={item.file_url} index={index} />
    //                             <div className={cx('interactives')}>
    //                                 <div className={cx('action-block')}>
    //                                     <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
    //                                     <p className={cx('quantity')}>{item.likes_count}</p>
    //                                 </div>
    //                                 <div className={cx('action-block')}>
    //                                     <FontAwesomeIcon icon={faCommentDots} className={cx('icon')} />
    //                                     <p className={cx('quantity')}>{item.comments_count}</p>
    //                                 </div>
    //                                 <div className={cx('action-block')}>
    //                                     <FontAwesomeIcon icon={faShare} className={cx('icon')} />
    //                                     <p className={cx('quantity')}>{item.shares_count}</p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         ))}
    //     </div>
    // );
    return (
        <div className={cx('wrapper')} id="content" ref={listInnerRef}>
            <InfiniteScroll dataLength={content.length} next={fetchApi} hasMore={hasMore}>
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
            </InfiniteScroll>
        </div>
    );
}

export default Content;
