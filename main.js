let auth = null;
let isFirebaseLoaded = false;

function handleSuccessfulSignIn(user) {
    console.log("User signed in successfully:", user);
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    
    const dashboardUserMenu = document.getElementById('dashboard-user-menu');
    if (dashboardUserMenu) {
        const userInitials = document.querySelector('#dashboard-user-menu .w-8');
        const userName = document.querySelector('#dashboard-user-menu span');
        if (user.displayName) {
            const nameParts = user.displayName.split(' ');
            const initials = nameParts.map(part => part[0]).join('').toUpperCase();
            if (userInitials) userInitials.textContent = initials;
            if (userName) userName.textContent = user.displayName;
        } else if (userInitials && userName) {
            userInitials.textContent = user.email.charAt(0).toUpperCase();
            userName.textContent = user.email;
        }
    }
    
    if (window.initializeUserCharts) {
        window.initializeUserCharts();
    }
    
    localStorage.setItem('userLoggedIn', 'true');
}

function handleSignUp(email, password, name) {
    if (!auth) {
        console.error("Auth is not initialized");
        alert("Authentication service is not available. Please try again later.");
        return;
    }
    
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            return user.updateProfile({ displayName: name });
        })
        .then(() => {
            alert("Sign-up successful! You are now logged in.");
            const user = firebase.auth().currentUser;
            handleSuccessfulSignIn(user);
        })
        .catch((error) => {
            console.error("Error during sign-up:", error);
            alert("Sign-up failed: " + error.message);
        });
}

function handleLogin(email, password) {
    if (!auth) {
        console.error("Auth is not initialized");
        alert("Authentication service is not available. Please try again later.");
        return;
    }
    
    const authButton = document.querySelector('#auth-form button[type="submit"]');
    if (authButton) {
        authButton.disabled = true;
        authButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Signing in...';
    }
    
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return auth.signInWithEmailAndPassword(email, password);
        })
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login successful for user:", user.email);
            
            user.getIdToken(true).then(function(token) {
                console.log("ID token refreshed successfully");
            });
            
            handleSuccessfulSignIn(user);
        })
        .catch((error) => {
            console.error("Error during login:", error);
            alert("Login failed: " + error.message);
            
            if (authButton) {
                authButton.disabled = false;
                authButton.innerHTML = '<span id="auth-button-text">Sign in</span>';
            }
        });
}

function showLogin() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';
    
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authButtonText = document.getElementById('auth-button-text');
    const nameField = document.getElementById('name-field');
    
    authTitle.textContent = 'Sign in to your account';
    authSubtitle.innerHTML = 'Or <a href="#" id="toggle-auth" class="font-medium text-indigo-600 hover:text-indigo-500">create a new account</a>';
    authButtonText.textContent = 'Sign in';
    nameField.style.display = 'none';
    
    const newToggleAuth = document.getElementById('toggle-auth');
    if (newToggleAuth) {
        newToggleAuth.addEventListener('click', toggleAuthMode);
    }
}

function showSignup() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';
    
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authButtonText = document.getElementById('auth-button-text');
    const nameField = document.getElementById('name-field');
    
    authTitle.textContent = 'Create your account';
    authSubtitle.innerHTML = 'Or <a href="#" id="toggle-auth" class="font-medium text-indigo-600 hover:text-indigo-500">sign in to your existing account</a>';
    authButtonText.textContent = 'Sign up';
    nameField.style.display = 'block';
    
    const newToggleAuth = document.getElementById('toggle-auth');
    if (newToggleAuth) {
        newToggleAuth.addEventListener('click', toggleAuthMode);
    }
}

function toggleAuthMode(e) {
    e.preventDefault();
    const authTitle = document.getElementById('auth-title');
    if (authTitle.textContent.includes('Sign in')) {
        showSignup();
    } else {
        showLogin();
    }
}

function showUserDashboard() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
    initializeUserCharts();
}

function showAdminDashboard() {
    document.getElementById('landing-page').style.display = 'none';
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'block';
    initializeAdminCharts();
}

function handleLogout() {
    if (isFirebaseLoaded && auth) {
        auth.signOut()
            .then(() => {
                resetUIAfterLogout();
            })
            .catch((error) => {
                console.error("Error signing out:", error);
                resetUIAfterLogout(); 
            });
    } else {
        resetUIAfterLogout(); 
    }
}

