// SYNQAI Academia - Advanced Background Animations
// 深海をテーマにした最先端技術を表現するアニメーション

class DeepOceanAnimation {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.bubbles = [];
        this.waves = [];
        this.grid = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // Canvas要素を作成
        this.createCanvas();
        
        // パーティクルとエフェクトを初期化
        this.initParticles();
        this.initBubbles();
        this.initWaves();
        this.initGrid();
        
        // イベントリスナー
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        
        // アニメーション開始
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.canvas.style.opacity = '0.6'; // より視認しやすく
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        this.ctx = this.canvas.getContext('2d');
        this.handleResize();
    }

    handleResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    handleMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    // パーティクル（発光する粒子）
    initParticles() {
        const particleCount = 80; // 増やして視認性向上
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 4 + 2, // より大きく
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.7 + 0.3, // より明るく
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                color: this.getRandomColor()
            });
        }
    }

    // 泡のエフェクト
    initBubbles() {
        const bubbleCount = 20;
        for (let i = 0; i < bubbleCount; i++) {
            this.bubbles.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + Math.random() * 200,
                size: Math.random() * 20 + 10, // 大きな泡
                speed: Math.random() * 1.5 + 0.5,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.02 + 0.01,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    // 波動エフェクト
    initWaves() {
        for (let i = 0; i < 3; i++) {
            this.waves.push({
                y: window.innerHeight * (0.3 + i * 0.2),
                amplitude: 40 + i * 10,
                frequency: 0.01 - i * 0.002,
                phase: i * Math.PI / 3,
                opacity: 0.15 - i * 0.03 // より濃く
            });
        }
    }

    // デジタルグリッド
    initGrid() {
        const gridSize = 100; // グリッドサイズを大きく
        const cols = Math.ceil(window.innerWidth / gridSize) + 1;
        const rows = Math.ceil(window.innerHeight / gridSize) + 1;
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                this.grid.push({
                    x: i * gridSize,
                    y: j * gridSize,
                    opacity: 0,
                    targetOpacity: 0,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
    }

    getRandomColor() {
        const colors = [
            '#64b5f6', // 生物発光ブルー
            '#00acc1', // 深海シアン
            '#7dd3fc', // オーロラ
            '#3b82c4'  // 浅海層
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 各要素を描画
        this.drawGrid();
        this.drawWaves();
        this.drawParticles();
        this.drawBubbles();
        this.drawConnections();
        
        // 次のフレーム
        requestAnimationFrame(() => this.animate());
    }

    drawGrid() {
        this.ctx.strokeStyle = '#3b82c4';
        this.ctx.lineWidth = 1;
        
        // グリッドの各点を更新・描画
        this.grid.forEach(point => {
            // マウスとの距離を計算
            const distance = Math.sqrt(
                Math.pow(point.x - this.mouseX, 2) + 
                Math.pow(point.y - this.mouseY, 2)
            );
            
            // 近くにマウスがある場合は明るくする
            if (distance < 200) {
                point.targetOpacity = 0.5 * (1 - distance / 200);
            } else {
                point.targetOpacity = Math.sin(point.pulse) * 0.1 + 0.05;
            }
            
            // スムーズに不透明度を変更
            point.opacity += (point.targetOpacity - point.opacity) * 0.1;
            point.pulse += 0.01;
            
            // 点を描画
            if (point.opacity > 0.01) {
                this.ctx.globalAlpha = point.opacity;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = '#7dd3fc';
                this.ctx.fill();
            }
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawWaves() {
        this.waves.forEach(wave => {
            this.ctx.strokeStyle = '#3b82c4';
            this.ctx.lineWidth = 2;
            this.ctx.globalAlpha = wave.opacity;
            this.ctx.beginPath();
            
            for (let x = 0; x <= this.canvas.width; x += 5) {
                const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
            wave.phase += 0.02;
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // パルス効果
            particle.pulse += particle.pulseSpeed;
            const pulseFactor = Math.sin(particle.pulse) * 0.3 + 0.7;
            
            // パーティクルを更新
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 画面端でラップ
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // グロー効果で描画
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, particle.color + 'ff');
            gradient.addColorStop(0.5, particle.color + '80');
            gradient.addColorStop(1, particle.color + '00');
            
            this.ctx.globalAlpha = particle.opacity * pulseFactor;
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                particle.x - particle.size * 3,
                particle.y - particle.size * 3,
                particle.size * 6,
                particle.size * 6
            );
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawBubbles() {
        this.bubbles.forEach(bubble => {
            // 泡を上昇させる
            bubble.y -= bubble.speed;
            bubble.wobble += bubble.wobbleSpeed;
            const wobbleX = Math.sin(bubble.wobble) * 20;
            
            // 画面上部に達したら下部にリセット
            if (bubble.y < -bubble.size) {
                bubble.y = this.canvas.height + bubble.size;
                bubble.x = Math.random() * this.canvas.width;
            }
            
            // 泡を描画
            this.ctx.globalAlpha = bubble.opacity;
            this.ctx.strokeStyle = '#7dd3fc';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(bubble.x + wobbleX, bubble.y, bubble.size, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // ハイライト
            this.ctx.globalAlpha = bubble.opacity * 0.5;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(
                bubble.x + wobbleX - bubble.size * 0.3,
                bubble.y - bubble.size * 0.3,
                bubble.size * 0.2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }

    drawConnections() {
        // 近いパーティクル同士を線で接続
        this.ctx.strokeStyle = '#64b5f6';
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = Math.sqrt(
                    Math.pow(this.particles[i].x - this.particles[j].x, 2) +
                    Math.pow(this.particles[i].y - this.particles[j].y, 2)
                );
                
                if (distance < 150) {
                    this.ctx.globalAlpha = 0.2 * (1 - distance / 150);
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        this.ctx.globalAlpha = 1;
    }
}

// ページ読み込み時にアニメーションを開始
document.addEventListener('DOMContentLoaded', () => {
    // パフォーマンスを考慮して、モバイルでは軽量版を使用
    const isMobile = window.innerWidth < 768;
    
    if (!isMobile) {
        const animation = new DeepOceanAnimation();
        console.log('Deep Ocean Animation initialized');
    } else {
        console.log('Animation disabled on mobile for performance');
    }
});