/**
 * Reader Mode Functionality
 * Handles opening and closing the PDF viewer overlay.
 */

function openReader(pdfPath) {
    const overlay = document.getElementById('reader-overlay');
    const viewer = document.getElementById('pdf-viewer');
    
    // Set the PDF source
    viewer.src = pdfPath;
    
    // Add active class for animations
    overlay.classList.add('active');
    
    // Lock scroll
    document.body.classList.add('reader-open');
    
    // Handle Escape key to close
    document.addEventListener('keydown', handleEsc);
}

function closeReader() {
    const overlay = document.getElementById('reader-overlay');
    const viewer = document.getElementById('pdf-viewer');
    
    // Remove active class
    overlay.classList.remove('active');
    
    // Unlock scroll
    document.body.classList.remove('reader-open');
    
    // Clear iframe src to stop any loading/audio
    setTimeout(() => {
        viewer.src = "";
    }, 400); // Match transition time
    
    // Remove Escape key listener
    document.removeEventListener('keydown', handleEsc);
}

function handleEsc(e) {
    if (e.key === "Escape") {
        closeReader();
    }
}

// Close on background click
document.getElementById('reader-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeReader();
    }
});
