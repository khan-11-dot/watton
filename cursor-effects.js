// Custom cursor tracking effects
document.body.style.cursor = 'none';

// Create cursor elements if they don't exist
if (!document.querySelector('.cursor')) {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
}

if (!document.querySelector('.cursor-dot')) {
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
}

// Create glow effect element
if (!document.querySelector('.cursor-glow')) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);
}

// Get cursor elements
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

// Track cursor movement
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Click animation
document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursorDot.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorDot.style.transform = 'scale(1)';
});

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('button, input, select, textarea, a');
interactiveElements.forEach(el => {
    el.addEventListener('mouseover', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = 'var(--neon-secondary)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 255, 238, 0.4) 0%, rgba(0, 255, 157, 0.2) 50%, transparent 70%)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'var(--neon-primary)';
        cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 255, 157, 0.3) 0%, rgba(0, 255, 238, 0.1) 50%, transparent 70%)';
    });
});

// Cursor trail effect
const cursors = [];
const maxCursors = 15; // Increased number of trail dots

function createCursor(x, y) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    cursor.style.opacity = '0.8';
    document.body.appendChild(cursor);
    return cursor;
}

document.addEventListener('mousemove', function(e) {
    const cursor = createCursor(e.clientX, e.clientY);
    cursors.push(cursor);

    if (cursors.length > maxCursors) {
        const oldCursor = cursors.shift();
        oldCursor.style.opacity = '0';
        setTimeout(() => {
            oldCursor.remove();
        }, 500);
    }

    setTimeout(() => {
        const index = cursors.indexOf(cursor);
        if (index > -1) {
            cursors.splice(index, 1);
            cursor.style.opacity = '0';
            setTimeout(() => {
                cursor.remove();
            }, 500);
        }
    }, 500);
});
