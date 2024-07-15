"use client";

import { Paper } from "@mui/material";
import { FC, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import clsx from "clsx";
import styles from "./ApSwipeCard.module.scss";

type CardPropsType = {
  className?: string;
  [key: string]: any;
};

type Position = {
  x: number;
  y: number;
};

interface ApSwipeCardProps {
  keyword: string;
  description: string;
  cardProps?: CardPropsType;
  onLeft?: () => void;
  onRight?: () => void;
  onSide?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onVertical?: () => void;
  [key: string]: any;
}

const ApSwipeCard: FC<ApSwipeCardProps> = ({
  keyword,
  description,
  cardProps,
  onLeft,
  onRight,
  onSide,
  onUp,
  onDown,
  onVertical,
  ...dragProps
}) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const cardSize = 500; // Maximum edge length
  const threshold = cardSize / 2;

  const handleStart = (e: DraggableEvent, data: DraggableData) => {
    setInitialPosition({ x: data.x, y: data.y });
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(true);
  };

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    const deltaX = data.x - initialPosition.x;
    const deltaY = data.y - initialPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    setIsDragging(false);

    if (distance > threshold) {
      let finalX = position.x;
      let finalY = position.y;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
          finalX += cardSize;
          onRight?.();
          onSide?.();
        } else {
          finalX -= cardSize;
          onLeft?.();
          onSide?.();
        }
      } else if (deltaY > 0) {
        finalY += cardSize;
        onDown?.();
        onVertical?.();
      } else {
        finalY -= cardSize;
        onUp?.();
        onVertical?.();
      }
      setPosition({ x: finalX, y: finalY });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const distanceFromCenter = Math.sqrt(position.x * position.x + position.y * position.y);
  const opacity = Math.max(1 - distanceFromCenter / cardSize, 0);

  return (
    <Draggable onStart={handleStart} onDrag={handleDrag} onStop={handleStop} position={position} {...dragProps}>
      <div className={clsx(styles.cardWrapper)}>
        <Paper
          onClick={handleCardClick}
          className={clsx(cardProps?.className, styles.card, { [styles.flipped]: isFlipped })}
          elevation={3}
          style={{
            opacity,
            cursor: isDragging ? "grabbing" : "pointer",
            transition: isDragging ? "opacity 0.01s ease-out" : "transform 0.2s ease-out, opacity 0.01s ease-out",
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
          {...cardProps}
        >
          <div className={styles.cardFront}>{keyword}</div>
          <div className={styles.cardBack}>{description}</div>
        </Paper>
      </div>
    </Draggable>
  );
};

export default ApSwipeCard;
