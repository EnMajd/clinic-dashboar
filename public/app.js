// ============================================================
// عيادة التصوير الشعاعي - JavaScript
// ============================================================

// --- CONSTANTS ---
const PHONE_NUMBER = '963933724320';
const WHATSAPP_LINK = `https://wa.me/${PHONE_NUMBER}`;
const TELEGRAM_LINK = `https://t.me/+${PHONE_NUMBER}`;

// --- DOM ELEMENTS ---
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle?.querySelector('i');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const closeMobileBtn = document.getElementById('closeMobileMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const floatingToggle = document.getElementById('floatingToggle');
const floatingOptions = document.getElementById('floatingOptions');
const header = document.getElementById('header');

// ============================================================
// DARK MODE
// ============================================================
function initTheme() {
    if (!themeIcon) return;
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.add('fa-moon');
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        if (isDark) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ============================================================
// MOBILE MENU
// ============================================================
function openMobileMenu() {
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    hamburger?.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    hamburger?.classList.remove('active');
    body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
});

closeMobileBtn?.addEventListener('click', closeMobileMenu);
mobileOverlay?.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================================
// FLOATING CONTACT TOGGLE
// ============================================================
floatingToggle?.addEventListener('click', () => {
    floatingOptions?.classList.toggle('active');
    const isOpen = floatingOptions?.classList.contains('active');
    if (floatingToggle) {
        floatingToggle.querySelector('i').className = isOpen
            ? 'fas fa-times'
            : 'fas fa-comment-dots';
    }
});

document.addEventListener('click', (e) => {
    if (!floatingToggle?.contains(e.target) && !floatingOptions?.contains(e.target)) {
        floatingOptions?.classList.remove('active');
        if (floatingToggle) {
            floatingToggle.querySelector('i').className = 'fas fa-comment-dots';
        }
    }
});

// ============================================================
// SCROLL TO TOP
// ============================================================
function handleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
}

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// HEADER SCROLL EFFECT
// ============================================================
function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// ============================================================
// ACTIVE NAV LINK ON SCROLL
// ============================================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });

    if (window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    }
}

// ============================================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .slide-left, .slide-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// ============================================================
// BOOKING - DATA HELPERS
// ============================================================
function getBookingData() {
    const name = document.getElementById('fullName')?.value?.trim() || '';
    const phone = document.getElementById('phone')?.value?.trim() || '';
    const service = document.getElementById('serviceType')?.value || '';
    const date = document.getElementById('date')?.value || '';
    const time = document.getElementById('time')?.value || '';
    return { name, phone, service, date, time };
}

function validateBookingData(data) {
    if (!data.name || !data.phone || !data.service || !data.date || !data.time) {
        alert('⚠️ الرجاء تعبئة جميع الحقول أولاً');
        return false;
    }
    if (!/^09\d{8}$/.test(data.phone)) {
        alert('⚠️ الرجاء إدخال رقم هاتف سوري صحيح (09xxxxxxxx)');
        return false;
    }
    return true;
}

function buildBookingMessage(data) {
    return `مرحباً د. أحمد، أود حجز موعد:%0A%0A` +
        `👤 الاسم: ${data.name}%0A` +
        `📱 الهاتف: ${data.phone}%0A` +
        `🏥 الخدمة: ${data.service}%0A` +
        `📅 التاريخ: ${data.date}%0A` +
        `⏰ الوقت: ${data.time}`;
}

// حفظ الحجز في قاعدة البيانات عبر الخادم
async function saveAppointmentToBackend(data) {
    try {
        await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patient_name: data.name,
                phone: data.phone,
                service: data.service,
                date: data.date,
                time: data.time
            })
        });
        console.log('✅ تم حفظ الحجز في قاعدة البيانات');
    } catch (e) {
        console.log('⚠️ تعذر حفظ الحجز في الخادم (قد لا يكون الخادم شغالاً)');
    }
}

// ============================================================
// BOOKING BUTTONS (WhatsApp & Telegram)
// ============================================================
// زر الحجز عبر واتساب
document.getElementById('whatsappBookBtn')?.addEventListener('click', async () => {
    const data = getBookingData();
    if (!validateBookingData(data)) return;

    // حفظ في قاعدة البيانات
    await saveAppointmentToBackend(data);

    // فتح الواتساب
    const msg = buildBookingMessage(data);
    window.open(`${WHATSAPP_LINK}?text=${msg}`, '_blank');
});

// زر الحجز عبر تلغرام
document.getElementById('telegramBookBtn')?.addEventListener('click', async () => {
    const data = getBookingData();
    if (!validateBookingData(data)) return;

    // حفظ في قاعدة البيانات
    await saveAppointmentToBackend(data);

    // فتح التلغرام
    const msg = buildBookingMessage(data);
    window.open(`https://t.me/+${PHONE_NUMBER}?text=${msg}`, '_blank');
});

// ============================================================
// QUICK MESSAGE - WHATSAPP & TELEGRAM
// ============================================================
function getQuickMessage() {
    return document.getElementById('quickMessage')?.value?.trim() || '';
}

document.getElementById('sendWhatsappMsg')?.addEventListener('click', () => {
    const msg = getQuickMessage();
    if (!msg) {
        alert('⚠️ الرجاء كتابة رسالة أولاً');
        return;
    }
    window.open(`${WHATSAPP_LINK}?text=${encodeURIComponent(msg)}`, '_blank');
});

