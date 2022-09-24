import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Content.module.scss';
import * as service from '~/services/searchService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

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

    return (
        <div className={cx('wrapper')}>
            {content.map((item, index) => (
                <div className={cx('post-block')} key={index}>
                    <div className={cx('account')}>
                        <div>
                            <Link to={`/@${item.user.nickname}`}>
                                <img className={cx('avatar')} alt="" src={item.user.avatar} />
                            </Link>
                        </div>

                        <div className={cx('info')}>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Content;
