  const userNameKey = "payamakino.demo.userName";
  const userName = localStorage.getItem(userNameKey) || "مریم رضایی";
  const firstName = userName.trim().split(/\s+/)[0] || "مریم";

  document.querySelectorAll("[data-user-name]").forEach(element => {
    element.textContent = userName;
  });
  document.querySelectorAll("[data-user-initial]").forEach(element => {
    element.textContent = firstName[0];
  });
  document.getElementById("greetingName").textContent = firstName;
  document.getElementById("accountName").value = userName;

  const labels = {
    dashboard: "داشبورد", campaigns: "کمپین‌ها", contacts: "مخاطبین",
    reports: "گزارش‌ها", templates: "قالب‌ها", ai: "دستیار هوشمند",
    api: "وب‌سرویس API", numbers: "خطوط ارسال", billing: "مالی و اعتبار",
    settings: "تنظیمات"
  };

  function showPage(name) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
    const selected = document.getElementById("page-" + name);
    if (selected) selected.classList.add("active");
    document.querySelectorAll("#mainNav button[data-page]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.page === name);
    });
    document.getElementById("crumb").textContent = labels[name] || "داشبورد";
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("#mainNav button[data-page]").forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });
  document.querySelectorAll("[data-goto]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      showPage(link.dataset.goto);
    });
  });

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  document.getElementById("menuToggle").addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  });

  const modal = document.getElementById("campaignModal");
  function openModal() { modal.classList.add("show"); }
  function closeModal() { modal.classList.remove("show"); }
  document.querySelectorAll(".open-campaign").forEach(btn => btn.addEventListener("click", openModal));
  document.getElementById("closeModal").addEventListener("click", closeModal);
  document.getElementById("cancelModal").addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });

  let toastTimer;
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  const quickMessage = document.getElementById("quickMessage");
  quickMessage.addEventListener("input", () => {
    document.getElementById("charCount").textContent =
      new Intl.NumberFormat("fa-IR").format(quickMessage.value.length);
  });

  document.getElementById("suggestBtn").addEventListener("click", () => {
    quickMessage.value = "سلام! پیشنهاد ویژه‌ی این هفته‌ی ما را از دست ندهید. برای مشاهده‌ی جزئیات همین حالا اقدام کنید.";
    quickMessage.dispatchEvent(new Event("input"));
    showToast("یک متن پیشنهادی آماده شد");
  });

  document.getElementById("quickForm").addEventListener("submit", e => {
    e.preventDefault();
    showToast("پیامک در نسخه‌ی نمایشی آماده‌ی ارسال است");
  });

  document.getElementById("campaignForm").addEventListener("submit", e => {
    e.preventDefault();
    closeModal();
    showToast("کمپین در نسخه‌ی نمایشی ساخته شد");
    e.target.reset();
  });

  document.getElementById("generateBtn").addEventListener("click", () => {
    const topic = document.getElementById("aiTopic").value.trim() || "پیشنهاد ویژه";
    const tone = document.getElementById("aiTone").value;
    document.getElementById("aiOutput").value =
      `مخاطب عزیز، ${topic} را از دست ندهید! همین حالا از پیشنهاد ما استفاده کنید.`;
    showToast(`متن پیشنهادی با لحن ${tone} آماده شد`);
  });

  document.getElementById("copyAi").addEventListener("click", async () => {
    const text = document.getElementById("aiOutput").value;
    if (!text) return showToast("ابتدا یک متن بسازید");
    try { await navigator.clipboard.writeText(text); showToast("متن کپی شد"); }
    catch { showToast("کپی خودکار در این مرورگر در دسترس نیست"); }
  });

  const codeSamples = {
    curl: `curl -X POST https://api.payamakino.ir/v1/messages \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"to":"09120000000","message":"سلام، پیام آزمایشی"}'`,
    python: `import requests

response = requests.post(
    "https://api.payamakino.ir/v1/messages",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={"to": "09120000000", "message": "سلام، پیام آزمایشی"}
)
print(response.json())`,
    php: `<?php
$payload = ["to" => "09120000000", "message" => "سلام، پیام آزمایشی"];
// درخواست را به https://api.payamakino.ir/v1/messages ارسال کنید
?>`,
    node: `const response = await fetch("https://api.payamakino.ir/v1/messages", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ to: "09120000000", message: "سلام، پیام آزمایشی" })
});`
  };
  document.querySelectorAll("#codeTabs button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#codeTabs button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      document.getElementById("codeSample").textContent = codeSamples[button.dataset.lang];
    });
  });

  document.getElementById("copyKey").addEventListener("click", () => showToast("کلید نمایشی کپی شد"));
  document.querySelectorAll(".toggle").forEach(toggle => toggle.addEventListener("click", () => toggle.classList.toggle("on")));
  document.getElementById("saveSettings").addEventListener("click", () => showToast("تنظیمات در نسخه‌ی نمایشی ذخیره شد"));
  document.getElementById("notificationBtn").addEventListener("click", () => showToast("اعلان جدیدی ندارید"));
  document.getElementById("dateBtn").addEventListener("click", () => showToast("بازه‌ی زمانی: این ماه"));
  document.getElementById("chartRange").addEventListener("change", e => showToast("بازه‌ی نمودار: " + e.target.value));

  document.getElementById("globalSearch").addEventListener("keydown", e => {
    if (e.key === "Enter" && e.target.value.trim()) showToast("جست‌وجو برای: " + e.target.value.trim());
  });
// Handle dashboard toast actions from data attributes.
document.addEventListener("click", event => {
  if (!(event.target instanceof Element)) return;
  const action = event.target.closest("[data-toast]");
  if (!action) return;
  if (action instanceof HTMLAnchorElement) event.preventDefault();
  showToast(action.dataset.toast);
});
