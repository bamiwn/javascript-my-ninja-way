const dataStorage = 'data';
const formBuku = document.getElementById('data-buku');
const daftarBukuBelumDibaca = document.getElementById('daftar-buku-belum-baca');
const daftarBukuSelesaiDibaca = document.getElementById('daftar-buku-selesai-baca');

if(typeof(Storage) !== 'undefined') {
    function tangkapDataInput() {
        let id = new Date();
        const tangkapJudul = document.getElementById('judul-buku').value;
        const tangkapPenulis = document.getElementById('penulis').value;
        const tangkapTahun = document.getElementById('tahun').value;
        const tangkapCeklis = document.getElementById('selesai-baca');
        let selesaiBaca = '';

        if(tangkapCeklis.checked) {
            selesaiBaca = true;
        } else {
            selesaiBaca = false;
        }

        const dataBukuObjek = {
            'id' : id,
            'judul_buku' : tangkapJudul,
            'penulis' : tangkapPenulis,
            'tahun' : tangkapTahun,
            'selesai_baca' : selesaiBaca
        };
        dataMasuk(dataBukuObjek);
        if(selesaiBaca) {
            cetakDataBukuSelesai();
        } else {
            cetakDataBuku();
        }
    }


    function dataMasuk(dataBukuObjek) {
        let dataBukuArray = [];
        if(localStorage.getItem(dataStorage) === null) {
            dataBukuArray = [];
        } else {
            dataBukuArray = JSON.parse(localStorage.getItem(dataStorage));
        }

        dataBukuArray.unshift(dataBukuObjek);
        localStorage.setItem(dataStorage, JSON.stringify(dataBukuArray));
    }



    function ambilDataBuku() {
        return JSON.parse(localStorage.getItem(dataStorage)) || [];
    }


    function olahDataBuku() {
        const dataBukuObjek = ambilDataBuku();
        const bukuBelumDibaca = daftarBukuBelumDibaca;
        const bukuSelesaiDibaca = daftarBukuSelesaiDibaca;
        
        for(let buku of dataBukuObjek) {
            let cetakData = document.createElement('div');
            cetakData.innerHTML = "<h4>" + buku.judul_buku + "</h4>";
            cetakData.innerHTML += "<p>" + buku.penulis + "</p>";
            cetakData.innerHTML += "<p>" + buku.tahun + "</p>";
            cetakData.innerHTML += "<button name='tombol-selesai-baca'>" + buku.selesai_baca + "</button>";
        
            if(buku.selesai_baca) {
                bukuSelesaiDibaca.appendChild(cetakData);
            } else {
                bukuBelumDibaca.appendChild(cetakData);
            }
        }
    }



    function cetakDataBuku() {
        const bukuBelumDibaca = document.getElementsByClassName('buku');
        bukuBelumDibaca.append(olahDataBuku());
    }



    function cetakDataBukuSelesai() {
        const bukuSelesaiDibaca = document.getElementsByClassName('buku');
        bukuSelesaiDibaca.append(olahDataBuku());
    }


    function bikinTombol(classCSS, eventListener) {
        const tombol = document.createElement('button');
        tombol.classList.add(classCSS);
        tombol.addEventListener('click', function(event) {
            eventListener(event);
        });
        return tombol;
    }



    window.addEventListener('load', function() {
        const dataBuku = ambilDataBuku();
        cetakDataBuku(dataBuku);
    });
} else {
    alert('Browser tidak mendudukung web storage');
}