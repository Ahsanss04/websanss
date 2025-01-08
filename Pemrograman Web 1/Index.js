// Ambil semua tombol filter, item galeri (link), dan gambar galeri
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".btn");
const galleryImages = document.querySelectorAll(".gallery-img");

// Tambahkan event listener ke setiap tombol filter
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");

        // Filter link galeri
        galleryItems.forEach(item => {
            const category = item.getAttribute("data-category");
            if (filter === "all" || filter === category) {
                item.style.display = "inline-block"; // Tampilkan
            } else {
                item.style.display = "none"; // Sembunyikan
            }
        });

        // Filter gambar galeri
        galleryImages.forEach(image => {
            const category = image.getAttribute("data-category");
            if (filter === "all" || filter === category) {
                image.style.display = "inline-block"; // Tampilkan
            } else {
                image.style.display = "none"; // Sembunyikan
            }
        });

        // Tambahkan kelas aktif ke tombol yang dipilih
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
    });
});