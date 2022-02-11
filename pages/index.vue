<template>
  <section class="section">
    <div class="columns is-mobile">
      <div class="column" v-for="(column,index) in columns" :key="index">
        <h2> {{ column.category }} </h2>
        <div v-for="(item,ind) in column.item" :key="ind"> 
          <BookCard
              class="mb-5"
              :bookTitle="item.title"
              :bookAuthor="item.author"
              :bookDescription="item.description">
                <template v-slot:button>
                  <v-btn @click.stop="edit(item,index)">Edit</v-btn>
                  <v-btn @click.stop="remove(item.category, index)">Remove</v-btn>
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
  // computed: {
  //   bookList: function () {
  //     console.log('columns - ', this.columns);
  //     return this.columns
  //   }
  // }
}
</script>
