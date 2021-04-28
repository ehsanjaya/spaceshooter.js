var container = document.getElementById("container");
var player = document.getElementById("player");
var playerLeft = player.offsetLeft;
var playerTop = player.offsetTop;
var playerWidth = player.offsetWidth;


var life = document.getElementById("life");
var score = document.getElementById("score");
var playerLife = 3;
var playerScore = 0;

document.addEventListener("keydown", function(event){
    var width = document.body.offsetWidth;
    if(event.keyCode == 39)
    {
        if(playerLeft < width - playerWidth - 7)
        {
            playerLeft+=27;
        }
    }
    else if(event.keyCode == 37)
    {
        if(playerLeft > 0)
        {
            playerLeft-=27;
        }
    }

    player.style.top = playerTop + "px";
    player.style.left = playerLeft + "px";
});

document.addEventListener("keydown", function(event){
    if(event.keyCode == 32)
    {
        var bullet = document.createElement("div");
        container.append(bullet);
        bullet.className = "bullet";
        var width = playerWidth / 2;
        bullet.style.left = playerLeft + width - 70 + "px";
        bullet.style.top = playerTop + "px";
    }
});

var moveBulletInterval = setInterval(function(){
    var bullets = document.getElementsByClassName("bullet");
    for(var h = 0;h < bullets.length;h++)
    {
        var bullet = bullets[h];
        var bulletTop = bullet.offsetTop;
        bulletTop-=47;
        bullet.style.top = bulletTop + "px";
        if(bulletTop <= 0)
        {
            bullet.remove();
        }
    }
},2);

var createEnemyInterval = setInterval(function(){
    var enemy = document.createElement("div");
    container.append(enemy);
    enemy.className = "enemy";
    var width = document.body.offsetWidth - 100;
    var left = Math.floor(Math.random()*width);
    enemy.style.left = left + "px";
    enemy.style.top = 0;
}, 700);

var moveEnemyInterval = setInterval(function(){
    var enemies = document.getElementsByClassName("enemy");
    var bullets = document.getElementsByClassName("bullet");
    for(var i = 0;i < enemies.length;i++)
    {
        var enemy = enemies[i];
        var enemyTop = enemy.offsetTop;
        enemyTop+=7;
        enemy.style.top = enemyTop + "px";
        var height = document.body.offsetHeight - 200;
        if(enemyTop >= height)
        {
            enemy.remove();
        }

        if(touching(player, enemy))
        {
            player.classList.add("boom");
            playerLife--;
            life.innerHTML = "life:" + playerLife;
            enemy.remove();
            setTimeout(function(){
                player.classList.remove("boom");
            },400);
        }

        if(playerLife == 0)
        {
            gameOver();
        }

        for(var j = 0;j < bullets.length;j++)
        {
            var bullet = bullets[j];
            if(touching(enemy, bullet))
            {
                bullet.remove();
                enemy.remove();
                playerScore++;
                score.innerHTML = "score:" + playerScore;
            }
        }
    }
},27);

function touching(element1, element2)
{
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();

    var overlap = !(rect1.right < rect2.left || rect2.right < rect1.left ||rect1.bottom < rect2.top ||rect2.bottom < rect1.top);
    return overlap;
}

function gameOver()
{
    clearInterval(moveBulletInterval);
    clearInterval(createEnemyInterval);
    clearInterval(moveEnemyInterval);
}