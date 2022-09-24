import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './TippyInform.module.scss';
import AccountItem from '~/components/AccountItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Image from '~/components/Image';
const cx = classNames.bind(styles);
function TippyInform({ data, className }) {
    return (
        <HeadlessTippy
            interactive
            placement="bottom"
            // offset={[10, 0]}
            delay={[800, 0]}
            offset={[-200, -0]}
            render={(attrs) => (
                <div className={cx('inform-block')} tabIndex="-1" {...attrs}>
                    <div className={cx('header')}>
                        <Image className={cx('avatar')} src={data.avatar} alt={data.full_name} />
                        <Button primary className={cx('follow-btn')}>
                            Follow
                        </Button>
                    </div>
                    <div className={cx('infor')}>
                        <h4 className={cx('name')}>
                            <span>{data.first_name + ' ' + data.last_name}</span>
                            {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
                        </h4>
                        <span className={cx('username')}>{data.nickname}</span>
                    </div>
                    <div className={cx('introduces')}>
                        <span>
                            <span className={cx('followers-quantity')}>{data.followers_count}</span> Followers
                        </span>
                        <span>
                            <span className={cx('likes-quantity')}>{data.likes_count}</span> Likes
                        </span>
                    </div>
                </div>
            )}
        >
            <div>
                <AccountItem data={data} className={className} />
            </div>
        </HeadlessTippy>
    );
}

export default TippyInform;
