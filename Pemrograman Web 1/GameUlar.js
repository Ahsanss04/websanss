const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Konfigurasi dasar
const box = 20;
const canvasSize = 400;
const snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
};
let score = 0;

// Fungsi mengubah arah ular
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") {
        direction = "LEFT";
    } else if (event.keyCode === 38 && direction !== "DOWN") {
        direction = "UP";
    } else if (event.keyCode === 39 && direction !== "LEFT") {
        direction = "RIGHT";
    } else if (event.keyCode === 40 && direction !== "UP") {
        direction = "DOWN";
    }
}

// Fungsi menggambar game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Menggambar makanan
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Menggambar ular
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Gerakan ular
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Jika ular makan makanan
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * (canvasSize / box)) * box,
            y: Math.floor(Math.random() * (canvasSize / box)) * box
        };
    } else {
        // Hapus bagian ekor
        snake.pop();
    }

    // Tambah kepala baru
    const newHead = { x: snakeX, y: snakeY };

    // Kondisi Game Over
    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    snake.unshift(newHead);

    // Menampilkan Skor
    ctx.fillStyle = "aliceblue";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, box, box);
}

// Fungsi untuk mendeteksi tabrakan
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Menjalankan game setiap 100 milidetik
const game = setInterval(draw, 100);
