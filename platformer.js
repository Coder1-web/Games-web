const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;
const jumpPower = -10;
const playerSpeed = 4;
let score = 0;
let isJumping = false;
let isGameOver = false;
let keys = {};

// Player object
const player = {
    x: 50,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    dy: 0,
    dx: 0
};

// Obstacles array
let obstacles = [];
const obstacleWidth = 30;
const obstacleHeight = 50;
const obstacleSpeed = 4;
const obstacleFrequency = 100;
let obstacleTimer = 0;

// Update score display
function updateScore() {
    document.getElementById('score').textContent = "Score: " + score;
}

// Add a new obstacle
function addObstacle() {
    if (obstacleTimer <= 0) {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - obstacleHeight,
            width: obstacleWidth,
            height: obstacleHeight
        });
        obstacleTimer = obstacleFrequency;
    } else {
        obstacleTimer--;
    }
}

// Update game state
function update() {
    if (isGameOver) return;

    // Player movement and gravity
    player.dy += gravity;
    player.y += player.dy;

    // Move player left or right
    if (keys['ArrowLeft']) {
        player.x -= playerSpeed;
    } else if (keys['ArrowRight']) {
        player.x += playerSpeed;
    }

    // Collision with ground
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    // Move obstacles
    obstacles.forEach(obstacle => {
        obstacle.x -= obstacleSpeed;
    });

    // Check for collisions
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            isGameOver = true;
            alert("Game Over! Your score was: " + score);
            document.location.reload();
        }
    });

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

    // Increment score based on time survived
    score++;
    updateScore();
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw obstacles
    ctx.fillStyle = '#FF6347';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Main game loop
function gameLoop() {
    if (!isGameOver) {
        addObstacle();
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }
}

// Event listeners for movement
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    if (e.key === 'ArrowUp' && player.dy === 0) {
        isJumping = true;
        player.dy = jumpPower;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Start the game loop
gameLoop();
