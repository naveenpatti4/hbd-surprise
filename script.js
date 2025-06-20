// Easter egg: clicking the countdown prompts for a word, and if correct, shows the birthday surprise
document.addEventListener('DOMContentLoaded', function() {
    const countdown = document.getElementById('countdown');
    if (countdown) {
        countdown.addEventListener('click', function() {
            const answer = prompt('Enter the secret word:');
            if (!answer) return;
            const normalized = answer.toLowerCase().trim();
            if (normalized === 'iluvbooby' || normalized === 'mrssudeepthipatti') {
                startBirthdayCelebration();
            } else {
                // Show fun image for wrong password
                const funBgImage = document.getElementById('funBgImage');
                if (funBgImage) {
                    // Randomly pick one of the two images
                    const images = ['images/fun-image1.jpg', 'images/fun-image2.png', 'images/fun-image3.png','images/fun-image4.png'];
                    const chosen = images[Math.floor(Math.random() * images.length)];
                    funBgImage.style.backgroundImage = `url('${chosen}')`;
                    funBgImage.classList.remove('hidden');
                    funBgImage.classList.add('show');
                    setTimeout(() => {
                        funBgImage.classList.remove('show');
                        funBgImage.classList.add('hidden');
                    }, 10000); // Hide after 3 seconds
                }
            }
        });
    }
});
// Confetti animation variables
let canvas, ctx;
let confettiParticles = [];
let animationId;
let countdownInterval;

// Target date: July 3, 2025 at 12:00 AM (change to 5 seconds for testing: new Date(Date.now() + 5000).getTime())
const targetDate = new Date('2025-07-03T00:00:00').getTime();

// const targetDate = new Date(Date.now() + 5000).getTime();


// Birthday elements for floating animation
const birthdayElements = ['🎂', '🍰', '🎈', '🎁', '⭐', '💖', '🎉', '🎊', '🥳', '🌟', '💝', '🎀'];

// Create floating birthday elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    
    function addFloatingElement() {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random birthday emoji
        const emoji = birthdayElements[Math.floor(Math.random() * birthdayElements.length)];
        element.textContent = emoji;
        
        // Random position and timing
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 5 + 's';
        element.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        // Add size variation - making them bigger
        const size = 1.2 + Math.random() * 0.8; // Increased from 0.8 + 0.4
        element.style.fontSize = size + 'em';
        
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 25000);
    }
    
    // Create initial elements - more for better coverage
    for (let i = 0; i < 12; i++) {
        setTimeout(() => addFloatingElement(), i * 800);
    }
    
    // Continue adding elements more frequently
    setInterval(addFloatingElement, 2000);
}

// Removed createBackgroundEmojis function - now using fixed CSS positioning

// Initialize countdown and confetti system
function initCountdown() {
    // Check if we're already past the birthday
    if (checkIfPastBirthday()) {
        return; // Don't start countdown if we're past the date
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Check if the target date has been reached
    if (distance <= 0) {
        // Start the birthday celebration automatically
        startBirthdayCelebration();
        clearInterval(countdownInterval);
        return;
    }
    
    // Calculate time remaining
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update countdown display
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Check if we're past the birthday date on page load
function checkIfPastBirthday() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance <= 0) {
        // We're past the birthday! Show celebration immediately
        document.querySelector('.countdown-container').style.display = 'none';
        startBirthdayCelebration();
        return true;
    }
    return false;
}

