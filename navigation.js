// Function to toggle location lists
function toggleList(listId) {
    const allLists = document.querySelectorAll('.location-list');
    allLists.forEach(list => {
        if (list.id !== listId) {
            list.style.display = 'none';
        }
    });
    
    const targetList = document.getElementById(listId);
    if (targetList) {
        targetList.style.display = targetList.style.display === 'block' ? 'none' : 'block';
    }
}

// Add click event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const warehousesLink = document.querySelector('a[onclick*="warehousesList"]');
    const centersLink = document.querySelector('a[onclick*="centersList"]');
    
    if (warehousesLink) {
        warehousesLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleList('warehousesList');
        });
    }
    
    if (centersLink) {
        centersLink.addEventListener('click', function(e) {
            e.preventDefault();
            toggleList('centersList');
        });
    }

    // Close lists when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.location-list') && 
            !event.target.closest('a[onclick*="warehousesList"]') && 
            !event.target.closest('a[onclick*="centersList"]')) {
            document.querySelectorAll('.location-list').forEach(list => {
                list.style.display = 'none';
            });
        }
    });
});
