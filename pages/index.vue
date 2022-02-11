<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column" v-for="(column,colIndex) in columns" :key="colIndex">
        <h2 class="column-title"> {{ column.category }} </h2>
        <div v-for="(item,itemIndex) in column.item" :key="itemIndex"> 
          <BookCard
              class="mb-5"
              :id="item.id" 
              :bookTitle="item.title"
              :bookAuthor="item.author"
              :bookDescription="item.description">
                <template v-slot:button>
                  <nuxt-link :to="`/book/${item.title}`">
                    <b-button type="is-link is-light">View</b-button>
                  </nuxt-link>
                  <b-button type="is-info" @click.stop="edit(item, itemIndex, colIndex)">Edit</b-button>
                  <b-button type="is-danger" @click.stop="remove(itemIndex, colIndex)">Remove</b-button>
                </template>
          </BookCard>
        </div>
      </div>
      <BookModal />
    </div>
  </section>
</template>

<script>
import BookCard from "@/components/BookCard";
import BookModal from "@/components/BookModal";
import { eventBus } from "@/eventBus";
import { uuid } from 'vue-uuid';

export default {
  name: 'IndexPage',
  components: {
      BookCard,
      BookModal
  },
  data() {
    return {
      columns: [
        {
          category: "Action",
          item: [
            {
              id: uuid.v1(),
              category : "Action",
              title: "John Wick",
              author: "Keanu Reeves",
              description: "Baba Yaga The Boogeyman"
            }
          ]
        },
        {
          category: "SciFi",
          item: []
        },
        {
          category: "Anime",
          item: []
        }
      ]
    };
  },
  created() {
    eventBus.$on("save-book", cardData => {
      for (let i=0; i < this.columns.length; i++) {
        if (cardData.category === this.columns[i].category) {
          this.columns[i].item.push(cardData);
          this.columns[i].item.sort((a, b) => b - a);
        }
      }
    });
  },
  methods: {
    remove(itemIndex, colIndex) {
        this.columns[colIndex].item.splice(itemIndex, 1);
    },
    edit(item, itemIndex, colIndex) {
        eventBus.$emit("open-add-book-modal", item);
        this.columns[colIndex].item.splice(itemIndex, 1);
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
