import { useEffect, useRef } from 'react';
import { isColliding, handleKeyDown, handleKeyUp } from './scripts/gameUtils';
import style from './style/CatRun.module.css';

export function Dash({ switchMode }) {
    const score = useRef(0);
    const animationFrameId = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            score.current += 1;
        }, 1000);

        function game() {
            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");
            const width = 800; // Fixed canvas width
            const height = 500; // Fixed canvas height

            canvas.width = width;
            canvas.height = height;

            const floor = {
                x: 0,
                y: height - 50,
                width: width,
                height: 50,
                speed: 1 // Reduced speed
            };

            const ceiling = {
                x: 0,
                y: height * 0.33, // Position the ceiling at 1/3 of the canvas height
                width: width,
                height: 20,
                color: 'yellow'
            };

            const gravity = 0.0075; // Reduced gravity for more airtime
            const jumpSpeed = -1.5; // Reduced jump speed
            const originalBlueWidth = 75; // Scaled-down width of the blue block
            const originalBlueHeight = 50; // Scaled-down height of the blue block
            const hoverHeight = 15; // Scaled-down hover height
            const groundLevel = height - floor.height - originalBlueHeight;

            const blueSquare = {
                x: width / 3,
                y: groundLevel - hoverHeight,
                width: originalBlueWidth,
                height: originalBlueHeight,
                speed: 2.5, // Reduced speed
                verticalSpeed: 0,
                isCrouching: false
            };

            const redSquares = [];
            const hangingRedSquares = [];

            function addRedSquare() {
                redSquares.push({
                    x: width,
                    y: height - floor.height - 100, // Adjusted for the new size
                    width: 40, // Scaled-down width
                    height: 200, // Scaled-down height
                    speed: 1 // Reduced speed
                });
            }

            function addHangingRedSquare() {
                hangingRedSquares.push({
                    x: width,
                    y: ceiling.y + ceiling.height,
                    width: 60, // Scaled-down width
                    height: 210, // Scaled-down height
                    speed: 1 // Reduced speed
                });
            }

            function getRandomInterval() {
                return Math.random() * (2000 - 1000) + 1000;
            }

            const keysPressed = {};

            function update(progress) {
                redSquares.forEach(redSquare => {
                    redSquare.x -= progress * redSquare.speed;

                    if (redSquare.x + redSquare.width < 0) {
                        redSquares.splice(redSquares.indexOf(redSquare), 1);
                    }
                });

                hangingRedSquares.forEach(hangingRedSquare => {
                    hangingRedSquare.x -= progress * hangingRedSquare.speed;

                    if (hangingRedSquare.x + hangingRedSquare.width < 0) {
                        hangingRedSquares.splice(hangingRedSquares.indexOf(hangingRedSquare), 1);
                    }
                });

                redSquares.forEach(redSquare => {
                    if (isColliding(blueSquare, redSquare)) {
                        score.current = 0;
                        switchMode();
                    }
                });

                hangingRedSquares.forEach(hangingRedSquare => {
                    if (isColliding(blueSquare, hangingRedSquare)) {
                        score.current = 0;
                        switchMode();
                    }
                });

                floor.x -= progress * floor.speed;

                if (floor.x + floor.width < 0) {
                    floor.x = 0;
                }

                blueSquare.verticalSpeed += gravity * progress;
                blueSquare.y += blueSquare.verticalSpeed * progress;

                if (blueSquare.y > groundLevel - hoverHeight) {
                    blueSquare.y = groundLevel - hoverHeight;
                    blueSquare.verticalSpeed = 0;
                }

                if (keysPressed['s']) {
                    blueSquare.isCrouching = true;
                    blueSquare.height = originalBlueHeight * 2 / 3;
                } else {
                    blueSquare.isCrouching = false;
                    blueSquare.height = originalBlueHeight;
                }

                if (blueSquare.isCrouching) {
                    blueSquare.y = groundLevel - hoverHeight + (originalBlueHeight - blueSquare.height);
                } else {
                    blueSquare.y = Math.min(blueSquare.y, groundLevel - hoverHeight);
                }

                if ((keysPressed['w'] || keysPressed[' ']) && blueSquare.y >= groundLevel - hoverHeight) {
                    blueSquare.verticalSpeed = jumpSpeed;
                }
            }

            function draw() {
                ctx.clearRect(0, 0, width, height);

                ctx.fillStyle = 'red';
                redSquares.forEach(redSquare => {
                    ctx.fillRect(redSquare.x, redSquare.y, redSquare.width, redSquare.height);
                });

                ctx.fillStyle = 'red';
                hangingRedSquares.forEach(hangingRedSquare => {
                    ctx.fillRect(hangingRedSquare.x, hangingRedSquare.y, hangingRedSquare.width, hangingRedSquare.height);
                });

                ctx.fillStyle = 'blue';
                ctx.fillRect(
                    blueSquare.x,
                    blueSquare.y,
                    blueSquare.width,
                    blueSquare.height
                );

                ctx.fillStyle = 'green';
                ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
                ctx.fillRect(floor.x + floor.width, floor.y, floor.width, floor.height);

                ctx.fillStyle = ceiling.color;
                ctx.fillRect(ceiling.x, ceiling.y, ceiling.width, ceiling.height);

                ctx.fillStyle = 'white';
                ctx.font = '24px Arial';
                ctx.fillText('Score: ' + score.current, 10, 30);
            }

            function loop(timestamp) {
                var progress = timestamp - lastRender;

                update(progress);
                draw();

                lastRender = timestamp;
                animationFrameId.current = window.requestAnimationFrame(loop);
            }

            var lastRender = 0;
            animationFrameId.current = window.requestAnimationFrame(loop);

            window.addEventListener('keydown', (event) => handleKeyDown(event, keysPressed));
            window.addEventListener('keyup', (event) => handleKeyUp(event, keysPressed));

            function scheduleNextRedSquare() {
                if (Math.random() < 0.5) {
                    addRedSquare();
                } else {
                    addHangingRedSquare();
                }
                setTimeout(scheduleNextRedSquare, getRandomInterval());
            }

            scheduleNextRedSquare();

            return () => {
                clearInterval(interval);
                window.cancelAnimationFrame(animationFrameId.current);
                window.removeEventListener('keydown', (event) => handleKeyDown(event, keysPressed));
                window.removeEventListener('keyup', (event) => handleKeyUp(event, keysPressed));
            };
        }

        game();

        return () => {
            clearInterval(interval);
            window.cancelAnimationFrame(animationFrameId.current);
        };
    }, [switchMode]);

    return (
        <canvas id="canvas" className={style.game}></canvas>
    );
}
