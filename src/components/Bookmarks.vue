<template>
    <div class="repos">
        <h1 class="bookmarks__header">Bookmarks</h1>
        <div class="bookmarks__list">
            <RepoBrief v-for="(repo, index) in bookmarkedRepos" 
                :key="index" :repo="repo" 
                :repoIndex="index" 
                @displayModal="displayModal">
            </RepoBrief>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RepoBrief from './RepoBrief.vue';
import Modal from './Modal.vue';

@Component({
    components: {
        RepoBrief,
        Modal
    }
})
export default class Bookmarks extends Vue {
    get bookmarkedRepos() {
        return this.$store.state.bookmarkedRepos;
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
</script>