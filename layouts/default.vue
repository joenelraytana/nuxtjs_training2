<template>
  <div>
    <b-navbar>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          >
        </b-navbar-item>
      </template>
      <template #start>
        <div class="register nav-header navbar-item" v-if="!isLoggedIn">
          Register
        </div>
        <div class="nav-header" v-else>
          <NuxtLink
            v-for="(item, key) of items"
            :key="key"
            :to="item.to"
            class="navbar-item"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
        <div class="logout-link nav-header navbar-item" v-if="isLoggedIn" @click="logOut">
          Logout
        </div>
      </template>

      <template #end>
          <b-navbar-item tag="div" v-if="isLoggedIn">
              <div class="buttons">
                 <b-button type="is-primary" @click.stop="openModal">Add Books</b-button>
              </div>
          </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { eventBus } from "@/eventBus";
import Cookies from 'js-cookie'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      isLoggedIn: false,
      items: [
        {
          title: 'My Book Store',
          to: { name: 'book' }
        },
        {
          title: 'Contact',
          to: { name: 'contact' }
        }
      ]
    }
  },
  mounted() {
    this.setupFirebase();
  },
  methods: {
    openModal() {
      eventBus.$emit("open-add-book-modal");
    },
    logOut() {
      eventBus.$emit("open-logout-modal");
    },
    setupFirebase() {
      firebase.auth().onAuthStateChanged( user => {
        if(user) {
          console.log('user logged-in - ', user);
          this.$router.push("/book");
          this.isLoggedIn = true;

          firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(token => {
            Cookies.set('access_token', token)
          })
        } else {
          this.isLoggedIn = false;
          Cookies.remove('access_token')
        }
      })
    }
  }
}
</script>

<style scoped>
  .nav-header {
    display: inline-flex;
  }
  .navbar-item {
    font-weight: bold;
  }
  .logout-link  {
    cursor: pointer;
    text-decoration: underline;
    color: #551a8b;
  }
</style>
