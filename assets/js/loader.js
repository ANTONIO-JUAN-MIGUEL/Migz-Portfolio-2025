/* filepath: c:\Users\Migz Antonio\Desktop\portfolio\Migz-Portfolio-2025\assets\js\loader.js */
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
        setTimeout(hideLoader, 2000); // Show loader for 2 seconds
    });

    // Fallback: Hide loader after 4 seconds maximum
    setTimeout(hideLoader, 4000);
});

// Create falling matrix characters
function createMatrixChars() {
    const matrixContainer = document.getElementById('matrixChars');
    if (!matrixContainer) return;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>{}[]()#$%^&*';
    const numChars = window.innerWidth < 768 ? 25 : 50; // Fewer on mobile

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
                if (matrixContainer) {
                    matrixContainer.appendChild(newChar);
                }
            }
        }, (Math.random() * 5000 + 3000));
    }
}

// Simulate loading progress
function simulateLoading() {
    const percentageElement = document.getElementById('percentage');
    if (!percentageElement) return;

    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;

        percentageElement.textContent = Math.round(progress) + '%';

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
}

// Hide loader
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('hidden');
        // Remove loader from DOM after animation
        setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
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