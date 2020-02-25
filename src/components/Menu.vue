<template>
	<div id="nav">
		<router-link to="/">Home</router-link> |
		<router-link to="/bookmarks">My bookmarks ({{bookmarkedRepos}})</router-link>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Menu extends Vue {
	get bookmarkedRepos() {
		return this.$store.state.bookmarkedRepos !== null ? this.$store.state.bookmarkedRepos.length : 0;
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
	#nav {
		width: 700px;
		margin: 0px auto 20px;
		display: flex;
		padding-top: 10px;
		justify-content: center;
		a {
			font-weight: bold;
			color:#41B883;
			margin: 0 10px;
			font-size: 16px;
			text-decoration: none;
			border-bottom: 2px solid #41B883;
			transition: all 0.1s;
			&:hover {
				border-bottom: 2px solid transparent;
			}
			&.router-link-exact-active {
				color: #35495E;
				text-decoration: none;
				border-bottom: 2px solid transparent;
				&:hover {
					border-bottom: 2px solid transparent;
				}
			}
		}
	}
</style>