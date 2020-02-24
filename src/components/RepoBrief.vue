<template>
    <div v-if="isVisible" class="repo__brief">
        <div class="repo__name">Name: <span>{{repo.name}}</span></div>
        <div class="repo__author">Author: {{repo.owner.login}}</div>
        <div class="repo__stars">Stars: {{stars}}</div>
        <div class="repo__forks">Forks: {{forks}}</div>
        <div class="repo__url"><span @click="openModal">View Readme</span> (<a :href="repo.html_url" target="_blank">{{repo.html_url}}</a>)</div>
        <div class="repo__bookmark">Bookmark: <span @click="toggleBookmark">{{this.bookmarked === false ? 'add':'remove'}}</span></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
@Component
export default class RepoBrief extends Vue {
    forks = 0;
    stars = 0;
    isVisible = false;
    bookmarked = false;
    inProgress = false;

    @Prop()
    repo!: Repo
    @Prop()
    repoIndex!: number

    @Watch('$store.state.bookmarkedRepos', {deep: true})
    onReposChanged(): void {
        this.checkBookmarkStatus();
    }
    @Watch('repo')
    orRepoChanged(): void {
        this.checkBookmarkStatus();
        this.getRepoInfo();
    }

    @Emit('displayModal')
    displayModal(url: string) {}

    openModal() {
        this.$emit('displayModal', `${this.repo.url}/contents/README.md`);
    }
    toggleBookmark() {
        this.bookmarked = !this.bookmarked;
        if (this.bookmarked === true) {
            this.$store.dispatch('addBookmark', {repo: this.repo, index: this.repoIndex});            
        } else {
            this.$store.dispatch('removeBookmark', {repo: this.repo, index: this.repoIndex});
        }
        this.checkBookmarkStatus();
    }
    async checkBookmarkStatus() {
        this.bookmarked = await this.$store.dispatch('getBookmarkStatus', {repo: this.repo});
    }
    async getRepoInfo() {
        const repoInfo: Repo = await this.$store.dispatch('getRepo', this.repo.url);
        this.forks = repoInfo.forks_count;
        this.stars = repoInfo.stargazers_count;
    }
    async created() {
        this.getRepoInfo();
        this.checkBookmarkStatus();
        this.isVisible = true;
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
    .repo__brief {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        background:#F8F8F8;
        margin-bottom: 15px;
        padding: 10px;
        transition: all 0.1s;
            box-shadow: none;
        & > div {
            padding: 10px;
        }
        &:hover {
            box-shadow: 0 0 5px #ccc;
        }
    }
    .repo__name, .repo__author, .repo__stars, .repo__forks {
        width: 25%;
        padding: 5px;
    }
    .repo__url {
        width: 75%;
        span {
            color:#41B883;
            cursor: pointer;            
            border-bottom: 1px dashed #41B883;
            margin-right: 10px;
            transition: all 0.1s;
            &:hover {
                border-bottom: 1px dashed transparent;
			}
        }
        a {
            color:#354A5E;
            &:hover {
                text-decoration: none;
            }
        }
    }
    .repo__bookmark {
        width: 25%;
        span {
            border-bottom: 1px dashed #41B883;
            color:#41B883;
            cursor: pointer;
            transition: all 0.1s;
            &:hover {
                border-bottom: 1px dashed transparent;
            }
        }
    }
</style>>