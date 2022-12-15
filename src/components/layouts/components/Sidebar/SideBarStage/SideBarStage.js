import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
// import Tippy from '@tippyjs/react/headless';
import { useState, useEffect } from 'react';
// import AccountItem from '~/components/AccountItem';
import * as searchService from '~/services/searchService';
import styles from './SideBarStage.module.scss';
import TippyInform from '../TippyInform';
const cx = classNames.bind(styles);
function SideBarStage({ title, token }) {
    const [accounts, setAccounts] = useState([]);
    const [seeAll, setSeeAll] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            if (!seeAll) {
                let result = [];
                if (title === 'Following') {
                    if (token) {
                        result = await searchService.followList(1, 5, token);
                    } else result = [];
                } else {
                    result = await searchService.suggestAccount(1, 5);
                    console.log(result);
                }
                console.log('result: ', result);
                setAccounts(result);
            } else {
                let result = [];
                if (title === 'Following') {
                    if (token) {
                        result = await searchService.followList(1, 16, token);
                    } else result = [];
                } else {
                    result = await searchService.suggestAccount(1, 16);
                    console.log(result);
                }
                console.log('result: ', result);

                setAccounts(result);
            }
        };
        fetchApi();
    }, [seeAll]);
    console.log('account ', title, ': ', accounts);
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
