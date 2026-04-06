const supabaseUrl = 'https://smprmketrxdhiegmmiec.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcHJta2V0cnhkaGllZ21taWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NDY2MDksImV4cCI6MjA5MTAyMjYwOX0.emA8CYOc33SjievM4WPGliwHgGAHDekBtbzWzZxlEbs';

const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

const authTabs = document.querySelectorAll(".auth-tab, .inline-switch");
const authViews = document.querySelectorAll(".auth-view");
const authFeedback = document.querySelector(".auth-feedback");
const verifyEmailTarget = document.querySelector(".verify-email-target");
const signInForm = document.querySelector('[data-auth-view="signin"]');
const signUpForm = document.querySelector('[data-auth-view="signup"]');
const verifyForm = document.querySelector('[data-auth-view="verify"]');

console.log('Page loaded');
console.log('Supabase loaded:', typeof supabase !== 'undefined');
console.log('Auth tabs:', authTabs.length);
console.log('Auth views:', authViews.length);
console.log('Sign in form:', !!signInForm);
console.log('Sign up form:', !!signUpForm);

function setAuthView(viewName) {
  console.log('Switching to view:', viewName);
  authViews.forEach((view) => {
    view.classList.toggle("active", view.dataset.authView === viewName);
  });

  document.querySelectorAll(".auth-tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.authTarget === viewName);
  });
}

authTabs.forEach((control) => {
  control.addEventListener("click", () => {
    const target = control.dataset.authTarget;
    if (target) {
      setAuthView(target);
      if (authFeedback) {
        authFeedback.textContent = "";
      }
    }
  });
});

function showFeedback(message, isError = false) {
  console.log(isError ? 'Error: ' + message : 'Info: ' + message);
  if (authFeedback) {
    authFeedback.textContent = message;
    authFeedback.style.color = isError ? '#ef4444' : '#22c55e';
  }
}

if (signInForm) {
  signInForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = signInForm.querySelector('input[name="email"]').value;
    const password = signInForm.querySelector('input[name="password"]').value;

    showFeedback("Signing in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showFeedback(error.message, true);
    } else {
      showFeedback("Sign-in successful. Redirecting to dashboard...");
      window.setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 700);
    }
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = signUpForm.querySelector('input[name="name"]').value;
    const email = signUpForm.querySelector('input[name="email"]').value;
    const password = signUpForm.querySelector('input[name="password"]').value;

    showFeedback("Creating account...", false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          }
        }
      });

      console.log('Signup response:', data);
      console.log('Signup error:', error);

      if (error) {
        showFeedback(error.message, true);
      } else if (data.user && !data.session) {
        showFeedback("Account created! Please check your email to verify, then sign in.", false);
      } else if (data.session) {
        showFeedback("Account created! Redirecting to dashboard...", false);
        window.setTimeout(() => {
          window.location.href = "./dashboard.html";
        }, 1000);
      }
    } catch (err) {
      console.error('Signup exception:', err);
      showFeedback("Error: " + err.message, true);
    }
  });
}

if (verifyForm) {
  verifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = verifyForm.querySelector('input[name="email"]')?.value || verifyEmailTarget?.textContent;
    const code = verifyForm.querySelector('input[name="code"]').value;

    showFeedback("Verifying...");

    const { data, error } = await supabase.auth.verifyOtp({
      email,
      code,
      type: 'email'
    });

    if (error) {
      showFeedback(error.message, true);
    } else {
      showFeedback("Email verified. Redirecting to dashboard...");
      window.setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 700);
    }
  });
}

const demoForm = document.querySelector(".demo-form");
const demoFeedback = document.querySelector(".demo-feedback");

if (demoForm) {
  demoForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = demoForm.querySelector('input[name="email"]').value;
    const company = demoForm.querySelector('input[name="company"]').value || '';
    const name = demoForm.querySelector('input[name="name"]').value;
    const role = demoForm.querySelector('input[name="role"]').value || '';
    const message = demoForm.querySelector('textarea[name="message"]').value || '';

    if (demoFeedback) {
      demoFeedback.textContent = "Submitting your request...";
      demoFeedback.style.color = '';
    }

    const { data, error } = await supabase
      .from('demo_requests')
      .insert({
        email,
        company,
        name,
        role,
        message
      });

    if (error) {
      if (demoFeedback) {
        demoFeedback.textContent = "Error: " + error.message;
        demoFeedback.style.color = '#ef4444';
      }
    } else {
      if (demoFeedback) {
        demoFeedback.textContent = "Demo request submitted. Our team will contact you shortly.";
        demoFeedback.style.color = '#22c55e';
      }
      demoForm.reset();
    }
  });
}

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  const path = window.location.pathname;
  
  if (!session && path.includes('dashboard.html')) {
    window.location.href = './login.html';
  }
  
  if (session && path.includes('login.html')) {
    window.location.href = './dashboard.html';
  }
}

const signOutLink = document.querySelector('.sidebar-footer .nav-item');
if (signOutLink) {
  signOutLink.addEventListener("click", async (event) => {
    event.preventDefault();
    await supabase.auth.signOut();
    window.location.href = './login.html';
  });
}

checkAuth();