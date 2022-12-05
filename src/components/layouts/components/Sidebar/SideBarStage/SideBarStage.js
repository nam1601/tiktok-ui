import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
import AccountItem from '~/components/AccountItem';
import * as searchService from '~/services/searchService';
import styles from './SideBarStage.module.scss';
import TippyInform from '../TippyInform';
const cx = classNames.bind(styles);
function SideBarStage({ title, apiLink }) {
    const [accounts, setAccounts] = useState([]);
    const [allAccounts, setAllAccounts] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    const handleClick = () => {
        setSeeAll(true);
    };
    useEffect(() => {
        //     fetch('https://tiktok.fullstack.edu.vn/api/users/search?q=n&type=less')
        //         .then((response) => response.json())
        //         .then((data) => setAccounts(data));
        // }, [accounts]);
        // const fetchApi = async () => {
        //     if (!seeAll) {
        //         const result = await apiLink;
        //         setAccounts(result);
        //     } else {
        //         const result = await searchService.suggestAccount(1, 16);
        //         setAccounts(result);
        //     }
        // };
        // fetchApi();
    }, [seeAll]);

    return (
        <div className={cx('wrapper')}>
            <p className={cx('title')}>{title}</p>
            {accounts.map((result) => (
                <TippyInform key={result.id} data={result} className={cx('sidebar-account')} />
            ))}
            {seeAll ? (
                <button className={cx('label')} onClick={() => setSeeAll(false)}>
                    Hide
                </button>
            ) : (
                <button className={cx('label')} onClick={() => setSeeAll(true)}>
                    See more
                </button>
            )}
        </div>
    );
}

export default SideBarStage;
