import axios from 'axios';
const state = {
    user: null,
    posts: null,
    token: null,
    userId: null,
    profil:null,
    isAdmin:null,
  };
  
const getters = {
    isAuthenticated(state){

      return !!state.token
    },
    isLogin: state => !!state.user, 
    StatePosts: state => state.posts,
    StateUser: state => state.user,
    StateProfil: state => state.profil,
    StateToken: state => state.token,
    StateUserId: state => state.userId,
    SateIsAdmin: state => state.isAdmin,
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
          const isAdmin = response.data.isAdmin;
          commit('setUserId', userId)
          commit('setIsAdmin', isAdmin)
          return commit('setToken', token)
        })
        await commit('setUser', User.get('username'))
      },
      async CreatePost({dispatch}, post) {
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userId = vuex.auth.userId;
        const formData = new FormData()
        formData.append('image', post.attachment)
        formData.append('content', post.content)
        await axios({
          method:'post',
          url:'/api/home',
          data:formData, userId,
          headers:{'Authorization': `Bearer ${token}` },
        })         
        await dispatch('GetPosts',token)
      },
      async CreateComment({dispatch}, post) {
        console.log(post)
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userId = vuex.auth.userId;
        const formData = new FormData();
        formData.append('content', post.content);
        formData.append('messageId', post.messageId);
        console.log(formData)
        await axios({
          method:'post',
          url:'/api/home',
          data:formData, userId,
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
      // async GetComments({ commit }){
      //   const vuex = JSON.parse(localStorage.getItem('vuex'));
      //   const token = vuex.auth.token;
      //   let response = await axios({
      //     method:'get',
      //     url:'/api/home',
      //     headers:{'Authorization': `Bearer ${token}`},
      //   }) 
      //   commit('setComments', response.data)

      // },
      async GetPostsById({ commit },username){
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        let response = await axios({
          method:'get',
          url:'/api/home',
          data: username,
          headers:{'Authorization': `Bearer ${token}`},
        }) 
        commit('setPosts', response.data)

      },
      async GetProfil({ commit }){
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        let response = await axios({
          method:'get',
          url:'/profil/:id',
          headers:{'Authorization': `Bearer ${token}`},
        }) 
        commit('setProfil', response.data)

      },
      async LogOut({commit}){
        let user = null
        commit('logout', user)
      },
      async LikePost({dispatch},sendLike){
        const vuex = JSON.parse(localStorage.getItem('vuex'));
        const token = vuex.auth.token;
        const userId= vuex.auth.userId;
        await axios({
          method:'post',
          url:'/api/home/:id/like',
          data:{sendLike, userId},
          headers:{Authorization: `Bearer ${token}`}
        })  
        await dispatch('GetPosts',token)
      }
      
};
const mutations = {
        setUser(state, username){
            state.user = username
        },
        setIsAdmin(state, isAdmin){
          state.isAdmin = isAdmin
      },
        setProfil(state, profil){
          state.profil = profil
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
