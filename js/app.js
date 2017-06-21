var enemy_debug = true;
var player_debug = false;
var CELL_WIDTH = 101;
var CELL_HEIGHT = 83;
function GetRandomNum(Min,Max)
{   
    var Range = Max - Min;   
    var Rand = Math.random();   
    return(Min + Math.round(Rand * Range));   
}   

// 这是我们的玩家要躲避的敌人 
var Enemy = function(x,y) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = x;
    this.y = y;
    this.speed = GetRandomNum(10,101);
    if(enemy_debug)console.log("enemy speed:"+this.speed);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.width = CELL_WIDTH;
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    if(enemy_debug)console.log('location of enemy,x:'+this.x+'y:'+this.y);
    this.x = this.x + this.speed*dt;
    this.x = this.x > (ctx.canvas.width + this.width) ? CELL_WIDTH *(-1) : this.x;
    this.render();
    this.checkCollision();
};

//检查敌人与玩家是否发生碰撞了
Enemy.prototype.checkCollision = function(){
    var enemyCenterX = this.x + CELL_WIDTH/2;
    var enemyCenterY = this.y + CELL_HEIGHT/2;

    var playerCenterX = player.x + CELL_WIDTH/2;
    var palyerCenterY = player.y + CELL_HEIGHT/2;

    if((Math.abs(enemyCenterX - playerCenterX)<CELL_WIDTH/2) && Math.abs(enemyCenterY- palyerCenterY)<CELL_HEIGHT/2)
    {
        console.log("enemy x:"+this.x+"y:"+this.y+" player x:"+player.x+"y:"+player.y+"相撞了，呜呜呜。。。");
        player.reset();
    }
}

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function()
{
    this.x = this.initPos.x;
    this.y = this.initPos.y; 
    this.speed = GetRandomNum(10,83);
    this.sprite = 'images/char-boy.png';
}

Player.prototype.initPos = {x:CELL_WIDTH * 2,y:CELL_HEIGHT * 5};
Player.prototype.maxPos = {x:CELL_WIDTH * 4,y:CELL_HEIGHT * 5};
Player.prototype.update = function()
{
    if(player_debug)console.log('location of player,x:'+this.x+",y:"+this.y);
    if(this.y == 0)////玩家躲过敌人，成功过河
    {
        //宣布玩家胜利
        this.win();
        //重新置位玩家
        this.reset();
    }
    else
    {
        this.render();
    }
}
Player.prototype.reset = function()
{
    this.x = this.initPos.x;
    this.y = this.initPos.y; 
    this.update();
}

Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
}

Player.prototype.handleInput = function(direction)
{
    if(player_debug)console.log('player direction is:'+direction);
    switch(direction)
    {
        case 'left':
            this.x -= this.speed;
            break;
        case 'right':
            this.x += this.speed;
            break;
        case 'up':
            this.y -= this.speed;
            break;
        case 'down':
            this.y += this.speed;
            break;
    }

    if(this.x < 0) this.x = 0;
    if(this.x > this.maxPos.x)this.x = this.maxPos.x;
    if(this.y < 0) this.y = 0;
    if(this.y > this.maxPos.y)this.y = this.maxPos.y;
    if(player_debug)console.log('player position x: '+this.x+'; y: '+this.y);
    this.update();
}

Player.prototype.win = function()
{
    alert("Congratulation");
}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
window.allEnemies = [];
var enemyPathNum = 3;
for(var row = 0;row < enemyPathNum; row ++)
{
    //每条过道2个
    for(var index = 0;index < 2;index ++)
    {
        //第row过道上，敌人的y坐标
        var enemy = new Enemy(0,(row + 0.5) * CELL_HEIGHT);
         //敌人的x坐标，随机生成，有可能在界面之外
        enemy.x = enemy.speed * GetRandomNum(0,10) * (-1);
        allEnemies.push(enemy);
        if(enemy_debug)console.log('add a enemy,x: '+enemy.x+', y: ' + enemy.y);
    }
}


window.player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(player_debug)console.log('keyup occure,keyCode:'+e.keyCode);
    player.handleInput(allowedKeys[e.keyCode]);
});