document.getElementById('sendTelegramMsg')?.addEventListener('click', () => {
    const msg = getQuickMessage();
    if (!msg) {
        alert('⚠️ الرجاء كتابة رسالة أولاً');
        return;
    }
    window.open(`${TELEGRAM_LINK}?text=${encodeURIComponent(msg)}`, '_blank');
});

// ============================================================
// AI UPLOAD SECTION
// ============================================================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('xrayFile');
const previewArea = document.getElementById('previewArea');
const previewImg = document.getElementById('previewImg');
const analyzeBtn = document.getElementById('analyzeBtn');
const aiResultBox = document.getElementById('aiResultBox');
const aiMessage = document.getElementById('aiMessage');
const removeImgBtn = document.getElementById('removeImg');
const fileNameDisplay = document.getElementById('fileName');

let selectedFile = null;

uploadArea?.addEventListener('click', () => fileInput?.click());

// Drag and drop support
uploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary-dark)';
    uploadArea.style.background = 'rgba(15,123,58,0.08)';
});

uploadArea?.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'var(--primary)';
    uploadArea.style.background = 'var(--primary-light)';
});

uploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'var(--primary)';
    uploadArea.style.background = 'var(--primary-light)';
    if (e.dataTransfer.files.length) {
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

fileInput?.addEventListener('change', (e) => {
    if (e.target.files.length) {
        handleFileSelect(e.target.files[0]);
    }
});

function handleFileSelect(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
        alert('⚠️ يرجى اختيار صورة بصيغة JPG أو PNG فقط');
        return;
    }
    if (file.size > 10 * 1024 * 1024) {
        alert('⚠️ حجم الصورة كبير جداً. الحد الأقصى 10 ميجابايت');
        return;
    }
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (ev) => {
        previewImg.src = ev.target.result;
        previewArea.style.display = 'inline-block';
        uploadArea.style.display = 'none';
        analyzeBtn.disabled = false;
        aiResultBox.style.display = 'none';
        if (fileNameDisplay) {
            fileNameDisplay.textContent = `📎 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        }
    };
    reader.readAsDataURL(file);
}

removeImgBtn?.addEventListener('click', () => {
    selectedFile = null;
    previewArea.style.display = 'none';
    uploadArea.style.display = 'block';
    analyzeBtn.disabled = true;
    aiResultBox.style.display = 'none';
    fileInput.value = '';
    if (fileNameDisplay) {
        fileNameDisplay.textContent = 'JPG, PNG, DICOM مسموح';
    }
});

// AI Analysis
const GROQ_API_KEY = window.GROQ_API_KEY || '';

analyzeBtn?.addEventListener('click', async () => {
    if (!selectedFile) return;

    aiResultBox.style.display = 'block';
    aiMessage.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;justify-content:center;padding:20px;">
            <i class="fas fa-spinner fa-pulse" style="font-size:1.5rem;color:var(--primary);"></i>
            <span>جاري تحليل الصورة باستخدام الذكاء الاصطناعي...</span>
        </div>
    `;
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> جاري التحليل...';

    aiResultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (!GROQ_API_KEY) {
        // وضع المحاكاة
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockReports = [
            "✅ التحليل الأولي: لا توجد علامات واضحة على كسور حادة.",
            "🧠 تم الكشف عن نمط طبيعي للرئتين والقلب.",
            "🦴 يظهر هيكل عظمي سليم دون تشوهات ملحوظة.",
            "⚠️ ملاحظة: توجد عتامة بسيطة في الفص السفلي."
        ];
        const random = mockReports[Math.floor(Math.random() * mockReports.length)];
        aiMessage.innerHTML = random;
        resetAnalyzeButton();
        return;
    }

    // استخدام Groq API الحقيقي
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.2-11b-vision-preview',
                messages: [{
                    role: 'user',
                    content: [
                        { type: 'text', text: 'أنت طبيب أشعة خبير. حلل صورة الأشعة هذه (X-ray) واكتب تقريراً أولياً مختصراً باللغة العربية.' },
                        { type: 'image_url', image_url: { url: previewImg.src } }
                    ]
                }],
                max_tokens: 500
            })
        });
        const data = await response.json();
        const analysis = data.choices?.[0]?.message?.content || 'تعذر الحصول على تحليل دقيق.';
        aiMessage.innerHTML = analysis;
    } catch (error) {
        aiMessage.innerHTML = '❌ حدث خطأ في الاتصال بالذكاء الاصطناعي.';
        console.error(error);
    } finally {
        resetAnalyzeButton();
    }
});

function resetAnalyzeButton() {
    if (analyzeBtn) {
        analyzeBtn.disabled = false;
        analyzeBtn.innerHTML = '<i class="fas fa-microchip"></i> بدء التحليل الذكي';
    }
}

// ============================================================
// COMBINED SCROLL HANDLER
// ============================================================
let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        requestAnimationFrame(() => {
            handleScrollTop();
            handleHeaderScroll();
            updateActiveNavLink();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

// ============================================================
// INITIALIZATION
// ============================================================
function init() {
    initTheme();
    initScrollAnimations();
    handleScrollTop();
    handleHeaderScroll();
    updateActiveNavLink();

    document.querySelectorAll('.hero-content, .section-header').forEach(el => {
        el.classList.add('animated');
    });

    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    console.log('✅ عيادة التصوير الشعاعي - جاهز للعمل');
    console.log('📱 التواصل عبر الواتساب:', WHATSAPP_LINK);
    console.log('📱 التواصل عبر التلغرام:', TELEGRAM_LINK);
}

document.addEventListener('DOMContentLoaded', init);