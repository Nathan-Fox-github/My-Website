export function isColliding(square, rect) {
    return square.x < rect.x + rect.width &&
           square.x + square.size > rect.x &&
           square.y < rect.y + rect.height &&
           square.y + square.size > rect.y;
}

export function handleKeyDown(event, keysPressed) {
    keysPressed[event.key] = true;
}

export function handleKeyUp(event, keysPressed) {
    keysPressed[event.key] = false;
}
