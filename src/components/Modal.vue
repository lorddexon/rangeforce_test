<template>
    <div>
        <vue-simplemde :value="readme" ref="markdownEditor"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import VueSimplemde from 'vue-simplemde';
@Component({
    components: {
        VueSimplemde
    }
})
export default class Modal extends Vue {
    @Prop()
    readme!: string;
} 
</script>
<style lang="scss" scoped>
    @import '~simplemde/dist/simplemde.min.css';
</style>