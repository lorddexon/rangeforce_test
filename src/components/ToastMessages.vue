<template>
    <div class="toast__messages">
        <ToastMessage v-for="(message, index) in toastMessages" :key="index" :repoIndex="message.index" :message="message" :messageIndex="index"></ToastMessage>
    </div>
</template>
<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator';
import ToastMessage from './ToastMessage.vue';
@Component({
    components: {
        ToastMessage
    }
})
export default class ToastMessages extends Vue {    
    get toastMessages() {
        return this.$store.state.toastMessages;
    }
}
interface Repo {
    id: number;
	name: string;
    full_name: string;
    owner: {login: string};
	forks_count: number;
	stargazers_count: number;
    url: string;
    html_url: string;
}
</script>
<style lang="scss" scoped>
    .toast__messages {
        position: fixed;
        top: 0;
        right: 0;
        width: 290px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        display: flex;
        flex-direction: column;
    }
    .toast__message {
        margin: 10px 10px 0 0;
        border: 1px solid #ccc;
    }
    .toast__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        .toast__button { 
            margin: 0 10px;
        }
    }
</style>