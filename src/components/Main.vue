<template>
    <div>
        <transition name="fade" mode="out-in">
            <div class="loading" v-show="isLoading === true">Loading...</div>
        </transition>
        <Menu></Menu>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        <ToastMessages></ToastMessages>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from './Menu.vue';
import ToastMessages from './ToastMessages.vue';
import Modal from './Modal.vue';

@Component({
    components: {
        Menu,
        ToastMessages
    }    
})
export default class Main extends Vue {
    get isLoading() {
        return this.$store.state.isLoading;
    }
} 
</script>

<style lang="scss">
    body {
        margin: 0;
        padding: 0;
        color:#35495E;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
    }
    * {
        box-sizing: border-box;
    }
    h1 {
        text-align: center;
    }
    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        font-size: 20px;
        color:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .repos {
        width: 700px;
        margin: 0 auto;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }
</style>