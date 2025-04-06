document.addEventListener('DOMContentLoaded', function() {
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const heroGetStarted = document.getElementById('hero-get-started');
    const ctaGetStarted = document.getElementById('cta-get-started');
    const toggleAuth = document.getElementById('toggle-auth');
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authButtonText = document.getElementById('auth-button-text');
    const nameField = document.getElementById('name-field');
    const logoutBtn = document.getElementById('logout-btn');
    const adminLogoutBtn = document.getElementById('admin-logout-btn');
    const themeToggle = document.getElementById('theme-toggle');

    const landingPage = document.getElementById('landing-page');
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const adminSection = document.getElementById('admin-section');

    const userMenu = document.getElementById('user-menu');
    const mainNav = document.getElementById('main-nav');

    // Theme switcher functionality
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const currentTheme = localStorage.getItem('theme') || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Apply the theme
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
        }
        
        // Toggle theme when switch is clicked
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    if (loginBtn) loginBtn.addEventListener('click', showLogin);
    if (signupBtn) signupBtn.addEventListener('click', showSignup);
    if (heroGetStarted) heroGetStarted.addEventListener('click', showSignup);
    if (ctaGetStarted) ctaGetStarted.addEventListener('click', showSignup);
    if (toggleAuth) toggleAuth.addEventListener('click', toggleAuthMode);
    if (authForm) authForm.addEventListener('submit', handleAuth);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (adminLogoutBtn) adminLogoutBtn.addEventListener('click', handleLogout);

    function showLogin() {
        landingPage.style.display = 'none';
        authSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        adminSection.style.display = 'none';
        
        authTitle.textContent = 'Sign in to your account';
        authSubtitle.innerHTML = 'Or <a href="#" id="toggle-auth" class="font-medium text-indigo-600 hover:text-indigo-500">create a new account</a>';
        authButtonText.textContent = 'Sign in';
        nameField.style.display = 'none';
        
        document.getElementById('toggle-auth').addEventListener('click', toggleAuthMode);
    }

    function showSignup() {
        landingPage.style.display = 'none';
        authSection.style.display = 'block';
        dashboardSection.style.display = 'none';
        adminSection.style.display = 'none';
        
        authTitle.textContent = 'Create your account';
        authSubtitle.innerHTML = 'Or <a href="#" id="toggle-auth" class="font-medium text-indigo-600 hover:text-indigo-500">sign in to your existing account</a>';
        authButtonText.textContent = 'Sign up';
        nameField.style.display = 'block';
        
        document.getElementById('toggle-auth').addEventListener('click', toggleAuthMode);
    }

    function toggleAuthMode(e) {
        e.preventDefault();
        if (authTitle.textContent.includes('Sign in')) {
            showSignup();
        } else {
            showLogin();
        }
    }

    function handleAuth(e) {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        
        if (!email) {
            alert('Please enter an email address');
            return;
        }
        
        if (email.includes('admin')) {
            showAdminDashboard();
        } else {
            showUserDashboard();
        }
    }

    function showUserDashboard() {
        landingPage.style.display = 'none';
        authSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        adminSection.style.display = 'none';
        initializeUserCharts();
    }

    function showAdminDashboard() {
        landingPage.style.display = 'none';
        authSection.style.display = 'none';
        dashboardSection.style.display = 'none';
        adminSection.style.display = 'block';
        initializeAdminCharts();
    }

    function handleLogout() {
        landingPage.style.display = 'block';
        authSection.style.display = 'none';
        dashboardSection.style.display = 'none';
        adminSection.style.display = 'none';
        if (authForm) authForm.reset();
        if (mainNav) mainNav.querySelector('.md\\:flex').style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
    }
    function initializeUserCharts() {
        const activityCtx = document.getElementById('activityChart');
        if (activityCtx) {
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
        if (participationCtx) {
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
    }

    function initializeAdminCharts() {
        const revenueCtx = document.getElementById('revenueChart');
        if (revenueCtx) {
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
                                    return '$' + value;
                                }
                            }
                        }
                    }
                }
            });
        }
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

    const featuresLink = document.querySelector('a[href="./index.html#features"]');

    if (featuresLink) {
        featuresLink.addEventListener('click', function(event) {
            event.preventDefault();
            if (window.location.pathname.includes('index.html')) {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                window.location.href = './index.html#features';
            }
        });
    }
});
