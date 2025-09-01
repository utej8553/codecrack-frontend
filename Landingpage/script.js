const codeExamples = {
    java: {
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World");
        // Welcome to coding!
    }
}`,
        class: 'code-java'
    },
    python: {
        code: `def main():
    print("Hello World")
    # Welcome to coding!

if __name__ == "__main__":
    main()`,
        class: 'code-python'
    },
    cpp: {
        code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    // Welcome to coding!
    return 0;
}`,
        class: 'code-cpp'
    }
};


// DOM elements
const codeContent = document.getElementById('code-content');
const tabs = document.querySelectorAll('.tab');
const currentYearSpan = document.getElementById('current-year');

let currentTab = 'java';
let autoSwitchInterval;

// Initialize the app
function init() {
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Setup tab click handlers
    setupTabHandlers();
    
    // Start auto-switching code examples
    startAutoSwitch();
    
    // Setup smooth scrolling for anchor links
    setupSmoothScrolling();
    
    // Setup intersection observer for animations
    setupAnimationObserver();
}

// Handle tab switching
function setupTabHandlers() {
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            switchTab(tabName);
            
            // Reset auto-switch interval
            clearInterval(autoSwitchInterval);
            setTimeout(startAutoSwitch, 5000); // Resume after 5 seconds
        });
    });
}

// Switch to a specific tab
function switchTab(tabName) {
    // Update active tab
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        }
    });
    
    // Update code content
    const example = codeExamples[tabName];
    codeContent.innerHTML = `<code>${example.code}</code>`;
    codeContent.className = example.class;
    
    currentTab = tabName;
    
    // Add animation
    codeContent.style.opacity = '0';
    setTimeout(() => {
        codeContent.style.opacity = '1';
    }, 100);
}

// Auto-switch between tabs
function startAutoSwitch() {
    const tabOrder = ['java', 'python', 'cpp'];
    let currentIndex = tabOrder.indexOf(currentTab);
    
    autoSwitchInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % tabOrder.length;
        switchTab(tabOrder[currentIndex]);
    }, 3000); // Switch every 3 seconds
}

// Setup smooth scrolling for internal links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup intersection observer for scroll animations
function setupAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe feature cards for staggered animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Observe other sections
    const sections = document.querySelectorAll('.cta, .footer');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Handle button clicks
function handleButtonClick(buttonText) {
    // Simple click handling - in a real app, these would navigate or perform actions
    console.log(`Button clicked: ${buttonText}`);
    
    // Show a simple feedback (you could replace this with a toast notification)
    const button = event.target.closest('.btn');
    const originalText = button.innerHTML;
    
    button.innerHTML = '✓ Clicked!';
    button.style.backgroundColor = '#10b981';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.backgroundColor = '';
    }, 2000);
}

// Add click handlers to buttons
function setupButtonHandlers() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonText = button.textContent.trim();
            handleButtonClick(buttonText);
        });
    });
}

// Parallax effect for hero section
function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
}

// Add typing animation to hero title
function addTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// Enhanced initialization with all features
function enhancedInit() {
    init();
    setupButtonHandlers();
    
    // Optional: Enable these for enhanced effects
    // setupParallax();
    // addTypingAnimation();
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhancedInit);
} else {
    enhancedInit();
}

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any dynamic layouts if needed
    console.log('Window resized');
});

// Handle page visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearInterval(autoSwitchInterval);
    } else {
        startAutoSwitch();
    }
});

// Export functions for potential external use
window.CodePlatform = {
    switchTab,
    handleButtonClick,
    init: enhancedInit
};