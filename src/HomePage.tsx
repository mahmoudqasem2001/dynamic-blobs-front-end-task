import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

interface Blob {
    id: number;
    x: number;
    y: number;
    radius: number;
    color: string;
    velocityX: number;
    velocityY: number;
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background:#121327;
`;

const animateBlob = keyframes`
  0%, 100% {
    border-radius: 28% 72% 22% 78% / 39% 23% 77% 61%; 
  }
  70% {
    border-radius: 55% 28% 87% 41% / 32% 80% 70% 45%;  
  }
  50% {
    border-radius: 72% 28% 50% 50% / 55% 26% 74% 45%;  
  }
  30% {
    border-radius: 66% 28% 70% 60% / 85% 36% 54% 45%;  
  }
`;

const BlobElement = styled.div<{ x: number; y: number; radius: number; color: string }>`
  position: absolute;
  top: ${({ y }) => y}px;
  left: ${({ x }) => x}px;
  width: ${({ radius }) => radius * 2}px;
  height: ${({ radius }) => radius * 2}px;
  background: ${({ color }) => color};
  border-radius: 28% 72% 22% 78% / 39% 23% 77% 61%; 
  animation: ${animateBlob} 3s linear infinite; 
`;

const HomePage: React.FC = () => {
    const [blobs, setBlobs] = useState<Blob[]>([]);
    const [isDragging, setIsDragging] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initialBlobs: Blob[] = [];
        for (let i = 0; i < 3; i++) {
            initialBlobs.push(generateBlob(i));
        }
        setBlobs(initialBlobs);
    }, []);

    useEffect(() => {
        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (isDragging !== null && containerRef.current) {
                const containerRect = containerRef.current.getBoundingClientRect();
                const offsetX = e instanceof MouseEvent ? e.clientX - containerRect.left : e.touches[0].clientX - containerRect.left;
                const offsetY = e instanceof MouseEvent ? e.clientY - containerRect.top : e.touches[0].clientY - containerRect.top;

                setBlobs(prevBlobs =>
                    prevBlobs.map(blob =>
                        blob.id === isDragging ? { ...blob, x: offsetX, y: offsetY } : blob
                    )
                );
            }
        };

        const handleEnd = () => {
            setIsDragging(null);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchend', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);

    const handleStart = (id: number) => {
        setIsDragging(id);
    };

    const generateBlob = (id: number): Blob => {
        const radius = Math.random() * 50 + 30;
        const x = Math.random() * (window.innerWidth - radius * 2) + radius;
        const y = Math.random() * (window.innerHeight - radius * 2) + radius;
        const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`;
        const velocityX = Math.random() * 4 - 2;
        const velocityY = Math.random() * 4 - 2;
        return { id, x, y, radius, color, velocityX, velocityY };
    };

    useEffect(() => {
        const handleCollision = (blob1: Blob, blob2: Blob): [Blob, Blob] => {
            const dx = blob2.x - blob1.x;
            const dy = blob2.y - blob1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = blob1.radius + blob2.radius;

            if (distance < minDistance) {
                const overlap = minDistance - distance;
                const normalX = dx / distance;
                const normalY = dy / distance;
                const moveX = overlap * normalX;
                const moveY = overlap * normalY;

                return [
                    { ...blob1, x: blob1.x - moveX / 2, y: blob1.y - moveY / 2, radius: blob1.radius - overlap / 2 },
                    { ...blob2, x: blob2.x + moveX / 2, y: blob2.y + moveY / 2, radius: blob2.radius - overlap / 2 }
                ];
            }

            return [blob1, blob2];
        };

        setBlobs(prevBlobs => {
            const updatedBlobs = [...prevBlobs];
            for (let i = 0; i < updatedBlobs.length; i++) {
                for (let j = i + 1; j < updatedBlobs.length; j++) {
                    const [newBlob1, newBlob2] = handleCollision(updatedBlobs[i], updatedBlobs[j]);
                    updatedBlobs[i] = newBlob1;
                    updatedBlobs[j] = newBlob2;
                }
            }
            return updatedBlobs;
        });
    }, [blobs]);

    useEffect(() => {
        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (blobs.length === 0 || !containerRef.current) return;

            const { beta, gamma } = e;
            const containerRect = containerRef.current.getBoundingClientRect();
            const maxX = containerRect.width;
            const maxY = containerRect.height;

            setBlobs(prevBlobs =>
                prevBlobs.map(blob => {
                    let newX = blob.x + gamma! / 10;
                    let newY = blob.y + beta! / 10;

                    newX = Math.max(blob.radius, Math.min(newX, maxX - blob.radius));
                    newY = Math.max(blob.radius, Math.min(newY, maxY - blob.radius));

                    return { ...blob, x: newX, y: newY };
                })
            );
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [blobs]);

    return (
        <Container ref={containerRef}>
            {blobs.map(blob => (
                <BlobElement
                    key={blob.id}
                    x={blob.x - blob.radius}
                    y={blob.y - blob.radius}
                    radius={blob.radius}
                    color={blob.color}
                    onMouseDown={() => handleStart(blob.id)}
                    onTouchStart={() => handleStart(blob.id)}
                />
            ))}
        </Container>
    );
};

export default HomePage;