function resetUIAfterLogout() {
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('admin-section').style.display = 'none';
    
    const authForm = document.getElementById('auth-form');
    const mainNav = document.getElementById('main-nav');
    const userMenu = document.getElementById('user-menu');
    
    if (authForm) authForm.reset();
    if (mainNav) {
        const navMenu = mainNav.querySelector('.md\\:flex');
        if (navMenu) navMenu.style.display = 'flex';
    }
    if (userMenu) userMenu.style.display = 'none';
    
    localStorage.removeItem('userLoggedIn');
}

function initializeUserCharts() {
    try {
        if (window.Chart && Chart.instances) {
            Chart.instances.forEach(instance => {
                if (instance.canvas.id === 'activityChart' || instance.canvas.id === 'participationChart') {
                    instance.destroy();
                }
            });
        }

        const activityCtx = document.getElementById('activityChart');
        if (activityCtx && window.Chart) {
            new Chart(activityCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Votes Cast',
                        data: [65, 59, 80, 81, 56, 40, 30],
                        borderColor: '#4F46E5',
                        backgroundColor: 'rgba(79, 70, 229, 0.1)',
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
        
        const participationCtx = document.getElementById('participationChart');
        if (participationCtx && window.Chart) {
            new Chart(participationCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Marketing', 'Engineering', 'Finance', 'HR', 'Operations'],
                    datasets: [{
                        data: [85, 67, 91, 76, 56],
                        backgroundColor: [
                            '#4F46E5',
                            '#7C3AED',
                            '#2563EB',
                            '#06B6D4',
                            '#10B981'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    },
                    cutout: '70%'
                }
            });
        }
    } catch (error) {
        console.error("Error initializing user charts:", error);
    }
}

function initializeAdminCharts() {
    try {
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx && window.Chart) {
            new Chart(revenueCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    datasets: [{
                        label: 'Revenue',
                        data: [6500, 5900, 8000, 8100, 9600, 8800, 9000, 9200, 9350, 12540],
                        backgroundColor: '#4F46E5'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return '$'$ + value;
                                }
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error("Error initializing admin charts:", error);
    }
}

window.initializeUserCharts = initializeUserCharts;
window.initializeAdminCharts = initializeAdminCharts;
window.showUserDashboard = showUserDashboard;
window.showAdminDashboard = showAdminDashboard;
window.resetUIAfterLogout = resetUIAfterLogout;

function monitorAuthState() {
    if (!auth) {
        console.error("Auth is not initialized");
        return;
    }
    
    auth.onAuthStateChanged((user) => {
        if (user) {
            handleSuccessfulSignIn(user);
        } else {
            resetUIAfterLogout();
        }
    });
}

window.handleGoogleSignIn = function() {
    if (typeof firebase === 'undefined' || !auth) {
        alert("Authentication service is not available. Please try again later.");
        return;
    }

    try {
        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('profile');
        provider.addScope('email');
        
        provider.setCustomParameters({
            'prompt': 'select_account'
        });

        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                
                if (isLocalhost) {
                    return auth.signInWithRedirect(provider);
                } else {
                    return auth.signInWithPopup(provider)
                        .then((result) => {
                            const user = result.user;
                            handleSuccessfulSignIn(user);
                        });
                }
            })
            .catch((error) => {
                console.error("Error during Google sign-in:", error);
                if (error.code !== 'auth/popup-closed-by-user') {
                    alert("Authentication failed: " + error.message);
                }
            });
    } catch (error) {
        console.error("Exception during Google Sign-In setup:", error);
        alert("Authentication service failed to initialize. Please try again later.");
    }
};

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-sun"></i>';
            btn.setAttribute('title', 'Switch to light mode');
        });
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        const themeToggles = document.querySelectorAll('.theme-toggle');
        themeToggles.forEach(btn => {
            btn.innerHTML = '<i class="fas fa-moon"></i>';
            btn.setAttribute('title', 'Switch to dark mode');
        });
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDarkScheme.matches) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
    
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const isUserLoggedInFromStorage = localStorage.getItem('userLoggedIn') === 'true';
    
    isFirebaseLoaded = typeof firebase !== 'undefined';
    
    if (isFirebaseLoaded) {
        try {
            auth = firebase.auth();
            
            auth.getRedirectResult()
                .then((result) => {
                    if (result.user) {
                        handleSuccessfulSignIn(result.user);
                    } else {
                        checkCurrentUser();
                    }
                })
                .catch((error) => {
                    console.error("Error getting redirect result:", error);
                    if (error.code !== 'auth/credential-already-in-use') {
                        alert("Authentication failed: " + error.message);
                    }
                    checkCurrentUser();
                });
            
            monitorAuthState();
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    } else {
        if (isUserLoggedInFromStorage) {
            document.getElementById('landing-page').style.display = 'none';
            document.getElementById('auth-section').style.display = 'none';
        }
        
        document.addEventListener('firebase-ready', function() {
            if (typeof firebase !== 'undefined') {
                try {
                    isFirebaseLoaded = true;
                    auth = firebase.auth();
                    monitorAuthState();
                    checkCurrentUser();
                } catch (error) {
                    console.error("Firebase initialization error after ready event:", error);
                }
            }
        });
    }
    
    attachUIEventListeners();
    
    initializeTheme();
});

