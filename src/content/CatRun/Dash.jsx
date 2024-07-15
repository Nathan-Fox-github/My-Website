import { useEffect } from 'react';
import { isColliding, handleKeyDown, handleKeyUp } from './scripts/gameUtils';
import style from './style/CatRun.module.css';

export function Dash() {
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

            const gravity = 0.015; // Lower gravity for more airtime
            const jumpSpeed = -3; // Adjusted jump speed
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
                    width: 80,
                    height: 240,
                    speed: 1.5
                });
            }

            function addHangingRedSquare() {
                hangingRedSquares.push({
                    x: width,
                    y: ceiling.y + ceiling.height,
                    width: 120,
                    height: 340,
                    speed: 1.5
                });
            }

            function getRandomInterval() {
                return Math.random() * (2000 - 1000) + 1000; // Random interval between 1-2 seconds
            }

            var keysPressed = {}; // Initialize keysPressed here

            function update(progress) {
                // Update the position of the red squares to scroll left
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

                // Pause red square if it collides with the blue square
                redSquares.forEach(redSquare => {
                    if (isColliding(blueSquare, redSquare)) {
                        redSquare.x += progress * redSquare.speed;
                        floor.x += progress * floor.speed;
                    }
                });

                // Pause red square if it collides with the blue square
                hangingRedSquares.forEach(hangingRedSquare => {
                    if (isColliding(blueSquare, hangingRedSquare)) {
                        hangingRedSquare.x += progress * hangingRedSquare.speed;
                        floor.x += progress * floor.speed;
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
                if (keysPressed['s']) {
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
                if ((keysPressed['w'] || keysPressed[' ']) && blueSquare.y >= groundLevel - hoverHeight) {
                    blueSquare.verticalSpeed = jumpSpeed; // Jump
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

            window.addEventListener('keydown', (event) => handleKeyDown(event, keysPressed));
            window.addEventListener('keyup', (event) => handleKeyUp(event, keysPressed));

            // Add red squares and hanging red squares at random intervals
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
                window.removeEventListener('keydown', (event) => handleKeyDown(event, keysPressed));
                window.removeEventListener('keyup', (event) => handleKeyUp(event, keysPressed));
                clearTimeout(scheduleNextRedSquare);
            };
        }

        game();
    }, []);

    return (
        <canvas id="canvas" className={style.game}></canvas>
    );
}
