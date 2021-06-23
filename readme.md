## VueX in a Nutshell

### Persyaratan
- Sudah mengerti dan memasang `vue-cli`

### What is VueX ?
VueX adalah sebuah state management pada Vue.

Kalau bingung "state management" itu apa, anggap saja sebagai sebuah wadah   
untuk menyimpan data secara global pada Vue, jadi kita tidak perlu menaruh  
data pada sebuah file App atau "Component Utama" :grin:

### How to install VueX ?
1. Via CDN (https://unpkg.com/vuex@3.6.2/dist/vuex.js)
2. Via npm (`npm install vuex`)
3. Via CLI (preferred !)
  - `npm install -g @vue/cli`
  - `vue create NAMA_PROJECT`
  - Pilih `Manually select features`
  - Centang `Vuex`
  - (Bila menggunakan Prettier dan menggunakan Linter / Formatter, pada saat opsi   
    `Pick a linter / formatter config`, pilih yang ada opsi `ESLint + Prettier`

### How to VueX ?
Dalam VueX sama dengan Vue, terbagi menjadi beberapa "methods" yang digunakan, mirip dengan  
`data, computed, dan watched` di Vue normal. di VueX umumnya terbagi menjadi 5 bagian besar:
- State
- Mutation
- Action
- Getter
- Modules (Tidak dibahas di pembelajaran ini)

#### State
Merupakan data global yang disimpan pada VueX, 

Rules of Thumb:
State **TIDAK BOLEH** diubah secara langsung (no SETTER on State !),   
Gunakan Action atau Mutation (Action Preferred)

#### Mutation
Merupakan method yang digunakan untuk memutasi (mengubah) State. anggap saja seperti SETTER untuk
State. 

Rules of Thumb:
- Mutation **TIDAK BOLEH** dipanggil secara langsung
- Mutation umumnya bersifat **SYNCHRONOUS**,   
  jangan gunakan hal hal bersifat asynchronous pada Mutation !  
  (mis: Fetch data adalah Async jadi tidak boleh di Mutation, tapi ketika data sudah selesai  
  di-fetch, kemudian ingin dimasukkan ke State, maka sifatnya adalah synchronous, sehingga hal  
  tersebut bisa menjadi sebuah Mutation)

#### Action
Merupakan method yang digunakan secara global untuk mengubah sifat pada state.

Rules of Thumb:
- Action bersifat Asynchronous.
- Action akan melakukan suatu hal jangka panjang (fetch data dari sumber lain, memanggil hal hal  
  yang bersifat async), kemudian akan memanggil Mutation untuk mengubah State.

#### Getter
Sesuai dengan namanya, ini merupakan Getter (pengambil) State. Loh kenapa harus ada ini, padahal  
kan State boleh diambil secara langsung?

Anggap saja Getter ini adalah `computed` pada VueX, mis, dari data State yang merupakan Array of  
Object, kita ingin memfilter sesuatu berdasarkan id nya, atau kata kunci lainnya, maka kita bisa  
menggunakan Getter untuk hal tersebut :grin:

Getter bisa dibuat secara:
- Property based (tidak menerima parameter, hanya langsung dipanggil dan terima hasil jadi)
- Method based (menerima parameter, hasil tergantung dari parameter yang dikirimkan)

Terdapat perbedaan mendasar dari keduanya:
- Property based getter hasilnya akan di-cache oleh Vue
- Method based getter hasilnya tidak akan di-cache oleh Vue.

~ Use it wisely ! ~

### Let's Get Started with VueX !
Sudah cukup teorinya, mari saatnya kita mencoba. Pada pembelajaran ini kita akan membuat sebuah  
aplikasi berbasis VueX yang akan mengambil list todos dari situs   
https://jsonplaceholder.typicode.com/todos/  dan akan menampilkan data tersebut dalam bentuk tabel  
pada aplikasi kita, lewat sebuah component yang bernama `HelloWorld` yang isinya adalah Tabel.

Tabel ini akan mengambil data dari state yang ada pada VueX.

How to?

1. Buka terminal, ketik `vue create NAMA_PROJECT`
2. Pick a preset: `Manually select features`
3. Check the features needed: `Babel`, `Vuex`, `Linter / Formatter`
4. Vue version: `2.x`
5. Linter / Formatter config: *sesuaikan dengan yang dimiliki*
6. Additional Lint features: *sesuaikan dengan preferensi*
7. Where do you prefer placing config? *sesuaikan dengan preferensi*
8. Save this preset? *sesuaikan dengan preferensi*
9. Lihat pada folder todos/store/ akan dibuatkan sebuah file dengan nama `index.js`, inilah 
   lokasi dimana vuex punya method semuanya akan dimodifikasi nantinya
10. Modifikasi file `index.js` menjadi seperti berikut:
```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // ini adalah data utama yang akan digunakan
    // isinya nanti akan menjadi array of Object
    todos: [],
  },
  mutations: {
    // ini adalah method yang digunakan untuk mengubah si state
    // parameter pertama adalah state <--- isinya adalah SELURUH state yang ada
    // parameter kedua adalah payload, ini adalah data yang akan digunakan
    //    untuk mengubah suatu state yang ada

    // ingat mutation HARUS bersifat synchronous !
    MUTATE_TODOS(state, payload) {
      state.todos = payload;
    },
  },
  actions: {
    // di sini method boleh bersifat async
    // sehingga method untuk mencomot data dari external bisa dilakukan di sini

    // parameter pertama adalah context
    // context memiliki 2 fungsi utama: commit dan dispatch
    // bisa juga menggunakan atau memanggil state, bila dibutuhkan

    // context.commit <-- digunakan untuk "emit" mutation
    // context.dispatch <-- digunakan untuk "emit" action
    //    (dalam satu action, bisa memanggil action lainnya)
    // context.state <-- memanggil data yang akan digunakan kembali
    //    (ingat hanya bersifat untuk dipanggil, tidak boleh diubah !)

    // parameter kedua adalah payload (optional, boleh ada, boleh tidak ada)
    fetchDataFromInternet(context, payload) {
      // ini hanya untuk keisengan belaka
      let tempData = context.state.todos;
      console.log(tempData, "<<< tempData");
      console.log(payload, "<<< payload");

      // start dari sini
      // comot data dari internet (async)
      fetch("https://jsonplaceholder.typicode.com/todos/")
        .then((response) => {
          // ini datanya, ini masih berupa Promise, jadi harus then sekali lagi
          return response.json();
        })
        .then((data) => {
          let output = data; // ini adalah data dalam bentuk array of object

          // akan kita simpan ke todos, via mutation MUTATE_TODOS
          // memanggil mutation, seperti layaknya emit
          // dengan menggunakan context.commit

          // sifatnya adalah synchronous
          context.commit("MUTATE_TODOS", output);
        })
        .catch((err) => {
          console.log(err, "<<< error");
        });
    },
  },
  modules: {},
});

```
11. Buka file `src/components/HelloWorld.vue` dan modifikasilah seperti berikut:
```javascript
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
```
12. ketik pada terminal `cd todos`
13. ketik pada terminal `npm run serve`

Sampai pada tahap ini kita sudah berhasil menggunakan State, Mutation, dan Actions pada VueX.  
(Untuk getter dicari tahu lebih lanjut secara mandiri yah !)

### Hint VueX
- Harus mengetahui kapan menggunakan state, mutation, action, dan getter
- Ingat bahwa vuex memiliki built in function untuk mempermudah hidup (`mapXXX`)
- Jangan pernah menggunakan v-model untuk mengubah state !
  (See BONUS pada referensi)

### TL;DR
- Action akan memanggil Mutation untuk mengubah State.  
- filtering data State dengan Getter.

### Referensi
- https://vuex.vuejs.org/
- https://vuex.vuejs.org/guide/
- https://vuex.vuejs.org/guide/state.html
- https://vuex.vuejs.org/guide/mutations.html
- https://vuex.vuejs.org/guide/actions.html
- https://vuex.vuejs.org/guide/getters.html
- [BONUS] https://vuex.vuejs.org/guide/forms.html