document.addEventListener('DOMContentLoaded', function() {
    // Hamburger button animation
    const menuButton = document.getElementById('menuButton');
    
    // Add a subtle animation when clicking the hamburger button
    menuButton.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    // Form submission handler
    const helpForm = document.getElementById('helpForm');
    helpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        
        // Get form field values
        const name = document.getElementById('name').value;
        const contactInfo = document.getElementById('contactInfo').value;
        const issue = document.getElementById('issue').value;
        
        // Show confirmation message to user
        alert(`Thank you ${name}! Your request has been submitted. We'll contact you shortly.`);
        
        // Reset the form fields to blank
        helpForm.reset();
        
        // In a real implementation, you would send this data to a server with code like:
        /*
        fetch('https://your-api-endpoint.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                contactInfo: contactInfo,
                issue: issue,
                timestamp: new Date().toISOString()
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    });
    
    // Set the exact date/time and user values provided
    document.getElementById('currentDateTime').textContent = 'Current Date and Time (UTC - YYYY-MM-DD HH:MM:SS formatted): 2025-04-30 01:27:43';
    document.getElementById('currentUser').textContent = 'Current User\'s Login: notTehwhat';
});