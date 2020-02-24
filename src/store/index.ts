import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		repos: [],
		bookmarkedRepos: [] as Repo[],
		postUrl: 'https://api.github.com/repositories',
		config: {
			headers: {
				'Accept': 'application/json'
			}
		},
		toastMessages: [] as Message[],
		isLoading: false,
		// for unique :key
		toastNumber: 0
	},
	mutations: {
		GET_REPOS(state, repos) {
			state.repos = repos;
		},

		LOAD_BOOKMARKS(state) {
			state.bookmarkedRepos = JSON.parse(localStorage.getItem('bookmarks') as string);
		},

		ADD_BOOKMARK(state, {repo, index}) {
			state.bookmarkedRepos.splice(index, 0, repo);
			localStorage.setItem('bookmarks', JSON.stringify(state.bookmarkedRepos));
		},

		REMOVE_BOOKMARK(state, {repo}) {
			const index = state.bookmarkedRepos.findIndex((r: Repo) => {
				return r.id === repo.id;
			})
			state.bookmarkedRepos.splice(index, 1);
			localStorage.setItem('bookmarks', JSON.stringify(state.bookmarkedRepos));
		},

		ADD_MESSAGE(state, {repo, status, index}) {
			state.toastNumber++;
			state.toastMessages.push({status: status, repo: repo, index: index, toastNumber: state.toastNumber});
		},

		REMOVE_MESSAGE(state, index) {
			const i = state.toastMessages.findIndex((m: Message) => {
				return m.index === index;
			})
			state.toastMessages.splice(i, 1);
		},

		START_LOADING(state) {			
			state.isLoading = true;
		},

		STOP_LOADING(state) {			
			setTimeout(() => {
				state.isLoading = false;
			}, 300)
		}
	},
	actions: {
		// get all repos by API
		getRepos({state}) {
			this.commit('START_LOADING');
			axios.get(state.postUrl).then(response => {
				this.commit('GET_REPOS', response.data);
				this.commit('STOP_LOADING');
			}).catch(e => {
				console.error(`${e}: that's an error`);
			});
			//taking bookmars from localStorage
			this.commit('LOAD_BOOKMARKS');
		},

		// read info about current repo
		getRepo({state}, url) {
			return axios.get(url).then(response => {
				return response.data;
			}).catch(e => {
				console.error(`${e}: that's an error`);
			});
		},		

		getDownloadUrl({state}, url) {
			return axios.get(url).then(response => {
				return response.data.download_url;
			}).catch(e => {
				return false;
			});
		},

		getReadme({state}, url) {
			return axios.get(url).then(response => {
				return response.data;
			}).catch(e => {
				console.error(`${e}: that's an error`);
			});
		},

		getBookmarkStatus({state}, {repo}) {
			return state.bookmarkedRepos.findIndex((r: Repo) => {
				return r.id === repo.id;
			}) !== -1 ? true : false;
		},

		addBookmark({state}, {repo, index}) {
			this.commit('ADD_MESSAGE', {repo: repo, status: 'added', index})
			this.commit('ADD_BOOKMARK', {repo, index});
		},

		removeBookmark({state}, {repo, index}) {
			this.commit('ADD_MESSAGE', {repo: repo, status: 'removed', index: index})
			this.commit('REMOVE_BOOKMARK', {repo});			
		},

		undo({state}, {index}) {
			if (state.toastMessages[index].status === 'added') {
				this.commit('REMOVE_BOOKMARK', state.toastMessages[index].repo)
			} else {
				this.commit('ADD_BOOKMARK', {repo: state.toastMessages[index].repo, index: state.toastMessages[index].index})
			}
			this.commit('REMOVE_MESSAGE', index)
		}
	}
})

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