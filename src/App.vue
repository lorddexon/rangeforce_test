<template>
	<div id="app">
		<Main></Main>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Main from './components/Main.vue';

@Component({
	components: {
		Main
	}    
})
export default class App extends Vue {
	created() {
		this.$store.dispatch('getRepos');
	} 
} 
</script>