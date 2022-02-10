<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-6 m-auto">
          <div class="input-group mb-3">
            <form @submit.prevent="sendFile" enctype="multipart/from-data">
            <input type="file" ref="file" @change="selectFile" />
            <input type="text" v-model="clientId"/>
            <button>upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <h1>List Clients</h1>
      <hr />
      <p class="error" v-if="error">{{ error }}</p>
      <div class="posts-container">
        <div class="post" v-for="client in clients" :key="client._id">
          <p class="text">{{ client.nom }}</p>
          <p class="text">{{ client.adresse }}</p>
          <p class="text">{{ client.ville }}</p>
          <p class="text">{{ client.email }}</p>
          <p class="text">{{ client.telephone }}</p>
          <p class="text">{{ client.refClient }}</p>
          <p class="text">{{ client.password }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClientService from "../ClientService";
import RapportService from "../RapportService";
export default {
  name: "Home",
  data() {
    return {
      clients: [],
      error: "",
      file : null,
      titre : null,
      description : null,
      clientId : ''

    };
  },
  components: {},
  methods: {
    selectFile() {

         this.file = this.$refs.file.files[0];
         
    },
    sendFile() {
        RapportService.insertRapport(this.file, this.clientId)
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
          });
    },
    updateFile() {
        RapportService.updateRapport(this.file, this.clientId)
          .then((data) => {
            console.log(data)
          })
          .catch((error) => {
            console.error(`HTTP error: ${error.name} => ${error.message}`);
            throw "fail request at: GET /refreshtime";
          });
    }
  },



  async created() {
    ClientService.getClients()
      .then((data) => {
        this.clients = data.client;
      })
      .catch((error) => {
        console.error(`HTTP error: ${error.name} => ${error.message}`);
        throw "fail request at: GET /refreshtime";
      });
  },
};
</script>
