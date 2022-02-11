<template>
    <div class="card">
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" alt="Placeholder image">
            </figure>
        </div>
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                    <img src="@/assets/author-img.png" alt="author">
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">{{ bookTitle }}</p>
                    <p class="author is-6">{{ bookAuthor }}</p>
                </div>
            </div>

            <div class="content">
                {{ bookDescription }}
            </div>
        </div>
    </div>
</template>

<script>
import eventBus from "@/eventBus";
export default {
    props: ["bookTitle", "bookAuthor", "bookDescription"]
}
</script>