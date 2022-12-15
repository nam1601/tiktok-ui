import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import * as service from '~/services/searchService';
import CardItem from './CardItem';
import styles from './Follow.module.scss';
const cx = classNames.bind(styles);
function Follow() {
    const [listUsers, setListUsers] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const response = await service.suggestAccount(2, 15);
            setListUsers(response);
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {listUsers.map((item, index) => (
                <CardItem className={cx('item')} key={index} data={item} />
            ))}
        </div>
    );
}

export default Follow;
