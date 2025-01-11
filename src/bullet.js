const container = document.getElementById("container");

export function spawnBullet() {
  const ship = document.querySelector(".ship");
  const bullet = document.createElement("img");
  bullet.src = "./style/img/bullet.png";
  bullet.alt = "Bullet";
  bullet.classList.add("bullet");

  const shipRect = ship.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const bulletX = shipRect.left + shipRect.width / 2 - containerRect.left - 5;
  const bulletY = shipRect.top - containerRect.top - 10;

  bullet.style.left = `${bulletX}px`;
  bullet.style.top = `${bulletY}px`;
  container.appendChild(bullet);

  animateBullet(bullet);
}
let varScore = 0;
function animateBullet(bullet) {
  function move() {
    const bulletRect = bullet.getBoundingClientRect();
    const aliens = document.querySelectorAll(".alien");

    // Check collisions
    aliens.forEach((alien) => {
      const alienRect = alien.getBoundingClientRect();
      if (isColliding(bulletRect, alienRect)) {
        alien.remove();
        bullet.remove();
        varScore += 10;
        scoreAndlives("container");
        return;
      }
    });

    const currentTop = parseInt(bullet.style.top, 10);
    if (currentTop <= 0) {
      bullet.remove();
    } else {
      bullet.style.top = `${currentTop - 5}px`;
      requestAnimationFrame(move);
    }
  }
  requestAnimationFrame(move);
}

function isColliding(rect1, rect2) {
  return !(
    rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom
  );
}

let lastBulletTime = 0;
const BULLET_COOLDOWN = 100;
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    const currentTime = Date.now();
    if (currentTime - lastBulletTime >= BULLET_COOLDOWN) {
      spawnBullet();
      lastBulletTime = currentTime;
    }
  }
});


/********************************* score and lives logic ******************************************/
export function scoreAndlives() {
  //const container = document.getElementById('container');

  const score = document.createElement("div");
  score.className = "score";
  score.innerText = `score : ${varScore}`;

  const livesContainer = document.createElement("div");
  livesContainer.className = "lives-container";


  for (let i = 0; i < 3; i++) {
    const heart = document.createElement("img");
    heart.src = "./style/img/heart.png";
    heart.alt = "Heart";
    heart.classList.add("heart");

    livesContainer.appendChild(heart);
  }

  container.appendChild(score);
  container.appendChild(livesContainer);
}
