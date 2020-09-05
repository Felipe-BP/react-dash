import React, { useState, useRef } from 'react';

import { FaGripLinesVertical } from 'react-icons/fa';

import './styles.css';

interface IProps {
    title?: string;
    parentWidth: number;
    parentHeight: number;
}

const Moveable: React.FC<IProps> = ({ parentHeight, parentWidth }) => {
    const moveAbleRef = useRef<HTMLDivElement>(null);
    const [isHovering, setHovering] = useState<boolean>(false);
    const [offsetX, setOffsetX] = useState<number>(0);
    const [offsetY, setOffsetY] = useState<number>(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const moveableTarget = e.target as HTMLElement;
        const { top, left } = moveableTarget.getBoundingClientRect();

        setOffsetX(e.clientX - left);
        setOffsetY(e.clientY - top);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseUp = (event: MouseEvent) => {
        window.removeEventListener('mousemove', handleMouseMove, false);
    }

    const handleMouseMove = (event: MouseEvent) => {
        if (moveAbleRef.current) {
            const leftPos = event.pageX - offsetX;
            const topPos = event.pageY - offsetY;

            if (insideParentBounds(leftPos, topPos)) {
                moveAbleRef.current.style.left = `${leftPos}px`;
                moveAbleRef.current.style.top = `${topPos}px`;
            }
        }
    }

    const handleMoveableIcon = (event: React.MouseEvent) => {
        setHovering(!isHovering);
    }

    const insideParentBounds = (leftPos: number, topPos: number) => {
        return (leftPos >= 0 && leftPos <= parentWidth)
            && (topPos >= 0 && topPos <= parentHeight);
    }

    return (
        <div
            className="moveable-card"
            ref={moveAbleRef}
            onMouseEnter={handleMoveableIcon}
            onMouseLeave={handleMoveableIcon}
        >
            {isHovering && (
                <span
                    className="moveable"
                    onMouseDown={handleMouseDown}
                >
                    <FaGripLinesVertical />
                </span>
            )}
        </div>
    );
}

export default Moveable;