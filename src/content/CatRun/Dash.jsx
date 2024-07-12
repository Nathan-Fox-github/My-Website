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
                speed: 0.9 // Speed of the floor and the red block
            };

            var redSquare = {
                x: width / 2,
                y: height - floor.height - 20, // Position just above the floor
                size: 20,
                speed: 0.9
            };

            var blueSquare = {
                x: width / 3,
                y: height / 3,
                width: 50,
                height: 50,
                speed: 5
            };

            const gravity = 0.05;
            const groundLevel = height - floor.height - blueSquare.height;
            
            var keysPressed = {};

            function update(progress) {
                // Update the position of the red square to scroll left
                redSquare.x -= progress * redSquare.speed;
            
                // Wrap around if red square goes off the left edge
                if (redSquare.x + redSquare.size < 0) {
                    redSquare.x = width;
                }
            
                // Scroll the floor to the left
                floor.x -= progress * floor.speed;
            
                // Wrap around the floor to create a continuous scrolling effect
                if (floor.x + floor.width < 0) {
                    floor.x = 0;
                }
            
                // Apply gravity to the blue square
                blueSquare.y += progress * gravity;
            
                // Prevent the blue square from falling through the floor
                if (blueSquare.y > groundLevel) {
                    blueSquare.y = groundLevel;
                }
            
                // Update the position of the blue square based on keys pressed
                if (keysPressed['w'] && blueSquare.y === groundLevel) {
                    blueSquare.y -= blueSquare.speed * 10; // Jump
                }
                if (keysPressed['a']) {
                    blueSquare.x -= blueSquare.speed;
                }
                if (keysPressed['s'] && blueSquare.y < groundLevel) {
                    blueSquare.y += blueSquare.speed; // Fall faster if 's' is pressed
                }
                if (keysPressed['d']) {
                    blueSquare.x += blueSquare.speed;
                }
            
                // Pause red square if it collides with the blue square
                if (isColliding(redSquare, blueSquare)) {
                    redSquare.x += progress * redSquare.speed;
                    floor.x += progress * floor.speed;
                }
            }
            

            function draw() {
                ctx.clearRect(0, 0, width, height);

                // Draw the red square
                ctx.fillStyle = 'red';
                ctx.fillRect(redSquare.x, redSquare.y, redSquare.size, redSquare.size);

                // Draw the blue square
                ctx.fillStyle = 'blue';
                ctx.fillRect(blueSquare.x, blueSquare.y, blueSquare.width, blueSquare.height);

                // Draw the green floor
                ctx.fillStyle = 'green';
                ctx.fillRect(floor.x, floor.y, floor.width, floor.height);
                ctx.fillRect(floor.x + floor.width, floor.y, floor.width, floor.height); // Draw a second floor to create a continuous effect
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

            return () => {
                window.removeEventListener('keydown', (event) => handleKeyDown(event, keysPressed));
                window.removeEventListener('keyup', (event) => handleKeyUp(event, keysPressed));
            };
        }

        game();
    }, []);

    return (
        <div className={style.container}>
            <div className={style.display}>
                <canvas id="canvas" className={style.game}></canvas>
            </div>
        </div>
    );
}
