<template>
  <div class="hello">
    <table>
      <thead>
        <tr>
          <th>User ID</th>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <!-- 9. -->
        <!-- Looping berdasarkan todos yang ada pada state di vuex -->
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.userId }}</td>
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.completed }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// 3.
// import di sini yah
// setelah import ini selesai kembali lihat ke computed
// import { mapState } from "vuex";

// 11.
// import yang baru dengan menambahkan si mapActions
// setelah ini selesai, ingat action mirip dengan method
// maka, mapActions ini akan kita gunakan pada methods !
// lihat pada bagian methods
import { mapActions, mapState } from "vuex";

export default {
  name: "HelloWorld",
  // 1.
  // karena state bisa berubah-ubah, dan kita akan memonitor dan memberikan perubahan
  // berdasarkan perubahan tersebut, maka pada component kita akan menggunakan
  // ... COMPUTED
  computed: {
    // 2.
    // supaya cepat, sebenarnya vuex menyediakan helpers untuk memudahkan kita
    // memapping state yang ada ke dalam component punya computed
    // tapi kita harus mengimport helpers nya terlebih dahulu
    // namanya dalah mapState

    // 4.
    // gunakan mapState
    // di sini kita akan menggunakan spread operator supaya bisa tetap ada
    // local computed (computed per component yang biasa kita deklarasikan)
    ...mapState([
      // 5.
      // kita akan memapping state bernama todos, ke dalam sebuah variabel
      // yang bernama todos, sehingga nanti bisa dipanggil dengan this.todos

      // 6.
      // sampai dengan tahap ini kita sudah berhasil bisa memanggil todos,
      // isinya masih kosong, supaya bisa ada isinya, kita harus bisa memanggil
      // actions fetchDataFromInternet pada saat component ini dibuat,
      // artinya kita harus memanggil actions pada saat created.
      // tapi bagaimanakah caranya?

      // ingat bahwa pada akhirnya actions itu adalah mirip dengan sebuah methods,
      // hanya saja bentuknya global,

      // sekarang saatnya kita membuat pada lifecycle created
      "todos",
    ]),
  },
  created() {
    // 7.
    // cara pertama
    // kita memanggil langsung untuk meng-"emit" si fetchDataFromInternet dari sini
    // this.$store.dispatch("fetchDataFromInternet");

    // 8. Lihat pada tbodynya, akan kita loooping berdasarkan state todos !

    // 10.
    // apakah ada cara lainnya yang mirip2 map di atas?
    // ya, vuex jg menyediakan sesuatu yang benama mapActions untuk hal tersebut.
    // jadi pertama tama, mari kita import lagi si mapActions

    // 15.
    // kita akan memanggil fetchData untuk mendapatkan hasil yang sama
    this.fetchData();
  },
  methods: {
    // 12.
    // kita akan menggunakan mapActions di sini untuk memapping
    // this.$store.dispatch("fetchDataFromInternet") ke this.fetchData

    ...mapActions({
      fetchData: "fetchDataFromInternet",
    }),

    // 13.
    // alternatif kalau tidak mau repot
    // bisa gunakan ...mapActions([Array of String])
    // ...mapActions(["fetchDataFromInternet"])
    // untuk mapping ke method yang bernama this.fetchDataFromInternet(...)

    // 14.
    // setelah ini selesai, mari kita kembali ke lifecycle created lagi
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

table {
  width: 50%;
}
</style>
