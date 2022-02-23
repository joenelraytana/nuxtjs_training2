<template>
    <div class="login content">
        <h3>BookApp</h3>
        <form @submit.prevent="loggedIn">
            <div class="login">
                <b-field label="Email">
                    <b-input type="text" class="input-field" v-model="email" placeholder="email"></b-input>
                </b-field>
            </div>
            <div class="password">
                <b-field label="Password">
                    <b-input type="password" class="input-field" v-model="password" placeholder="password"></b-input>
                </b-field>
            </div>
            <div class="buttons">
                <b-button class="btn-submit is-success" type="submit" @click="loggedIn">{{ btnTxt }}</b-button>
            </div>
        </form>
        <div class="error" v-if="error">
            {{error.message}}
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: '',
            btnTxt: "Login",
        }
    },
    methods: {
        loggedIn() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then( data=> {
                console.log('data - ', data);
                this.$router.push('/book')
            })
            .catch(error => {this.error = error})
        }
    }
}
</script>

<style scoped>
    .login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .input-field {
        width: 400px;
        margin: 20px;
        font-size: 21px;
    }
    .buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .btn-submit {
        width: 100%;
        height: 45px;
    }
    .error {
        color: red;
    }
</style>