// Inisialisasi variabel dan fungsi
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen kartu
    const cards = document.querySelectorAll('.card');
    
    // Ambil elemen audio untuk efek klik
    const clickSound = document.getElementById('click-sound');
    
    // Tambahkan event listener untuk setiap kartu
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Dapatkan posisi klik relatif terhadap kartu
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Buat efek ripple
            createRippleEffect(card, x, y);
            
            // Putar suara klik
            playClickSound();
            
            // Tambahkan efek glow pada kartu
            addCardGlow(card);
            
            // Tampilkan detail kartu (dalam kasus ini, console log)
            showCardDetails(card);
        });
    });
    
    // Fungsi untuk membuat efek ripple
    function createRippleEffect(card, x, y) {
        // Hapus efek ripple sebelumnya jika ada
        const existingRipple = card.querySelector('.ripple-effect');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // Buat elemen ripple baru
        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        
        // Set posisi ripple sesuai dengan titik klik
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Tambahkan ripple ke dalam kartu
        card.appendChild(ripple);
        
        // Hapus ripple setelah animasi selesai
        setTimeout(() => {
            if (ripple.parentNode === card) {
                ripple.remove();
            }
        }, 600);
    }
    
    // Fungsi untuk memutar suara klik
    function playClickSound() {
        // Reset audio ke awal
        clickSound.currentTime = 0;
        
        // Coba putar audio
        clickSound.play().catch(e => {
            console.log("Audio tidak dapat diputar: ", e);
            // Fallback: buat suara menggunakan Web Audio API jika file audio tidak tersedia
            createFallbackSound();
        });
    }
    
    // Fungsi fallback untuk membuat suara menggunakan Web Audio API
    function createFallbackSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Atur tipe gelombang dan frekuensi
            oscillator.type = 'sine';
            oscillator.frequency.value = 800;
            
            // Atur envelope suara
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            // Mulai dan hentikan osilator
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            console.log("Web Audio API tidak didukung: ", error);
        }
    }
    
    // Fungsi untuk menambahkan efek glow pada kartu
    function addCardGlow(card) {
        // Tambahkan kelas untuk efek glow
        card.classList.add('card-glow');
        
        // Hapus efek glow setelah beberapa saat
        setTimeout(() => {
            card.classList.remove('card-glow');
        }, 500);
    }
    
    // Fungsi untuk menampilkan detail kartu
    function showCardDetails(card) {
        const cardId = card.getAttribute('data-card');
        const cardTitle = card.querySelector('.card-title').textContent;
        
        // Tampilkan informasi di console (bisa diganti dengan modal atau efek lainnya)
        console.log(`Kartu diklik: ${cardTitle} (ID: ${cardId})`);
        
        // Tambahkan efek visual tambahan berdasarkan kartu
        switch(cardId) {
            case '1':
                animateProfileCard(card);
                break;
            case '2':
                animatePersonalCard(card);
                break;
            case '4':
                animateAchievementCard(card);
                break;
            default:
                // Efek default untuk kartu lainnya
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
                break;
        }
    }
    
    // Animasi khusus untuk kartu profil
    function animateProfileCard(card) {
        const profileImg = card.querySelector('.profile-img');
        if (profileImg) {
            profileImg.style.transform = 'scale(1.05)';
            setTimeout(() => {
                profileImg.style.transform = '';
            }, 300);
        }
    }
    
    // Animasi khusus untuk kartu riwayat pribadi
    function animatePersonalCard(card) {
        const infoItems = card.querySelectorAll('.info-item');
        infoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-10px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
        
        // Reset setelah selesai
        setTimeout(() => {
            infoItems.forEach(item => {
                item.style.opacity = '';
                item.style.transform = '';
                item.style.transition = '';
            });
        }, 1000);
    }
    
    // Animasi khusus untuk kartu prestasi
    function animateAchievementCard(card) {
        const achievements = card.querySelectorAll('.achievement-item');
        achievements.forEach((achievement, index) => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                achievement.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                achievement.style.opacity = '1';
                achievement.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
        // Reset setelah selesai
        setTimeout(() => {
            achievements.forEach(achievement => {
                achievement.style.opacity = '';
                achievement.style.transform = '';
                achievement.style.transition = '';
            });
        }, 1500);
    }
    
    // Tambahkan efek hover dinamis untuk ikon sosial media
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Tambahkan efek untuk judul utama
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        // Animasi masuk untuk judul
        mainTitle.style.opacity = '0';
        mainTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            mainTitle.style.opacity = '1';
            mainTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Tambahkan efek untuk kartu saat halaman dimuat
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 500 + (index * 150));
    });
    
    // Tambahkan CSS untuk efek glow
    const style = document.createElement('style');
    style.textContent = `
        .card-glow {
            box-shadow: 0 0 25px rgba(106, 90, 205, 0.4) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Log informasi tentang portfolio
    console.log('Portfolio Nadia Khairunnisa telah dimuat dengan sukses!');
    console.log('Portofolio ini dibuat dengan HTML, CSS, dan JavaScript murni.');
    console.log('Fitur interaktif: efek klik dengan suara dan animasi.');
});