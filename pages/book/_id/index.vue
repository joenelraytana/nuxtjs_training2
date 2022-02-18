<template>
    <section class="content">
        <div  class="book-details">
            <h1 class="boot-title">Movie Title: {{title}}</h1>
            <div>
                <b-image
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                >
                </b-image>
                <!-- <img class="book-image" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" :alt="title"> -->
            </div>
        </div>
        <h4 class="boot-author">Author: {{ author }}</h4>
        <h4>Movie Type: {{ category }}</h4>
        <h4>Description: {{ description }}</h4>
    </section> 
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data () {   
        return {
            id: this.$route.params.id,
            category: null,
            title: null,
            author: null,
            description: null
        }
    },
    computed: {
        ...mapGetters(['allBooks']),
    },
    async created() {
        await this.allBooks.forEach((bookArr, index) => {
            if(bookArr.item.length > 0) {
                bookArr.item.find((book, ind) => {
                    if(book.id === this.id) {
                        this.category = bookArr.category;
                        this.title = book.title;
                        this.author = book.author;
                        this.description = book.description;
                    }
                }
            )}
        })
    }
}
</script>

<style scoped>
    .book-details {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 30px;
    }
    .book-image {
        width: 100%;
    }
    .boot-title {
        font-size: 40px;
        font-weight: bold;
    }
</style>