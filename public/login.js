
// ===================================================
// صفحة تسجيل الدخول - لوحة إدارة العيادة
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const errorMsg = document.getElementById('errorMsg');

    // ---------- التحقق عند الضغط على الزر ----------
    loginBtn.addEventListener('click', handleLogin);

    // ---------- السماح بالدخول بالضغط على Enter ----------
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    });

    async function handleLogin() {
        const enteredPassword = passwordInput.value.trim();

        // التحقق من أن الحقل غير فارغ
        if (!enteredPassword) {
            errorMsg.textContent = 'الرجاء إدخال كلمة المرور';
            passwordInput.focus();
            return;
        }

        try {
            // إرسال كلمة المرور إلى السيرفر للتحقق
            const response = await fetch('/api/check-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: enteredPassword })
            });

            const data = await response.json();

            if (data.success) {
                // تخزين رمز الدخول في المتصفح
                localStorage.setItem('adminToken', 'OK');
                // توجيه إلى لوحة التحكم
                window.location.href = '/admin.html';
            } else {
                errorMsg.textContent = 'كلمة المرور غير صحيحة';
                passwordInput.value = '';
                passwordInput.focus();
            }
        } catch (error) {
            console.error('Login error:', error);
            errorMsg.textContent = 'حدث خطأ في الاتصال بالخادم';
        }
    }
});
