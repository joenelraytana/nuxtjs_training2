<template>
    <section>
        <b-modal v-model="isLogoutModalActive" :width="640" scroll="keep">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">Log out </p>
                </header>
                <div class="card-content content">
                    <h3>Are you sure you want to logout?</h3>
                    <div class="buttons btn-logout">
                        <b-button type="submit" class="is-danger" @click="onLogout">{{ btnTxt }}</b-button>
                    </div>
                </div>
            </div>
        </b-modal>
    </section>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { eventBus } from "@/eventBus";

export default {
    data() {
        return {
            isLogoutModalActive: false,
            btnTxt: 'Log out'
        };
    },
    created() {
        eventBus.$on("open-logout-modal", data => {
            this.isLogoutModalActive = true;
        })
    },
    methods: {
        onLogout() {
            firebase.auth().signOut().then( ()=> {
                this.$router.push("/");
            })
        }
    }
}
</script>

<style scoped>
    .card-content {
        display: flex;
        flex-direction: column;
    }
    .btn-logout {
        align-self: flex-end;
    }
</style>