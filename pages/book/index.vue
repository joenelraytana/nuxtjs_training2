<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column" v-for="(column,colIndex) in allBooks" :key="colIndex">
        <h2 class="column-title"> {{ column.category }} </h2>
        <div v-for="(item,itemIndex) in column.item" :key="itemIndex"> 
          <BookCard
              class="mb-5"
              :id="item.id" 
              :bookTitle="item.title"
              :bookAuthor="item.author"
              :bookDescription="item.description">
                <template v-slot:button>
                  <!-- <nuxt-link :to="{name: 'book', params: {id: item.id}}">  -->
                  <nuxt-link :to="`/book/${item.id}`"> 
                    <b-button type="is-link is-light">View</b-button>
                  </nuxt-link>
                  <b-button type="is-info" @click.stop="edit(column, item)">Edit</b-button>
                  <b-button type="is-danger" @click.stop="remove(column, item)">Remove</b-button>
                </template>
          </BookCard>
        </div>
      </div>
      <BookModal />
      <LogoutModal />
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/BookCard";
import BookModal from "@/components/BookModal";
import LogoutModal from "@/components/LogoutModal";
import { eventBus } from "@/eventBus";
import { uuid } from 'vue-uuid';
import { mapState, mapGetters, mapActions, mapMutations} from 'vuex';

export default {
  name: 'IndexPage',
  components: {
      BookCard,
      BookModal,
      LogoutModal
  },
  computed: {
    ...mapGetters(['allBooks'])
  },
  created() {
    eventBus.$on("save-book", cardData => {
      this.addBook(cardData);
    });
  },
  methods: {
    ...mapActions(['addBook', 'removeBook']),
    remove(column, item) {
        let data = {
          column: column,
          item: item
        }
        this.removeBook( 
          data = data
        );
      },
    edit(column, item) {
        eventBus.$emit("open-edit-book-modal", item);
        let data = {
          column: column,
          item: item
        }
        this.removeBook( 
          data = data
        );
      }
    }
  }
</script>

<style scoped>
  .column-title {
    font-weight: bold;
    text-align: center;
  }
</style>
