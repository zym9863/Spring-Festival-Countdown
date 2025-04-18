// 设置2026年春节时间（农历正月初一）
const lunarNewYear = new Date('2026-01-29T00:00:00+08:00');

// 创建粒子系统
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 20 + 10}px;
        height: ${Math.random() * 20 + 10}px;
        background: radial-gradient(circle at center, rgba(255,215,0,0.8), rgba(255,215,0,0));
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: -20px;
        animation: snowfall ${Math.random() * 3 + 2}s linear infinite;
        opacity: ${Math.random() * 0.5 + 0.3};
    `;
    document.getElementById('particles-container').appendChild(particle);
    
    // 移除超出视口的粒子
    setTimeout(() => {
        particle.remove();
    }, 5000);
}

// 定期创建新粒子
setInterval(createParticle, 200);

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

    // 更新显示
    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

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

// 初始更新
updateCountdown();

// 每秒更新倒计时
setInterval(updateCountdown, 1000);