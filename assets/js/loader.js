// Hacking theme loader functionality
document.addEventListener('DOMContentLoaded', function () {
    // Create loader HTML
    const loaderHTML = `
        <div class="loader-overlay" id="loader">
            <div class="matrix-chars" id="matrixChars"></div>
            <div class="loader-container">
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-buttons">
                            <div class="terminal-button close"></div>
                            <div class="terminal-button minimize"></div>
                            <div class="terminal-button maximize"></div>
                        </div>
                        <div class="terminal-title">MIGZ_PORTFOLIO.exe</div>
                    </div>
                    <div class="terminal-content">
                        <div class="terminal-line"><span class="prompt">root@migz:~$</span> initializing_portfolio.exe</div>
                        <div class="terminal-line"><span class="success">[OK]</span> Loading user interface...</div>
                        <div class="terminal-line"><span class="success">[OK]</span> Compiling projects data...</div>
                        <div class="terminal-line"><span class="warning">[WAIT]</span> Establishing secure connection...</div>
                        <div class="terminal-line"><span class="success">[COMPLETE]</span> Welcome to Juan Miguel's Portfolio<span class="cursor"></span></div>
                    </div>
                    <div class="scanline"></div>
                </div>
                
                <div class="circular-loader">
                    <svg>
                        <circle class="track" cx="40" cy="40" r="40"></circle>
                        <circle class="progress" cx="40" cy="40" r="40"></circle>
                    </svg>
                    <div class="percentage" id="percentage">0%</div>
                </div>
                
                <div class="loading-text glitch" data-text="ACCESSING PORTFOLIO">
                    ACCESSING PORTFOLIO
                </div>
            </div>
            
            <div class="boot-sequence">
                SYSTEM BOOT COMPLETE • PORTFOLIO READY
            </div>
        </div>
    `;

    // Insert loader at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    // Create matrix falling characters
    createMatrixChars();

    // Start loading simulation
    simulateLoading();

    // Hide loader after everything is loaded
    window.addEventListener('load', function () {
        setTimeout(hideLoader, 1000); // Additional delay for effect
    });
});

// Create falling matrix characters
function createMatrixChars() {
    const matrixContainer = document.getElementById('matrixChars');
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]()#$%^&*';
    const numChars = 50;

    for (let i = 0; i < numChars; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.animationDelay = Math.random() * 2 + 's';
        char.style.fontSize = (Math.random() * 10 + 10) + 'px';

        matrixContainer.appendChild(char);

        // Remove and recreate characters periodically
        setTimeout(() => {
            if (char.parentNode) {
                char.remove();
                // Create new character
                const newChar = document.createElement('div');
                newChar.className = 'matrix-char';
                newChar.textContent = chars[Math.floor(Math.random() * chars.length)];
                newChar.style.left = Math.random() * 100 + '%';
                newChar.style.animationDuration = (Math.random() * 3 + 2) + 's';
                newChar.style.fontSize = (Math.random() * 10 + 10) + 'px';
                matrixContainer.appendChild(newChar);
            }
        }, (Math.random() * 5000 + 3000));
    }
}

// Simulate loading progress
function simulateLoading() {
    const percentageElement = document.getElementById('percentage');
    let progress = 0;

    const loadingSteps = [
        { percent: 15, delay: 300 },
        { percent: 35, delay: 500 },
        { percent: 55, delay: 400 },
        { percent: 78, delay: 300 },
        { percent: 90, delay: 200 },
        { percent: 100, delay: 400 }
    ];

    function updateProgress(targetPercent, delay) {
        return new Promise(resolve => {
            const increment = (targetPercent - progress) / 10;
            const interval = setInterval(() => {
                progress += increment;
                if (progress >= targetPercent) {
                    progress = targetPercent;
                    percentageElement.textContent = Math.round(progress) + '%';
                    clearInterval(interval);
                    resolve();
                } else {
                    percentageElement.textContent = Math.round(progress) + '%';
                }
            }, delay / 10);
        });
    }

    // Execute loading steps
    async function runLoadingSequence() {
        for (const step of loadingSteps) {
            await updateProgress(step.percent, step.delay);
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    runLoadingSequence();
}

// Hide loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');

        // Remove loader from DOM after transition
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
}

// Add some interactive effects
document.addEventListener('mousemove', function (e) {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        loader.style.background = `
            radial-gradient(circle at ${x}% ${y}%, rgba(231, 76, 60, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #000000 50%, #8b0000 100%)
        `;
    }
});

// Add keyboard interaction
document.addEventListener('keydown', function (e) {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('hidden')) {
        // Add random glitch effect on key press
        const terminal = loader.querySelector('.terminal-window');
        if (terminal) {
            terminal.style.animation = 'glitch1 0.1s ease-in-out';
            setTimeout(() => {
                terminal.style.animation = '';
            }, 100);
        }
    }
});