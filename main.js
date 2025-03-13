// Function to toggle location lists
function toggleList(listId) {
    // Close all lists first
    document.querySelectorAll('.location-list').forEach(list => {
        if (list.id !== listId) {
            list.style.display = 'none';
        }
    });
    
    // Toggle the clicked list
    const list = document.getElementById(listId);
    list.style.display = list.style.display === 'block' ? 'none' : 'block';
}

// Initialize Bootstrap components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdowns
    var dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(function(dropdownToggle) {
        new bootstrap.Dropdown(dropdownToggle);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.backgroundColor = '#1a2634';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.backgroundColor = '#2c3e50';
        }
    });

    // Handle location lists
    // Close lists when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.location-list') && !event.target.closest('.nav-link')) {
            document.querySelectorAll('.location-list').forEach(list => {
                list.style.display = 'none';
            });
        }
    });

    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Handle dropdown menus
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');
    
    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const dropdownContent = this.nextElementSibling;
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content !== dropdownContent) {
                    content.classList.remove('show');
                }
            });
            
            // Toggle current dropdown
            dropdownContent.classList.toggle('show');
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-trigger')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.classList.remove('show');
            });
        }
    });

    const warehousesLink = document.getElementById('warehousesLink');
    const centersLink = document.getElementById('centersLink');
    const warehousesList = document.getElementById('warehousesList');
    const centersList = document.getElementById('centersList');

    // Hide lists initially
    if (warehousesList) warehousesList.style.display = 'none';
    if (centersList) centersList.style.display = 'none';

    // Toggle warehouses list
    if (warehousesLink) {
        warehousesLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (centersList) centersList.style.display = 'none';
            if (warehousesList) {
                warehousesList.style.display = warehousesList.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Toggle centers list
    if (centersLink) {
        centersLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (warehousesList) warehousesList.style.display = 'none';
            if (centersList) {
                centersList.style.display = centersList.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Close lists when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.location-list') && 
            !event.target.matches('#warehousesLink') && 
            !event.target.matches('#centersLink')) {
            if (warehousesList) warehousesList.style.display = 'none';
            if (centersList) centersList.style.display = 'none';
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Form validation for contact form
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will contact you soon!');
            this.reset();
        }
    });
}

// Dynamic counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Initialize counters when they come into view
const counterElements = document.querySelectorAll('.counter');
if (counterElements.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });
}
