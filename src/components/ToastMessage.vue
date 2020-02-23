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
    @Prop()
    repoIndex!: number

    hideMessage(): void {        
        clearTimeout(this.timeout);
        this.isFaded = true;
        this.timeout = setTimeout(() => {
            this.$store.commit('REMOVE_MESSAGE', this.messageIndex)
        }, 200)
    }
    undo(): void {      
        clearTimeout(this.timeout);
        this.$store.dispatch('undo', {index: this.messageIndex, repoIndex: this.repoIndex});
    }
    fadeOut() {
        this.isFaded = false;
        clearTimeout(this.timeout);
        this.isFaded = true;
        this.timeout = setTimeout(() => {
            this.$store.commit('REMOVE_MESSAGE', this.messageIndex);
        }, 3000)
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
}
</script>
<style lang="scss" scoped>
    .toast__message {
        position: relative;
        left: 300px;
        &.faded {
            animation-name: message;
            animation-duration: 3s;
        }
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