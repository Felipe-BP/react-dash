import React, { useRef, useEffect, useState } from 'react';

import './styles.css';

import Moveable from '../Moveable';

const Layout: React.FC = () => {
    const [parentHeight, setParentHeight] = useState<number>(0);
    const [parentWidth, setParentWidth] = useState<number>(0);

    const moveablesContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (moveablesContainer.current) {
            setParentHeight(moveablesContainer.current.offsetHeight);
            setParentWidth(moveablesContainer.current.offsetWidth);
        }
    }, [moveablesContainer]);

    return (
        <div
            className="container"
            ref={moveablesContainer}
        >
            <Moveable
                parentHeight={parentHeight}
                parentWidth={parentWidth}
            />
        </div>
    );
}

export default Layout;