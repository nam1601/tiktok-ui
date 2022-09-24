import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import * as service from '~/services/searchService';
import Button from '~/components/Button';
import styles from './CardItem.module.scss';

const cx = classNames.bind(styles);
function CardItem({ data, className, ...props }) {
    return (
        <>
            <div className={cx('wrapper')}>
                <img className={cx('thumb-video')} src={data.popular_video.thumb_url} alt="" />
                <div className={cx('info')}>
                    <img className={cx('avatar')} src={data.avatar} />
                    <h4 className={cx('name')}>{data.first_name + ' ' + data.last_name}</h4>
                    <h6 className={cx('nick-name')}>{data.nickname}</h6>
                    <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button>
                </div>
            </div>
        </>
    );
}

export default CardItem;
