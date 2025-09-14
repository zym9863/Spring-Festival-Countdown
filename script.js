// 设置2026年春节时间（农历正月初一）
const lunarNewYear = new Date('2026-01-29T00:00:00+08:00');

// 性能优化配置
const isMobile = window.innerWidth <= 768;
const isSmallScreen = window.innerWidth <= 480;

// 根据设备性能调整动画强度
const particleFrequency = isSmallScreen ? 400 : isMobile ? 300 : 200;
const maxParticles = isSmallScreen ? 15 : isMobile ? 25 : 50;

// 粒子计数器
let particleCount = 0;

// 数字更新动画函数
function updateNumberWithAnimation(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = element.textContent;
    
    if (currentValue !== newValue) {
        // 添加更新动画类
        element.style.animation = 'none';
        element.offsetHeight; // 触发重排
        element.style.animation = 'numberUpdate 0.6s ease-out';
        
        // 延迟更新数字，让动画先开始
        setTimeout(() => {
            element.textContent = newValue;
        }, 100);
        
        // 动画结束后清理
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
}

// 增强粒子系统 - 多样化粒子类型（性能优化版）
function createParticle() {
    // 性能检查
    if (particleCount >= maxParticles) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // 移动端简化粒子类型
    const particleTypes = isMobile ? [
        {
            type: 'snowflake',
            emoji: ['❄️', '❅'],
            size: '20-30px',
            color: 'rgba(255, 255, 255, 0.8)',
            animation: 'snowfall',
            frequency: 0.6
        },
        {
            type: 'gold_dust',
            emoji: ['✨', '⭐'],
            size: '15-25px',
            color: 'rgba(255, 215, 0, 0.9)',
            animation: 'goldenFloat',
            frequency: 0.4
        }
    ] : [
        {
            type: 'snowflake',
            emoji: ['❄️', '❅', '❆'],
            size: '20-30px',
            color: 'rgba(255, 255, 255, 0.8)',
            animation: 'snowfall',
            frequency: 0.4
        },
        {
            type: 'gold_dust',
            emoji: ['✨', '⭐', '✦'],
            size: '15-25px',
            color: 'rgba(255, 215, 0, 0.9)',
            animation: 'goldenFloat',
            frequency: 0.3
        },
        {
            type: 'peach_blossom',
            emoji: ['🌸', '🌺', '🌷'],
            size: '25-35px',
            color: 'rgba(255, 182, 193, 0.7)',
            animation: 'petalFall',
            frequency: 0.2
        },
        {
            type: 'lucky_star',
            emoji: ['🌟', '⭐', '✨'],
            size: '18-28px',
            color: 'rgba(255, 215, 0, 1)',
            animation: 'starTwinkle',
            frequency: 0.1
        }
    ];
    
    // 根据频率选择粒子类型
    const random = Math.random();
    let selectedType = particleTypes[0];
    let cumulative = 0;
    
    for (const type of particleTypes) {
        cumulative += type.frequency;
        if (random <= cumulative) {
            selectedType = type;
            break;
        }
    }
    
    // 随机选择emoji
    const emoji = selectedType.emoji[Math.floor(Math.random() * selectedType.emoji.length)];
    const size = Math.random() * 20 + 15;
    const startX = Math.random() * 100;
    const duration = Math.random() * 3 + 2; // 移动端缩短动画时间
    const delay = Math.random() * 1;
    
    // 3D深度效果（移动端简化）
    const depth = isMobile ? 0.5 : Math.random();
    const scale = 0.5 + depth * 0.8;
    const opacity = isMobile ? 0.6 : (0.4 + depth * 0.6);
    const speedMultiplier = 0.7 + depth * 0.6;
    
    particle.style.cssText = `
        position: absolute;
        font-size: ${size * scale}px;
        left: ${startX}vw;
        top: -50px;
        animation: ${selectedType.animation} ${duration / speedMultiplier}s linear infinite;
        animation-delay: ${delay}s;
        opacity: ${opacity};
        z-index: ${Math.floor(depth * 10)};
        pointer-events: none;
        filter: drop-shadow(0 0 ${isMobile ? 3 : 5 + depth * 10}px ${selectedType.color});
        user-select: none;
    `;
    
    particle.textContent = emoji;
    document.getElementById('particles-container').appendChild(particle);
    particleCount++;
    
    // 移除超出视口的粒子
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            particleCount--;
        }
    }, (duration / speedMultiplier + delay) * 1000);
}

// 定期创建新粒子（性能优化版）
setInterval(createParticle, particleFrequency);

// 更新背景色饱和度
function updateBackgroundSaturation(days) {
    const maxSaturation = 100;
    const minSaturation = 60;
    const saturationIncrease = 1.5;
    const currentSaturation = Math.min(maxSaturation, minSaturation + (365 - days) * saturationIncrease);
    document.body.style.filter = `saturate(${currentSaturation}%)`;
}

function updateCountdown() {
    const now = new Date();
    const diff = lunarNewYear - now;

    // 如果已经过了春节，显示新年祝福
    if (diff < 0) {
        document.getElementById('days').textContent = '000';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.message').textContent = '恭贺新春！';
        return;
    }

    // 计算剩余时间
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // 更新显示，添加动画效果
    updateNumberWithAnimation('days', days.toString().padStart(3, '0'));
    updateNumberWithAnimation('hours', hours.toString().padStart(2, '0'));
    updateNumberWithAnimation('minutes', minutes.toString().padStart(2, '0'));
    updateNumberWithAnimation('seconds', seconds.toString().padStart(2, '0'));

    // 更新背景色饱和度
    updateBackgroundSaturation(days);

    // 当倒计时接近零时添加动画效果
    if (diff < 60000) { // 最后一分钟
        document.querySelectorAll('.number').forEach(el => {
            el.style.animation = 'pulse 1s infinite';
        });
    }
}

// 添加脉动动画样式
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);

// 鼠标跟随效果
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    // 清除之前的定时器
    clearTimeout(window.mouseMoveTimeout);
    
    // 设置新的定时器，鼠标停止移动后重置
    window.mouseMoveTimeout = setTimeout(() => {
        isMouseMoving = false;
    }, 100);
});

// 更新容器跟随鼠标（性能优化版）
function updateMouseFollow() {
    if (isMouseMoving && !isMobile) {
        const container = document.getElementById('main-container');
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // 计算鼠标相对于中心的位置
        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;
        
        // 应用轻微的3D旋转效果（移动端减弱效果）
        const rotateY = deltaX * (isMobile ? 4 : 8);
        const rotateX = -deltaY * (isMobile ? 4 : 8);
        const translateZ = 20 + Math.abs(deltaX) * (isMobile ? 5 : 10) + Math.abs(deltaY) * (isMobile ? 5 : 10);
        
        container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        
        // 更新粒子容器（移动端不更新以提升性能）
        if (!isMobile) {
            const particlesContainer = document.getElementById('particles-container');
            particlesContainer.style.transform = `perspective(1000px) rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg)`;
        }
    }
    
    requestAnimationFrame(updateMouseFollow);
}

// 启动鼠标跟随动画
updateMouseFollow();

// 点击涟漪效果
document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
});

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: fixed;
        left: ${x - 50}px;
        top: ${y - 50}px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.6), transparent);
        pointer-events: none;
        z-index: 9999;
        animation: rippleExpand 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// 初始更新
updateCountdown();

// 每秒更新倒计时
setInterval(updateCountdown, 1000);