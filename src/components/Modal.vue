<template>
    <div>
        <markdown-it-vue class="md-body" :content="readme" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import MarkdownItVue from 'markdown-it-vue';
import 'markdown-it-vue/dist/markdown-it-vue.css'
@Component({
    components: {
        MarkdownItVue
    }
})
export default class Modal extends Vue {
    @Prop()
    readme!: string;
} 
</script>
<style lang="scss">
    #modals-container {
        .v--modal-overlay {
            .v--modal-box {
                padding: 10px;
                overflow-y: auto;
            }
        }
    }
</style>