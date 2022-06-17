import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import clsx from 'clsx';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}></div>
        </header>
    );
}

export default Header;
