// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Logika untuk Dropdown Desktop ---
    const dropdownButton = document.getElementById('layanan-dropdown-button');
    const dropdownMenu = document.getElementById('layanan-dropdown-menu');

    if (dropdownButton && dropdownMenu) {
        // Toggle dropdown on button click
        dropdownButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Mencegah klik ini ditangkap oleh listener dokumen
            dropdownMenu.classList.toggle('hidden');
        });

        // Menutup dropdown saat link di dalamnya diklik
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', () => {
                dropdownMenu.classList.add('hidden');
            });
        });
    }

    // Menutup dropdown saat mengklik di mana saja di luar menu
    document.addEventListener('click', () => {
        if (dropdownMenu && !dropdownMenu.classList.contains('hidden')) {
            dropdownMenu.classList.add('hidden');
        }
    });


    // --- Logika untuk Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // --- Logika untuk Animasi Scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1 // Muncul saat 10% bagian terlihat
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Logika untuk Modal Kode ---
    const viewCodeBtn = document.getElementById('view-code-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const codeModal = document.getElementById('code-modal');
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeContents = document.querySelectorAll('.code-content');

    async function fetchAndDisplayCode() {
        try {
            const [htmlRes, cssRes, jsRes] = await Promise.all([
                fetch('index.html'),
                fetch('style.css'),
                fetch('script.js')
            ]);
            
            const htmlCode = await htmlRes.text();
            const cssCode = await cssRes.text();
            const jsCode = await jsRes.text();

            document.querySelector('#html-content code').textContent = htmlCode;
            document.querySelector('#css-content code').textContent = cssCode;
            document.querySelector('#js-content code').textContent = jsCode;
            
            Prism.highlightAll();

        } catch (error) {
            console.error("Gagal memuat kode sumber:", error);
            document.querySelector('#html-content code').textContent = 'Gagal memuat index.html.';
        }
    }

    if (viewCodeBtn) {
        viewCodeBtn.addEventListener('click', () => {
            codeModal.classList.remove('hidden');
            codeModal.classList.add('flex');
            fetchAndDisplayCode();
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            codeModal.classList.add('hidden');
            codeModal.classList.remove('flex');
        });
    }

    if (codeModal) {
        codeModal.addEventListener('click', (event) => {
            if (event.target === codeModal) {
                codeModal.classList.add('hidden');
                codeModal.classList.remove('flex');
            }
        });
    }

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active-tab'));
            codeContents.forEach(c => c.classList.add('hidden'));
            tab.classList.add('active-tab');
            const tabName = tab.dataset.tab;
            document.getElementById(`${tabName}-content`).classList.remove('hidden');
        });
    });

    // --- Logika untuk Lightbox Galeri (BARU) ---
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeImageModalBtn = document.getElementById('close-image-modal-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Mencegah link terbuka di tab baru
            const imageUrl = item.getAttribute('href');
            modalImage.setAttribute('src', imageUrl);
            imageModal.classList.remove('hidden');
            imageModal.classList.add('flex');
        });
    });

    function closeImageModal() {
        imageModal.classList.add('hidden');
        imageModal.classList.remove('flex');
    }

    if (closeImageModalBtn) {
        closeImageModalBtn.addEventListener('click', closeImageModal);
    }
    
    if (imageModal) {
        imageModal.addEventListener('click', (event) => {
            if (event.target === imageModal) {
                closeImageModal();
            }
        });
    }
});
