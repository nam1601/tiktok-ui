import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

import * as service from '~/services/searchService';
import styles from './Content.module.scss';
import Video from './Video';
import Button from '~/components/Button';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
function Content() {
    const [content, setContent] = useState([]);
    const [pagination, setPagination] = useState(1);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await service.videoContent('for-you', pagination);
            setContent((prev) => [...prev, ...res]);
        };
        fetchApi();
    }, [pagination]);
    console.log('content: ', content);
    return (
        <div className={cx('wrapper')}>
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
                                <Video src={item.file_url} index={index} />
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
