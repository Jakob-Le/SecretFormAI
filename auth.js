//profile icon replacement after login
function updateProfileIcon() {
  const profileBtn = document.getElementById("profile-btn");
  if (!profileBtn) return;

  if (localStorage.getItem("loggedIn") === "true") {
    profileBtn.innerHTML = `<img src="images/prof.png" alt="Profile" style="width:40px; height:40px; border-radius:50%;">`;

    profileBtn.onclick = function() {
      if (confirm("Log out?")) {
        localStorage.clear();
        location.reload();
      }
    }
  } else {
    profileBtn.textContent = "Login";
    profileBtn.onclick = () => {
      const modal = document.getElementById("auth-modal");
      if (modal) modal.classList.remove("hidden");
    };
  }
}

//(signup/login)
function setupAuthForm() {
  const authForm = document.getElementById("auth-form");
  if (!authForm) return;
    let isSignup = false;
  authForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value || '';
    const username = document.getElementById("username").value;

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("name", name);

    updateProfileIcon();

    const modal = document.getElementById("auth-modal");
    if (modal) modal.classList.add("hidden");
  });
  const closeBtn = document.querySelector(".close-button");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("auth-modal").classList.add("hidden");
    });
  }
  const switchToSignup = document.getElementById("switch-to-signup");
  const modalTitle = document.getElementById("modal-title");
  const nameField = document.getElementById("name-field");
  const authSubmit = document.getElementById("auth-submit");

  if (switchToSignup) {
    switchToSignup.addEventListener("click", (e) => {
      e.preventDefault();
      isSignup = !isSignup;

      modalTitle.textContent = isSignup ? "Sign Up" : "Login";
      authSubmit.textContent = isSignup ? "Sign Up" : "Login";
      nameField.classList.toggle("hidden", !isSignup);
      switchToSignup.textContent = isSignup ? "Back to Login" : "Sign up";
    });
  }
}

//runs on page load
document.addEventListener("DOMContentLoaded", function () {
  updateProfileIcon();
});