function startBirthdayCelebration() {
    const birthdayText = document.getElementById('birthdayText');
    const countdownContainer = document.querySelector('.countdown-container');
    const birthdayBgImage = document.getElementById('birthdayBgImage');

    // Hide countdown with fade out animation (only if it's still visible)
    if (countdownContainer.style.display !== 'none') {
        countdownContainer.style.transition = 'all 1s ease-out';
        countdownContainer.style.opacity = '0';
        countdownContainer.style.transform = 'scale(0.8)';

        setTimeout(() => {
            countdownContainer.style.display = 'none';
        }, 1000);
    }

    // Show the birthday background image and message with animation
    setTimeout(() => {
        // Show background image with fade-in
        birthdayBgImage.classList.remove('hidden');
        birthdayBgImage.classList.add('show');

        // Show the birthday message with pop-in
        birthdayText.classList.remove('hidden');
        birthdayText.classList.add('show');
        birthdayText.style.fontSize = '6rem';

        // Start massive confetti celebration
        startMassiveConfettiShow();
    }, countdownContainer.style.display !== 'none' ? 1000 : 0);
}

function startMassiveConfettiShow() {
    // Create multiple confetti bursts continuously
    const createContinuousConfetti = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createLargeConfettiBurst();
            }, i * 200);
        }
    };
    
    // Start immediate celebration
    createContinuousConfetti();
    
    // Continue confetti every 2 seconds for 30 seconds
    const confettiInterval = setInterval(() => {
        createContinuousConfetti();
    }, 2000);
    
    // Stop after 30 seconds but keep some occasional bursts
    setTimeout(() => {
        clearInterval(confettiInterval);
        
        // Occasional confetti bursts
        setInterval(() => {
            if (Math.random() > 0.7) {
                createLargeConfettiBurst();
            }
        }, 5000);
    }, 30000);
}

// Initialize canvas and confetti system
function initConfetti() {
    canvas = document.getElementById('confetti-canvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas size to window size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Confetti particle class
class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = Math.random() * 3 + 2;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 15;
        this.size = Math.random() * 8 + 4;
        this.gravity = 0.1;
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8', '#f06292'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.shape = Math.random() > 0.5 ? 'rectangle' : 'circle';
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.005;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= this.decay;
        
        // Add some air resistance
        this.vx *= 0.999;
        this.vy *= 0.999;
    }
    
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        
        if (this.shape === 'rectangle') {
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
    }
    
    isDead() {
        return this.opacity <= 0 || this.y > canvas.height + 10;
    }
}

// Create large confetti burst for celebration
function createLargeConfettiBurst() {
    const burstAmount = 150; // Much more confetti for full screen effect
    
    for (let i = 0; i < burstAmount; i++) {
        const particle = new ConfettiParticle();
        
        // Create confetti from multiple points across the screen
        if (i < 50) {
            // Center burst
            particle.x = canvas.width / 2 + (Math.random() - 0.5) * 400;
            particle.y = canvas.height / 2 + (Math.random() - 0.5) * 300;
        } else if (i < 100) {
            // Left side burst
            particle.x = canvas.width * 0.2 + (Math.random() - 0.5) * 200;
            particle.y = canvas.height * 0.3 + (Math.random() - 0.5) * 400;
        } else {
            // Right side burst
            particle.x = canvas.width * 0.8 + (Math.random() - 0.5) * 200;
            particle.y = canvas.height * 0.3 + (Math.random() - 0.5) * 400;
        }
        
        particle.vx = (Math.random() - 0.5) * 25;
        particle.vy = (Math.random() - 0.5) * 25 - 10;
        particle.size = Math.random() * 12 + 6; // Bigger confetti pieces
        confettiParticles.push(particle);
    }
    
    // Start animation if not already running
    if (!animationId) {
        animateConfetti();
    }
}

// Animation loop
function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const particle = confettiParticles[i];
        particle.update();
        particle.draw();
        
        // Remove dead particles
        if (particle.isDead()) {
            confettiParticles.splice(i, 1);
        }
    }
    
    // Continue animation if there are particles
    if (confettiParticles.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    }
}

// Removed button click handler - celebration now happens automatically

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initConfetti();
    createFloatingElements();
    
    // Remove button-related event listeners since there's no button anymore
});

// Add some background sparkles animation
function createBackgroundSparkles() {
    // Removed automatic background sparkles - only show after button click
}

// Start background sparkles after a short delay
// Removed automatic sparkles - only on button click
