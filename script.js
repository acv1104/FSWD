document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginBtn = document.getElementById('loginBtn');
    const signupLink = document.getElementById('signupLink');

    // Initialize Google Sign-In
    window.onload = function() {
        google.accounts.id.initialize({
            client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        
        google.accounts.id.renderButton(
            document.getElementById("g_id_signin"),
            { theme: "outline", size: "large", width: 350 }  // customization attributes
        );
        
        google.accounts.id.prompt(); // also display the One Tap dialog
    };

    // Handle Google Sign-In response
    function handleCredentialResponse(response) {
        console.log("Google Sign-In response:", response);
        
        // Verify the credential on your backend
        fetch('/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credential: response.credential })
        })
        .then(res => res.json())
        .then(data => {
            console.log("Google authentication successful:", data);
            
            // Store the user token (in a real app, you might use cookies or localStorage)
            localStorage.setItem('authToken', data.token);
            
            // Redirect to dashboard
            window.location.href = '/dashboard.html';
        })
        .catch(error => {
            console.error("Google authentication failed:", error);
            alert("Google Sign-In failed. Please try again.");
        });
    }

    // Validate form on submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        
        let isValid = true;
        
        // Validate email
        if (!emailInput.value) {
            emailError.style.display = 'block';
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validate password
        if (!passwordInput.value) {
            passwordError.style.display = 'block';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters';
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            // Simulate login process
            loginBtn.disabled = true;
            loginBtn.textContent = 'Signing in...';
            
            // In a real app, you would send this data to your server
            setTimeout(() => {
                const rememberMe = document.getElementById('remember').checked;
                console.log('Login successful:', { 
                    email: emailInput.value, 
                    rememberMe 
                });
                
                // Store login state (in a real app, you would get a token from your server)
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                // Redirect to dashboard or home page
                alert('Login successful! Redirecting to dashboard...');
                // window.location.href = '/dashboard.html';
                
                loginBtn.disabled = false;
                loginBtn.textContent = 'Sign in';
            }, 1500);
        }
    });
    
    // Sign up link functionality
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Redirecting to sign up page');
        
        // In a real app, you would redirect to the signup page
        alert('Redirecting to sign up page...');
        // window.location.href = '/signup.html';
    });
    
    // Real-time validation
    emailInput.addEventListener('input', function() {
        if (validateEmail(emailInput.value)) {
            emailError.style.display = 'none';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.length >= 6) {
            passwordError.style.display = 'none';
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
google.accounts.id.initialize({
    client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
    callback: handleCredentialResponse
});
function handleCredentialResponse(response) {
    // Send the credential to your backend for verification
    fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
    })
    .then(res => res.json())
    .then(data => {
        // Handle successful authentication
        localStorage.setItem('authToken', data.token);
        window.location.href = '/dashboard.html';
    })
    .catch(error => {
        console.error("Google authentication failed:", error);
        alert("Google Sign-In failed. Please try again.");
    });
}