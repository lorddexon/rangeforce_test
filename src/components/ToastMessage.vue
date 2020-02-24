<template>
    <div class="toast__message" :class="{'faded': isFaded}">
        <div>
            <p>Bookmark "{{message.repo.name}}" has been {{message.status}}</p>
        </div>
        <div class="toast__buttons">
            <div class="toast__button" @click="hideMessage">Ok</div>
            <div class="toast__button" @click="undo">Cancel</div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ToastMessage extends Vue {
    timeout!: number;
    isFaded = false;
    @Prop()
    message!: Message
    @Prop()
    messageIndex!: number

    hideMessage(): void {        
        clearTimeout(this.timeout);
        this.isFaded = true;
        this.$store.commit('REMOVE_MESSAGE', this.message.repo);
    }
    undo(): void {      
        clearTimeout(this.timeout);
        this.$store.dispatch('undo', {message: this.message});
    }
    fadeOut(): void {
        this.isFaded = false;
        clearTimeout(this.timeout);
        this.isFaded = true;
        this.timeout = setTimeout(() => {
            this.$store.commit('REMOVE_MESSAGE', this.message.repo);
        }, 2700)
    }
    created() {
        this.fadeOut();
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
interface Message {
	status: string;
	repo: Repo;
    index: number;
    toastNumber: number;
}
</script>
<style lang="scss" scoped>
    .toast__message {
        position: relative;
        left: 300px;
        margin: 10px 10px 0 0;
        background: #F8F8F8;
        &.faded {
            animation-name: message;
            animation-duration: 3s;
        }
        -webkit-box-shadow: 0 0 5px #ccc;
        box-shadow: 0 0 5px #ccc;
    }
    .toast__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px 0;
    }
    .toast__button {
        margin: 0 10px;
        color:#41B883;
        border-bottom: 1px dashed #41B883;
        cursor: pointer;
        &:hover {
            border-bottom: 1px dashed transparent;
        }
    }
    @keyframes message {
        0%   {opacity: 0; left: 300px;}
        25%  {opacity: 1; left: 0px;}
        75%  {opacity: 1; left: 0px;}
        100% {opacity: 0; left: 300px; display: none;}
    }
</style>