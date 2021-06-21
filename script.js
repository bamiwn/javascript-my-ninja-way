document.addEventListener('DOMContentLoaded', function() {
    const formBuku = document.getElementById('data-buku');

    formBuku.addEventListener('submit', function(event) {
        event.preventDefault();
        tangkapDataInput();
    });
});