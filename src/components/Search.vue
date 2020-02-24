<template>
    <div class="repos">
        <h1>Find repo</h1>
        <div class="search__header">
            <input type="text" v-model="search" @keyup.enter="findRepo"><button @click="findRepo">Search</button>
        </div>
        <div class="search__result">
            <RepoBrief v-for="(repo, index) in repos" :key="index" :repo="repo" :repoIndex="index" @displayModal="displayModal"></RepoBrief>
        </div>
        <modal name="hello-world">
        </modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import RepoBrief from './RepoBrief.vue';
import Modal from './Modal.vue';
import VModal from 'vue-js-modal'

@Component({
    components: {
        RepoBrief
    }
})
export default class Search extends Vue {
    search = '';
    repos: Repo[] = [];
    findRepo(): void {
        this.$store.commit('START_LOADING');
        this.repos = this.$store.state.repos.filter((repo: Repo) => {
            this.$store.commit('STOP_LOADING');
            return repo.full_name === this.search || repo.name === this.search
        });
    }
    
    async displayModal(url: string) {
        this.$store.commit('START_LOADING');
        let readme;
        const downloadUrl = await this.$store.dispatch('getDownloadUrl', url);
        if (downloadUrl !== false) {
            readme = await this.$store.dispatch('getReadme', downloadUrl);
        } else {
            readme = 'There is no readme';
        }
        this.$store.commit('STOP_LOADING');
        this.$modal.show(Modal, {readme})
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
    .search__header {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    input {
        width: 50%;
        padding: 10px;
        border: 1px solid #ccc;
        transition: all 0.1s;
        &:focus {
            outline: none;
            border: 1px solid #41B883;
        }
    }
    button {
        height: 37px;
        cursor: pointer;
        border: none;
        background: #35495E;
        color:#fff;
        transition: all 0.1s;
        margin-left: -1px;
        &:hover {
            background:#41B883;
        }
    }
</style>