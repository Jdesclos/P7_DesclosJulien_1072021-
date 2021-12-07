<template>
<div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div v-if="User" class="card-body">
                        <div class="h5">@{{User}}</div>
                        <!-- <div class="h7">{{infoUser.bio}} -->
                        <!-- </div> -->
                    </div>
                    <!-- <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="h6 text-muted">Followers</div>
                            <div class="h5">5.2342</div>
                        </li>
                        <li class="list-group-item">
                            <div class="h6 text-muted">Following</div>
                            <div class="h5">6758</div>
                        </li>
                        <li class="list-group-item">Vestibulum at eros</li>
                    </ul> -->
                </div>
            </div>
            <div class="col-md-6 gedf-main">

                <!--- \\\\\\\Post-->
                <form @submit.prevent="submit" class="posts card gedf-card">
                    <div class="card-header">
                        <ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li  class="nav-item">
                                <a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts"  aria-selected="true">Ecrivez une publication</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a>
                            </li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea v-model="form.content" class="form-control" id="message" rows="3" placeholder="Ecrivez ce qui vous passe par la tête"></textarea>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab">
                                <div class="form-group">
                                    <div class="custom-file">
                                        <input  type="file" class="custom-file-input" id="customFile">
                                        <label class="custom-file-label" for="customFile">Upload image</label>
                                    </div>
                                </div>
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary">Partager</button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- Post /////-->

                <!--- \\\\\\\Post-->
                <div v-for="post in Posts" :key="post.id" class="post_area">
                  <div  class="card gedf-card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="/*infoUser.profil_Picture*/" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">@{{post.username}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{post.updatedAt}}</div>
                        <p class="card-text">{{post.content}}</p>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn" v-text="text" v-bind:class="{'btn-unlike': ! liked, 'btn-like': liked}" @click=" toggleLike" v-bind:disabled="submitted">Like</button>
                        <a href="#" @click="showComment" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                    </div>
                  </div>
                  <div v-show="toggleComment">
                       <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea v-model="form.content" class="form-control" id="message" rows="3" placeholder="Réagir au commentaire"></textarea>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button @click.stop="showComment" type="submit" class="btn btn-primary">Partager</button>
                            </div>
                        </div>
                  </div>
                  <div v-for="comment in comments" :key="comment.id" class="comment_space">
                    <div v-if="post.messageId == post.id" class="comment-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="mr-2">
                                        <img class="rounded-circle" width="45" src="/*infoUser.profil_Picture*/" alt="">
                                    </div>
                                    <div class="ml-2">
                                        <div class="h5 m-0">@{{post.username}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{post.updatedAt}}</div>
                            <p class="card-text">{{post.content}}</p>
                        </div>
                        <div class="card-footer">
                            <a href="#" class="card-link"><i class="fa fa-gittip"></i> Like</a>
                        </div>
                  </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card gedf-card">
                    <div class="card-body">
                        <h5 class="card-title">Nouvelles</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Votre réseau social d'entreprise est là</h6>
                        <p class="card-text">Amusez vous à poster des messages sur votre tout nouveau réseau social dans l'entreprise</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: 'Posts',
  components: {
    
  },
  data() {
    return {
        toggleComment: false,
        likeData:{
            like:0,
            userId:'',//qui like le message
            id:'' //id du message
        },
      form: {
        attachement: '',
        content: '',
      }
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPosts()
  },
  computed: {
    ...mapGetters({Posts: "StatePosts", User: "StateUser", Token:"StateToken"}),
  },
  methods: {
    ...mapActions(["CreatePost", "GetPosts"]),
    async submit() {
      try {
        await this.CreatePost(this.form)
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
    },
    showComment(){
        if(!this.toggleComment){
            this.toggleComment = true
            return this.toggleComment

        }else {
            return this.toggleComment = false
        }
    },
    toggleLike(){
        if(this.liked) {
            this.unlikePhoto()
        } else {
            this.likePhoto()
    }},
    likePost(){
        this.submitted = true;
        this.like = 1;
        this.userId=''
    }
},
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
button[type=submit]:hover {
  background-color: #45a049;
}
input {
  width:60%;
  margin: 15px;
  border: 0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  padding:10px;
  border-radius:30px;
}
textarea {
  width:75%;
  resize: vertical;
  padding:15px;
  border-radius:15px;
  border:0;
  box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
  height:150px;
  margin: 15px;
}
ul {
  list-style: none;
}
#post-div {
  border: 3px solid #000;
  width: 500px;
  margin: auto;
  margin-bottom: 5px;;
}
</style>
