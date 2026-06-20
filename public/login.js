
// ===================================================
// صفحة تسجيل الدخول - لوحة إدارة العيادة
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');

    // ---------- كلمة المرور الخاصة بالمشرف ----------
    const ADMIN_PASSWORD = 'Majd_2026';   // ← غيّرها كما تريد (يُفضّل جلبها من الخادم في النسخة النهائية)

    // ---------- التحقق عند الضغط على الزر ----------
    loginBtn.addEventListener('click', handleLogin);

    // ---------- السماح بالدخول بالضغط على Enter ----------
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    });

    function handleLogin() {
        const enteredPassword = passwordInput.value.trim();

        // التحقق من أن الحقل غير فارغ
        if (!enteredPassword) {
            errorMsg.textContent = 'الرجاء إدخال كلمة المرور';
            passwordInput.focus();
            return;
        }

        // مقارنة كلمة المرور
        if (enteredPassword === ADMIN_PASSWORD) {
            // تخزين رمز الدخول في المتصفح
            localStorage.setItem('adminToken', 'Majd_2026');
            // توجيه إلى صفحة استقبال المرضى
            window.location.href = '/admin.html';
        } else {
            errorMsg.textContent = 'كلمة المرور غير صحيحة';
            passwordInput.value = '';
            passwordInput.focus();
        }
    }
});