function checkCurrentUser() {
    if (!auth) {
        console.error("Auth is not initialized yet");
        return;
    }
    
    const currentUser = auth.currentUser;
    if (currentUser) {
        handleSuccessfulSignIn(currentUser);
    } else {
        if (localStorage.getItem('userLoggedIn') === 'true') {
            localStorage.removeItem('userLoggedIn');
        }
    }
}

function attachUIEventListeners() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const heroGetStarted = document.getElementById('hero-get-started');
    const ctaGetStarted = document.getElementById('cta-get-started');
    const logoutBtn = document.getElementById('logout-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    
    const authForm = document.getElementById('auth-form');
    const toggleAuth = document.getElementById('toggle-auth');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showLogin();
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showSignup();
        });
    }
    
    if (heroGetStarted) {
        heroGetStarted.addEventListener('click', function(e) {
            e.preventDefault();
            if (isFirebaseLoaded) {
                window.handleGoogleSignIn();
            } else {
                alert("Authentication service is not available. Please try again later.");
                showSignup();
            }
        });
    }
    
    if (ctaGetStarted) {
        ctaGetStarted.addEventListener('click', function(e) {
            e.preventDefault();
            if (isFirebaseLoaded) {
                window.handleGoogleSignIn();
            } else {
                alert("Authentication service is not available. Please try again later.");
                showSignup();
            }
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleLogout();
        });
    }
    
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email-address').value;
            const password = document.getElementById('password').value;
            const authButtonText = document.getElementById('auth-button-text');
            const nameField = document.getElementById('name-field');
            
            if (!email || !password) {
                alert('Please enter both email and password');
                return;
            }
            
            if (authButtonText.textContent.includes('Sign in')) {
                handleLogin(email, password);
            } else {
                const name = document.getElementById('name').value;
                if (!name) {
                    alert('Please enter your name');
                    return;
                }
                handleSignUp(email, password, name);
            }
        });
    }
    
    if (toggleAuth) {
        toggleAuth.addEventListener('click', toggleAuthMode);
    }
    
    const googleButtons = document.querySelectorAll('.w-full.inline-flex.justify-center');
    if (googleButtons) {
        googleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                if (isFirebaseLoaded) {
                    window.handleGoogleSignIn();
                } else {
                    alert("Authentication service is not available. Please try again later.");
                }
            });
        });
    }
    
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    if (themeToggles.length > 0) {
        themeToggles.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const isDark = document.body.classList.contains('dark-theme');
                setTheme(isDark ? 'light' : 'dark');
            });
        });
    }
    
    const monthlyPricing = document.getElementById('monthly-pricing');
    const annualPricing = document.getElementById('annual-pricing');

    if (monthlyPricing && annualPricing) {
        monthlyPricing.addEventListener('click', function() {
            monthlyPricing.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
            monthlyPricing.classList.remove('text-gray-600');
            annualPricing.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
            annualPricing.classList.add('text-gray-600');
        });

        annualPricing.addEventListener('click', function() {
            annualPricing.classList.add('bg-white', 'shadow-sm', 'text-gray-800');
            annualPricing.classList.remove('text-gray-600');
            monthlyPricing.classList.remove('bg-white', 'shadow-sm', 'text-gray-800');
            monthlyPricing.classList.add('text-gray-600');
        });
    }
}
