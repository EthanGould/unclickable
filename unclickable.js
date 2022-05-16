const module = {};

module.dodgeMouse = (x, y) => {
    module.btn.style.left = `${x}px`;
    module.btn.style.top = `${y}px`;
}

module.changeMode = (event) => {
    module.modeDelay = module.delays[module.mode.options.selectedIndex]
    module.html.classList.remove('spicy');
    module.html.classList.remove('sniper');
    module.html.classList.add(module.mode.value);
}

module.updateUI = () => {
    let msg = 'Nice Click!';

    switch (module.hyperClickCount) {
        case 2:
            msg = '🏄 Double Click!';
            break;
        case 3:
            msg = '🌟 Triple Click!';
            break;
        case 4:
            msg = '🔥 Quaad Squaad! 🔥';
            break;
    }


    module.clickCount.classList.add('pop');
    module.clickMsg.textContent = msg;
    module.clickMsg.classList.remove('show-2');
    module.clickMsg.classList.remove('show-3');
    module.clickMsg.classList.remove('show-4');
    module.clickMsg.classList.add('show');
    module.clickMsg.classList.add(`show-${module.hyperClickCount}`);

    setTimeout(function() {
        module.clickMsg.classList.remove('show');
        module.clickCount.classList.remove('pop');
    }, module.clickMsgDismissal);
}

module.incrementClicks = () => {
    module.clickCount.textContent = Math.floor(module.clickCount.textContent) + 1;
    module.hyperClickCount++;

    module.updateUI();
    setTimeout(function() {
        module.hyperClickCount = 0;
    }, 500);
}

module.startGame = () => {
    module.btn.classList.remove('hide');
}

module.calculateDodge = (mouse) => {
    let btn = document.querySelector('.js-btn-wrap'),
        mouseX = mouse.x,
        mouseY = mouse.y,
        btnX = btn.offsetLeft,
        btnY = btn.offsetTop,
        btnWidth = btn.clientWidth / 2,
        btnHeight = btn.clientHeight / 2,
        dodgeDistance = (Math.random() * 100) + 100;

    // move down (default)
    let dodgeY = btn.offsetTop - dodgeDistance;
    // move left (default)
    let dodgeX = btn.offsetLeft - dodgeDistance

    // move up
    if (mouseY < (btn.offsetTop + btnHeight)) {
        dodgeY =  btn.offsetTop + dodgeDistance;
    }
    // move right
    if (mouseX < (btnX + btnWidth)) {
        dodgeX = btn.offsetLeft + dodgeDistance;
    }


    // Ensure button stays within the viewport
    // if the button is "near" the left or right edge, move it towards the center
    if (btnX < 100 || btnX > window.innerWidth - module.viewportPadding) {
        dodgeX = window.innerWidth / 2;
    }
    // if the button is "near" the top or bottom edge, move it towards the center
    if (btnY < 100 || btnY > window.innerHeight - module.viewportPadding) {
        dodgeY = window.innerHeight / 2;
    }
    // Move the button, with a slight delay to allow for clicks to register
    module.dodge = setTimeout(function() {
        module.dodgeMouse(dodgeX , dodgeY)
    }, module.modeDelay);
}

module.events = () => {
    module.btn.addEventListener('mouseover', module.calculateDodge);
    module.actualBtn.addEventListener('mousedown', module.incrementClicks);
    module.mode.addEventListener('change', module.changeMode);

    setTimeout(module.startGame, 1000);
}

module.init = () => {
    module.btn = document.querySelector('.js-btn-wrap');
    module.actualBtn = document.querySelector('.js-btn');
    module.clickMsg = document.querySelector('.js-click-msg');
    module.clickBadges = document.querySelector('.js-badges');
    module.clickCount = document.querySelector('[data-counter]');
    module.mode = document.querySelector('select');
    module.html = document.querySelector('html');
    module.hyperClickCount = 0;
    module.delays = [500, 300, 200];

    module.dodgeDistance = (Math.random() * 100) + 100; 
    module.modeDelay = 500;
    module.viewportPadding = 300;
    module.clickMsgDismissal = 1000;
    
    module.events();
}

module.init();
