import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { faPause, faPlay, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import useElementOnScreen from '~/Hook/useElementOnScreen';
import styles from './Video.module.scss';
const cx = classNames.bind(styles);
function Video({ ...props }) {
    const refVideo = useRef();
    const [progress, setProgress] = useState(0);
    const [description, setDescription] = useState('');
    const [playing, setPlaying] = useState(false);
    const [tags, setTags] = useState(['foryourpage', 'foryou', 'hot']);
    const options = { root: null, rootMargin: '0px', threshold: 0.7 };
    const isVisible = useElementOnScreen(options, refVideo);
    useEffect(() => {
        const videoDesc = props.description;

        if (videoDesc.includes('#')) {
            const explodedDesc = videoDesc.split('#');

            setDescription(explodedDesc[0]);

            // Remove first item, it is description
            explodedDesc.shift();

            setTags(explodedDesc);
        } else {
            setDescription(videoDesc);
        }
    }, [props.description]);

    useEffect(() => {
        if (isVisible) {
            if (!playing) {
                // Rewind the video and play from beginning
                refVideo.current.currentTime = 0;
                refVideo.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                refVideo.current.pause();
                setPlaying(false);
            }
        }
    }, [isVisible, playing]);
    const handleValue = (e) => {
        if (isNaN(e.duration)) {
            return;
        }
        setProgress((e.target.currentTime / e.target.duration) * 100);
    };

    const [play, setPlay] = useState(false);
    const handlePlay = () => {
        refVideo.current.play();
        setPlay(true);
    };
    const handlePause = () => {
        refVideo.current.pause();
        setPlay(false);
    };
    const handleChange = (e) => {
        refVideo.current.volume = e.target.value / 100;
    };
    const onLoad = () => {};
    return (
        <div className={cx('wrapper')}>
            <video
                onProgress={handleValue}
                loop
                ref={refVideo}
                onLoad={() => (refVideo.current.volume = 0.3)}
                muted
                controls
                playsInline
                className={cx('video')}
            >
                <source src={props.src} type="video/mp4" />
            </video>
            {/* <div className={cx('actions')}>
                {!play && (
                    <span className={cx('play-button')} onClick={handlePlay}>
                        <FontAwesomeIcon icon={faPlay} />
                    </span>
                )}
                {play && (
                    <span className={cx('pause-button')} onClick={handlePause}>
                        <FontAwesomeIcon icon={faPause} />
                    </span>
                )}

                <div className={cx('audio')}>
                    <span className={cx('volumes-icon')}>
                        <FontAwesomeIcon icon={faVolumeHigh} />
                    </span>

                    <div className={cx('volume-range')}>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            orient="landscape"
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Video;
