import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useRef } from 'react';

import styles from './Videos.module.scss';

const cx = classNames.bind(styles);

function Videos({ data = [], personal, ...props }) {
    const videoRef = useRef();
    const handlePlay = (e) => {
        e.target.play();
    };
    const handlePause = (e) => {
        e.target.pause();
    };

    return (
        <>
            {data &&
                data.map((item) => (
                    <div className={cx('video-block')} key={item.id}>
                        <video
                            ref={videoRef}
                            className={cx('video')}
                            loops="true"
                            playsInline
                            muted
                            poster={item.thumb_url}
                            onMouseOver={(e) => handlePlay(e)}
                            onMouseOut={(e) => handlePause(e)}
                        >
                            <source src={item.file_url} type="video/mp4" />
                            Your browser does not support HTML video.
                        </video>
                        <span className={cx('video-btn')}>
                            <FontAwesomeIcon icon={faPlay} /> {item.likes_count}
                        </span>
                    </div>
                ))}
            {!data && <h3>Upload your first video</h3>}
        </>
    );
}

export default Videos;
