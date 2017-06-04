
前端纳米学位街机游戏克隆项目
===============================

学生应该用这个[评审标准](https://review.udacity.com/#!/rubrics/499/view))来自我检查自己提交的代码。 确认自己写的函数要是**面向对象的** -  要么是类函数（就像函数 Player 和 Enemy）要么是类的原型链上的函数比如 Enemy.prototype.checkCollisions ， 在类函数里面或者类的原型链函数里面适当的使用关键词 'this' 来引用调用该函数的对象实例。最后保证你的**readme.md**文件要写明关于如何运行和如何玩你的街机游戏的指引。

关于如何开始这个项目的更详细的指导，可以查阅这份[指南](https://gdgdocs.org/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)。



1. ## 需完成的工作
	1. 在提供的范本 - Enemy 类(Class)的基础上创建 Player 类
    2. 填 Player 实例(instance)起始的位置信息(提示: x? y?)
    3. 用 Player 类创造一个player实例 (你就会看到游戏场景被启动了)
    4. 使用 Enemy 类创造多个 enemy 实例
    5. 填入 enemy 实例的起始位置信息
    6. 填入 enemy 实例的移动函数(function)
    7. 建立 player 的输入(input)函数 (Brian注: 以控制player的上下左右移动)
    8. 建立检测碰撞的函数
		
	註: 你不需要更改任何在 engine.js 或 resources.js 里的代码，你 只需 在 app.js 里写代码。Sprite(游戏里的角色)的位置不太好调，但只要多调整几次就行了。

	若能读懂此项目所提供的JS档里的注释最好，但那并不容易。
	
	(Brian注: 但我个人建议 一定要彻底把app.js 里的注释看懂)