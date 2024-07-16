import React, { useEffect, useRef, useState } from 'react';
import { isColliding, handleKeyDown, handleKeyUp } from './scripts/gameUtils';
import style from './style/CatRun.module.css';

export function Dash() {
    const [gamePaused, setGamePaused] = useState(false);
    const keysPressed = useRef({}); // Initialize keysPressed using useRef

    useEffect(() => {
        function game() {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var width = canvas.width = window.innerWidth;
            var height = canvas.height = window.innerHeight;

            var floor = {
                x: 0,
                y: height - 50, // Position the floor at the bottom
                width: width,
                height: 50,
                speed: 1.5 // Increased speed of the floor and the red block
            };

            var ceiling = {
                x: 0,
                y: height - floor.height - (height * 2 / 3), // Position the ceiling 2/3 of the screen above the floor
                width: width,
                height: 20, // Relatively thin height
                color: 'yellow'
            };

            const gravity = 0.025; // Lower gravity for more airtime
            const jumpSpeed = -4.5; // Adjusted jump speed
            const originalBlueWidth = 150; // Increased width of the blue block
            const originalBlueHeight = 100; // Increased height of the blue block
            const hoverHeight = 30; // Increased hover height
            const groundLevel = height - floor.height - originalBlueHeight; // Adjusted for the new size

            var blueSquare = {
                x: width / 3,
                y: groundLevel - hoverHeight, // Start at the hover height above ground level
                width: originalBlueWidth,
                height: originalBlueHeight,
                speed: 5,
                verticalSpeed: 0, // Initial vertical speed
                isCrouching: false // Crouch state
            };

            var redSquares = [];
            var hangingRedSquares = [];

            function addRedSquare() {
                redSquares.push({
                    x: width,
                    y: height - floor.height - 240, // Adjusted for the new size
                    width: 120, // 3 times as wide
                    height: 240, // 6 times as tall
                    speed: 1.5 // Increased speed
                });
            }

            function addHangingRedSquare() {
                hangingRedSquares.push({
                    x: width,
                    y: ceiling.y + ceiling.height, // Hanging from the ceiling
                    width: 120, // 3 times as wide
                    height: 480, // Twice as tall as the previous height
                    speed: 1.5 // Increased speed
                });
            }

            function getRandomInterval() {
                return Math.random() * (4000 - 2000) + 2000; // Random interval between 2-4 seconds
            }

            function update(progress) {
                // Update the position of the red squares to scroll left
                if (!gamePaused) {
                    redSquares.forEach(redSquare => {
                        redSquare.x -= progress * redSquare.speed;

                        // Remove red squares that go off the left edge
                        if (redSquare.x + redSquare.width < 0) {
                            redSquares.splice(redSquares.indexOf(redSquare), 1);
                        }
                    });

                    // Update the position of the hanging red squares to scroll left
                    hangingRedSquares.forEach(hangingRedSquare => {
                        hangingRedSquare.x -= progress * hangingRedSquare.speed;

                        // Remove hanging red squares that go off the left edge
                        if (hangingRedSquare.x + hangingRedSquare.width < 0) {
                            hangingRedSquares.splice(hangingRedSquares.indexOf(hangingRedSquare), 1);
                        }
                    });

                    // Scroll the floor to the left
                    floor.x -= progress * floor.speed;

                    // Wrap around the floor to create a continuous scrolling effect
                    if (floor.x + floor.width < 0) {
                        floor.x = 0;
                    }

                    // Apply gravity to the blue square
                    blueSquare.verticalSpeed += gravity * progress;
                    blueSquare.y += blueSquare.verticalSpeed * progress;

                    // Ensure the blue block hovers slightly above the ground level
                    if (blueSquare.y > groundLevel - hoverHeight) {
                        blueSquare.y = groundLevel - hoverHeight;
                        blueSquare.verticalSpeed = 0; // Reset vertical speed when on the ground
                    }

                    // Update the crouching state
                    if (keysPressed.current['s']) {
                        blueSquare.isCrouching = true;
                        blueSquare.height = originalBlueHeight * 2 / 3; // Shrink height to 2/3
                    } else {
                        blueSquare.isCrouching = false;
                        blueSquare.height = originalBlueHeight; // Restore original height
                    }

                    // Adjust y position to keep the bottom level the same when crouching
                    if (blueSquare.isCrouching) {
                        blueSquare.y = groundLevel - hoverHeight + (originalBlueHeight - blueSquare.height);
                    } else {
                        blueSquare.y = Math.min(blueSquare.y, groundLevel - hoverHeight);
                    }

                    // Update the vertical speed for jumping (jump overrules crouch)
                    if ((keysPressed.current['w'] || keysPressed.current[' ']) && blueSquare.y >= groundLevel - hoverHeight) {
                        blueSquare.verticalSpeed = jumpSpeed; // Jump
                    }

                    // Pause the game if any red square collides with the blue square
                    redSquares.forEach(redSquare => {
                        if (isColliding(blueSquare, redSquare)) {
                            setGamePaused(true);
                        }
                    });

                    // Pause the game if any hanging red square collides with the blue square
                    hangingRedSquares.forEach(hangingRedSquare => {
                        if (isColliding(blueSquare, hangingRedSquare)) {
                            setGamePaused(true);
                        }
                    });
                }
            }

            function draw() {
                ctx.clearRect(0, 0, width, height);

                // Draw the red squares
                ctx.fillStyle = 'red';
                redSquares.forEach(redSquare => {
                    ctx.fillRect(redSquare.x, redSquare.y, redSquare.width, redSquare.height);
                });

                // Draw the hanging red squares
                ctx.fillStyle = 'red';
                hangingRedSquares.forEach(hangingRedSquare => {
                    ctx.fillRect(hangingRedSquare.x, hangingRedSquare.y, hangingRedSquare.width, hangingRedSquare.height);
                });

                // Draw the blue square
                ctx.fillStyle = 'blue';
                ctx.fillRect(
                    blueSquare.x,
                    blueSquare.y,
                    blueSquare.width,
                    blueSquare.height
                );

                // Draw the green floor
                ctx.fillStyle = 'green';
                ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
                ctx.fillRect(floor.x + floor.width, floor.y, floor.width, floor.height); // Draw a second floor to create a continuous effect

                // Draw the yellow ceiling
                ctx.fillStyle = ceiling.color;
                ctx.fillRect(ceiling.x, ceiling.y, ceiling.width, ceiling.height);
            }

            function loop(timestamp) {
                var progress = timestamp - lastRender;

                update(progress);
                draw();

                lastRender = timestamp;
                window.requestAnimationFrame(loop);
            }

            var lastRender = 0;
            window.requestAnimationFrame(loop);

            window.addEventListener('keydown', (event) => handleKeyDown(event, keysPressed.current));
            window.addEventListener('keyup', (event) => handleKeyUp(event, keysPressed.current));

            // Add red squares and hanging red squares at random intervals
            function scheduleNextRedSquare() {
                if (!gamePaused) addRedSquare();
                setTimeout(scheduleNextRedSquare, getRandomInterval());
            }

            function scheduleNextHangingRedSquare() {
                if (!gamePaused) addHangingRedSquare();
                setTimeout(scheduleNextHangingRedSquare, getRandomInterval());
            }

            scheduleNextRedSquare();
            scheduleNextHangingRedSquare();

            return () => {
                window.removeEventListener('keydown', (event) => handleKeyDown(event, keysPressed.current));
                window.removeEventListener('keyup', (event) => handleKeyUp(event, keysPressed.current));
                clearTimeout(scheduleNextRedSquare);
                clearTimeout(scheduleNextHangingRedSquare);
            };
        }

        game();
    }, [gamePaused]);

    return (
        <div className={style.container}>
            <div className={style.display}>
                <canvas id="canvas" className={style.game}></canvas>
            </div>
        </div>
    );
}
