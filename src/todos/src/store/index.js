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
