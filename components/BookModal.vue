<template>
    <section>
        <b-modal v-model="isCardModalActive" :width="640" scroll="keep">
            <form
                accept-charset="UTF-8"
                @submit.prevent="onSubmit"
            >
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title"> Add Books </p>
                    </header>
                    <div class="card-content">
                        <p class="error-txt" v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                            <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
                            </ul>
                        </p>
                        <b-field label="Category">
                            <b-select v-model="category" placeholder="Select a Category" required expanded>
                                <option v-for="(item, key) of categories" :key="key" :value="item">{{ item }}</option>
                            </b-select>
                        </b-field>
                        <b-field label="Enter Book Title">
                            <b-input v-model="title" required></b-input>
                        </b-field>
                        <b-field label="Enter Book Author">
                            <b-input v-model="author"></b-input>
                        </b-field>
                        <b-field label="Enter Book Description">
                            <b-input v-model="description"></b-input>
                        </b-field>
                        <div class="buttons">
                            <b-button type="submit" class="is-success" @click="onSubmit">Add Books</b-button>
                        </div>
                    </div>
                </div>
            </form>
        </b-modal>
    </section>
</template>

<script>
import { eventBus } from "@/eventBus";
export default {
    data() {
        return {
            errors: [],
            isCardModalActive: false,
            category: null,
            title: null,
            author: null,
            description: null,
            categories: ["Action", "SciFi", "Anime"]
        };
    },
    created() {
        eventBus.$on("open-add-book-modal", data => {
            if (data) {
                this.category = data.category;
                this.title = data.title;
                this.author = data.author;
                this.description = data.description;
            }
            this.isCardModalActive = true;
        });
    },
    methods: {
        async onSubmit(e) {
            console.log('submitting...');
            let cardData = {
                category: this.category,
                title: this.title,
                author: this.author,
                description: this.description
            };
            if (this.title && this.category) {
                return true;
            }

            this.errors = [];

            if (!this.title) {
                this.errors.push('Category required.');
            }
            if (!this.category) {
                this.errors.push('Title required.');
            }

            if (!this.errors.length) {
                return true;
            }
            e.preventDefault();
            console.log('Add cardData - ', cardData);
            if (this.title && this.category) {
                eventBus.$emit("save-book", cardData);
                this.isCardModalActive = false;
            }
        }
    }
}
</script>

<style scoped>
.error-txt {
    color: red;
 }
</style>