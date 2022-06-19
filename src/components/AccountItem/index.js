import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/283467265_3178127575754411_5069759013266765710_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=RnI5s-bngsQAX-i-Yrh&_nc_ht=scontent.fsgn2-4.fna&oh=00_AT-OBXedswlGzVVKWWXjOMLoEf-7WNiTlgniDgon0nqMKw&oe=62B4C1EE"
                alt="Diệu"
            />
            <div className={cx('infor')}>
                <h4 className={cx('name')}>
                    <span>Hồ Thị Tâm Diệu</span>
                    <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>Hồ Thị Tâm Diệu</span>
            </div>
        </div>
    );
}

export default AccountItem;
