Bagaimana cara untuk menambahkan Komponen di halaman Ionic? Jelaskan secara detail langkahnya.
1. **Menentukan Lokasi Penambahan Komponen**:
   Dalam file `folder.page.html`, terdapat beberapa komponen seperti `<ion-header>`, `<ion-toolbar>`, `<ion-segment>`, dan `<ion-card>`. Untuk menambahkan komponen baru, pilih lokasi yang sesuai dalam struktur halaman. Misalnya, jika Anda ingin menambahkan tombol tambahan di bagian toolbar, Anda bisa menempatkannya di dalam `<ion-toolbar>`. Jika ingin menambah elemen pada konten utama, gunakan area di dalam `<ion-content>`.

2. **Menambahkan Komponen Baru**:
   Tambahkan kode komponen baru di dalam struktur yang diinginkan. Misalnya, jika Anda ingin menambahkan tombol di dalam toolbar untuk melakukan aksi tertentu, Anda bisa menambahkan:
   ```html
   <ion-button slot="primary" (click)="aksiBaru()">Aksi Baru</ion-button>
   ```
   Letakkan ini di dalam `<ion-toolbar>` di `<ion-header>`.

3. **Menginisialisasi Aksi atau Fungsi di TypeScript**:
   Setelah menambahkan komponen di HTML, jika komponen tersebut memerlukan aksi (misalnya tombol dengan event `click`), Anda perlu menginisialisasi fungsi tersebut di file TypeScript (misalnya `folder.page.ts`). Tambahkan fungsi seperti:
   ```typescript
   aksiBaru() {
     console.log("Aksi baru dipicu!");
     // Lakukan aksi lainnya di sini
   }
   ```

4. **Menggunakan Binding atau Kondisi pada Komponen**:
   Ionic juga mendukung binding data dan kondisi. Misalnya, jika Anda ingin menampilkan elemen berdasarkan kondisi tertentu, gunakan direktif Angular seperti `*ngIf`. Contoh:
   ```html
   <ion-card *ngIf="showNewComponent">
     <ion-card-header>Komponen Baru</ion-card-header>
     <ion-card-content>Konten dari komponen baru.</ion-card-content>
   </ion-card>
   ```
   Kemudian, tentukan variabel `showNewComponent` di `folder.page.ts` dan atur sesuai kebutuhan.

5. **Styling Komponen Baru**:
   Untuk menyesuaikan tampilan komponen baru, gunakan file SCSS (`folder.page.scss`). Misalnya, untuk menambah styling pada tombol yang baru ditambahkan:
   ```scss
   ion-button {
     background-color: #4285f4;
     color: #fff;
   }
   ```

Screenshoot
![image](https://github.com/user-attachments/assets/f55c96da-cce1-42de-b194-979170e5d0d3)
![image](https://github.com/user-attachments/assets/56a55121-4fc8-440f-a080-3d0fea2d1b66)
![image](https://github.com/user-attachments/assets/55b95de5-bb16-4f2f-87d5-3f7c5f6c252e)
![image](https://github.com/user-attachments/assets/f7ff6a69-275d-48db-b0e8-5c853949645a)



# Tugas6
