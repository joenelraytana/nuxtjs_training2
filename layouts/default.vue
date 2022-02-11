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
        <NuxtLink
          v-for="(item, key) of items"
          :key="key"
          :to="item.to"
          class="navbar-item"
        >
          {{ item.title }}
        </NuxtLink>
      </template>

      <template #end>
          <b-navbar-item tag="div">
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
import { eventBus } from "@/eventBus";
export default {
  name: 'DefaultLayout',
  data () {
    return {
      items: [
        {
          title: 'My Book Store',
          to: { name: 'index' }
        },
        {
          title: 'Contact',
          to: { name: 'contact' }
        }
      ]
    }
  },
  methods: {
    openModal() {
      eventBus.$emit("open-add-book-modal");
    }
  }
}
</script>
