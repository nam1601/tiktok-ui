import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';

import styles from './LoginModal.module.scss';
import { faFacebook, faGoogle, faSquareInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);
const LOGIN_METHOD = [
    { title: 'Use QR code', icon: <FontAwesomeIcon icon={faQrcode} /> },
    {
        title: 'Use email',
        icon: <FontAwesomeIcon icon={faUser} />,
        children: { header: 'Log in', icon: <FontAwesomeIcon icon={faChevronLeft} /> },
    },
    {
        title: 'Continue with Facebook',
        icon: <FontAwesomeIcon icon={faFacebook} />,
    },
    {
        title: 'Continue with Google',
        icon: <FontAwesomeIcon icon={faGoogle} />,
    },
    {
        title: 'Continue with Twitter',
        icon: <FontAwesomeIcon icon={faTwitter} />,
    },
    {
        title: 'Continue with Instagram',
        icon: <FontAwesomeIcon icon={faSquareInstagram} />,
    },
];
function LoginModal() {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal__overlay')}></div>
            <div className={cx('modal__block')}>
                <h2>Log in to TikTok</h2>
                <ul className={cx('modal__item-list')}>
                    {LOGIN_METHOD.map((item, index) => {
                        return (
                            <li className={cx('modal__item')}>
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default LoginModal;
