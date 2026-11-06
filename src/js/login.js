    const loginTab = document.getElementById("loginTab");
    const signupTab = document.getElementById("signupTab");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const formTitle = document.getElementById("formTitle");
    const formSubtitle = document.getElementById("formSubtitle");
    const formMessage = document.getElementById("formMessage");
    const userNameKey = "payamakino.demo.userName";
    const defaultUserName = "مریم رضایی";

    function showMessage(text) {
      formMessage.textContent = text;
      formMessage.classList.add("show");
    }

    function switchForm(type) {
      const isLogin = type === "login";

      loginTab.classList.toggle("active", isLogin);
      signupTab.classList.toggle("active", !isLogin);
      loginTab.setAttribute("aria-selected", String(isLogin));
      signupTab.setAttribute("aria-selected", String(!isLogin));

      loginForm.classList.toggle("active", isLogin);
      signupForm.classList.toggle("active", !isLogin);

      formTitle.textContent = isLogin ? "خوش برگشتی!" : "حساب جدید بساز";
      formSubtitle.textContent = isLogin
        ? "برای ورود، اطلاعات حساب کاربری‌ات را وارد کن."
        : "برای شروع، چند اطلاعات ساده را وارد کن.";

      formMessage.classList.remove("show");
    }

    loginTab.addEventListener("click", () => switchForm("login"));
    signupTab.addEventListener("click", () => switchForm("signup"));

    if (new URLSearchParams(window.location.search).get("mode") === "signup") {
      switchForm("signup");
    }

    // نمایش و مخفی‌کردن رمز عبور
    document.querySelectorAll(".toggle-password").forEach(button => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.target);
        const visible = input.type === "text";
        input.type = visible ? "password" : "text";
        button.textContent = visible ? "نمایش" : "مخفی";
      });
    });

    loginForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!loginForm.reportValidity()) return;
      const savedName = localStorage.getItem(userNameKey);
      localStorage.setItem(userNameKey, savedName || defaultUserName);
      window.location.assign("dashboard.html");
    });

    signupForm.addEventListener("submit", event => {
      event.preventDefault();
      if (!signupForm.reportValidity()) return;
      const name = document.getElementById("signupName").value.trim();
      if (!name) return;
      localStorage.setItem(userNameKey, name);
      window.location.assign("dashboard.html");
    });

    document.getElementById("forgotPassword").addEventListener("click", event => {
      event.preventDefault();
      showMessage("بازیابی رمز عبور باید از طریق سرویس احراز هویت سایت پیاده‌سازی شود.");
    });
