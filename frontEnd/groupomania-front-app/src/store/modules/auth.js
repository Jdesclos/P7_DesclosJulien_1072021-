import axios from 'axios';
const state = {
    user: null,
    posts: null,
    token: null,
    userId: null,
  };
  
const getters = {
    isAuthenticated(state){

      return !!state.token
    },
    isLogin: state => !!state.user, 
    StatePosts: state => state.posts,
    StateUser: state => state.user,
    StateToken: state => state.token,
    StateUserId: state => state.userID
};

const actions = {
    async Register({dispatch}, form) {
        await axios.post('/api/users/register', form)
        let UserForm = new FormData()
        UserForm.append('email', form.email)
        UserForm.append('password', form.password)
        UserForm.append('username', form.username)
        await dispatch('LogIn', UserForm)
      },
      async LogIn({commit}, User) {
        await axios.post('/api/users/login', User)
        .then(function (response) {          
          const token = response.data.token;
          const userId = response.data.userId;
          commit('setUserId', userId)
          return commit('setToken', token)
        })
        await commit('setUser', User.get('username'))
      },
      async CreatePost({dispatch}, post) {
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userId = vuex.auth.userId;
        await axios({
          method:'post',
          url:'/api/home',
          data:{post, userId},
          headers:{Authorization: `Bearer ${token}`}
        })         
        await dispatch('GetPosts',token)
      },
      async CreateComment({dispatch}, post) {
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userId = vuex.auth.userId;
        await axios({
          method:'post',
          url:'/api/home',
          data:{post, userId},
          headers:{Authorization: `Bearer ${token}`}
        })         
        await dispatch('GetPosts',token)
      },
      async GetPosts({ commit }){
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        let response = await axios({
          method:'get',
          url:'/api/home',
          headers:{'Authorization': `Bearer ${token}`},
        }) 
        commit('setPosts', response.data)

      },
      async LogOut({commit}){
        let user = null
        commit('logout', user)
      },
      async LikePost(like){
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userLiked= vuex.auth.user;
        await axios({
          method:'post',
          url:'/api/home',
          data:{like,userLiked},
          headers:{Authorization: `Bearer ${token}`}
        })  
      }
      
};
const mutations = {
        setUser(state, username){
            state.user = username
        },
        setUserId(state, userId){
          state.userId = userId
        },
        setPosts(state, posts){
            state.posts = posts
        },
        setToken(state, token){
          state.token = token
        },
        logout(state){
            state.user = null
            state.posts = null
            state.token = null
        },
};
export default {
  state,
  getters,
  actions,
  mutations
};
