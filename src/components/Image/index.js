import { forwardRef } from 'react';
import classNames from 'classnames';
import images from '~/assets/images';
import { useState } from 'react';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, className, ...props }, ref) => {
    const [failBack, setFailBack] = useState('');
    const handleError = () => {
        setFailBack(images.noImage);
    };
    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={failBack || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
