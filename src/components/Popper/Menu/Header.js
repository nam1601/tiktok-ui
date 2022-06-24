import classNames from 'classnames/bind';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Header({ title, onBack }) {
    return (
        <header className={cx('header')}>
            <h4 className={cx('header-title')}>{title}</h4>
            <button className={cx('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
        </header>
    );
}

export default Header;
