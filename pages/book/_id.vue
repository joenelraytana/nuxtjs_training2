<template>
    <section class="book-details">
        <h1>{{ book.title }} </h1>
        <div>
            <img class="book-image" :src="book.thumbnail" :alt="book.title">
        </div>
        <p> {{ book.description }} </p>
    </section> 
</template>

<script>
export default {
    data () {   
        return {
            id: this.$route.params.id
        }
    },
    computed: {
        book() {
            return this.$store.state.recipeData.all.find(data => data.id === this.id);
        },
    }
}
</script>