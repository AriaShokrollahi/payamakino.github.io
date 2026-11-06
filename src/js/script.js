    const userNameKey = "payamakino.demo.userName";

    function updateAccountLink() {
      const userName = localStorage.getItem(userNameKey);
      if (!userName) return;

      const navActions = document.querySelector(".nav-actions");
      const dashboardLink = document.createElement("a");
      dashboardLink.className = "btn btn-primary btn-small";
      dashboardLink.href = "dashboard.html";
      dashboardLink.textContent = userName;
      navActions.replaceChildren(dashboardLink);
    }

    updateAccountLink();
    window.addEventListener("pageshow", updateAccountLink);

    // منوی موبایل
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // دمو نمایشی تولید متن هوش مصنوعی
    const generateButton = document.getElementById("generateText");
    const aiPrompt = document.getElementById("aiPrompt");
    const aiResult = document.getElementById("aiResult");
    const charCount = document.getElementById("charCount");
    const partCount = document.getElementById("partCount");

    generateButton.addEventListener("click", () => {
      const prompt = aiPrompt.value.trim();
      if (!prompt) {
        aiPrompt.focus();
        return;
      }

      // متن نمونه است؛ برای تولید واقعی باید به API سمت سرور متصل شود.
      const message = `سلام دوست عزیز! برای ${prompt} یک پیشنهاد ویژه داریم. همین امروز استفاده کن 💙`;
      aiResult.firstChild.textContent = message;

      const count = [...message].length;
      charCount.textContent = `${count} کاراکتر`;
      partCount.textContent = `${Math.max(1, Math.ceil(count / 70))} پارت پیامک`;
      aiResult.classList.add("show");
    });

    // باز و بسته شدن پرسش‌های متداول
    document.querySelectorAll(".faq-question").forEach(button => {
      button.addEventListener("click", () => {
        button.parentElement.classList.toggle("open");
      });
    });

    // نمونه‌های کد API
    const codeSamples = {
      curl: `curl -X POST https://api.example.com/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "09120000000",
    "message": "سلام! پیام شما آماده ارسال است."
  }'`,
      python: `import requests

response = requests.post(
    "https://api.example.com/v1/messages",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "to": "09120000000",
        "message": "سلام! پیام شما آماده ارسال است."
    }
)

print(response.json())`,
      node: `const response = await fetch(
  "https://api.example.com/v1/messages",
  {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: "09120000000",
      message: "سلام! پیام شما آماده ارسال است."
    })
  }
);

console.log(await response.json());`
    };

    const codeBlock = document.getElementById("codeBlock");
    const codeTabs = document.querySelectorAll(".code-tab");

    codeTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        codeTabs.forEach(item => item.classList.remove("active"));
        tab.classList.add("active");
        codeBlock.textContent = codeSamples[tab.dataset.code];
      });
    });

    // کپی کردن نمونه کد
    document.getElementById("copyCode").addEventListener("click", async (event) => {
      const button = event.currentTarget;

      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        button.textContent = "کپی شد ✓";
        setTimeout(() => button.textContent = "کپی کد", 1600);
      } catch {
        button.textContent = "کپی خودکار در دسترس نیست";
        setTimeout(() => button.textContent = "کپی کد", 1800);
      }
    });
