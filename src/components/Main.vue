<template>
    <div>
        <transition name="fade" mode="out-in">
            <div class="loading" v-show="isLoading === true">
                <div class="hourglass"></div>
            </div>
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
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
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
        .hourglass {
            display: inline-block;
            position: relative;
            width: 80px;
            height: 80px;
        }
        .hourglass:after {
            content: " ";
            display: block;
            border-radius: 50%;
            width: 0;
            height: 0;
            margin: 8px;
            box-sizing: border-box;
            border: 32px solid #fff;
            border-color: #fff transparent #fff transparent;
            animation: hourglass 1.2s infinite;
        }
        @keyframes hourglass {
            0% {
                transform: rotate(0);
                animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
            }
            50% {
                transform: rotate(900deg);
                animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
            100% {
                transform: rotate(1800deg);
            }
        }
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