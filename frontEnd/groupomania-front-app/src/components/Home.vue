<template>
<div class="container-fluid gedf-wrapper">
        <div class="row">
            <div class="col-md-3">
                <div class="card">
                    <div v-if="User" class="card-body">
                        <div class="h5 d-flex"><p class="mr-2">Bonjour</p><a @click="goToProfil(User)">@{{User}}</a></div>
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
                                        <input type="file" name="image" @change="handleFileUpload( $event )"/>
                                    </div>
                                </div>
                                <div class="py-4"></div>
                            </div>
                        </div>
                        <div class=" justify-content-arround">
                            <div class="btn-group">
                                <button type="submit" class="btn btn-primary">Partager</button>
                            </div>
                        </div>
                    </div>
                </form>
                <!-- Post /////-->
                <h2  class="titleSeparate">Récemment Publiés</h2>
                <!--- \\\\\\\Post-->
                <div v-for="post in Posts" :key="post.id" class="post_area mb-5">
                  <div  class="card gedf-card"  v-bind:id="post.id">
                    <div class="d-flex  align-items-center card-header">
                                    <img class="rounded-circle mr-2" width="45" :src="post.profilePicture" alt="">
                                    <div class="h5 m-0 ">@{{post.username}}</div>
                                    <div class="text-muted ml-auto h7"><font-awesome-icon :icon="['far', 'clock']" />{{post.updatedAt | formatDate}}</div>
                    </div>
                    <div class="card-body">
                        <img v-if="post.attachment !== ''" class="aside img-responsive mb-4 w-100 h-auto" :src="post.attachment"/>
                        <p class="card-text">{{post.content}}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <button  type="submit" class="btn liked p-2"  @click="addLike(post.id)" ><font-awesome-icon v-if="post.userLiked.includes(UserId)"  icon="thumbs-up" /><font-awesome-icon v-if="!post.userLiked.includes(UserId)" :icon="['far','thumbs-up']" /></button>
                        <p class="p2 m-0" v-if="post.likes != 0 && post.likes !== null">Personnes ayant aimés ce post: {{post.likes}}</p>
                        
                    </div>
                  <div class="d-flex align-items-center">
                       <div class="form-group flex-1 mt-3" id="comments" aria-labelledby="comments-tab">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea v-model="formComment.content" class="form-control form-comment m-0" id="comment" rows="8" placeholder="Réagir au post">Réagir au au post</textarea>
                        </div>
                        <div class=" justify-content-arround m-3">
                            <div class="btn-group">
                                <button  @click="submitComment(post.id)" type="submit" class="btn btn-primary">Partager</button>
                            </div>
                        </div>
                    </div>
                  </div>
                         <div  v-for="comment in post.comments" :key="comment.id" class="card comment_space">
                    <div  class="comment-header card-header d-flex align-items-center">
                                        <img class="rounded-circle mr-2" width="45" :src="comment.profilePicture" alt="">
                                        <div class="h5 m-0">@{{comment.username}}</div>
                                        <div class=" ml-auto text-muted h7"> <font-awesome-icon :icon="['far', 'clock']" />{{comment.updatedAt | formatDate}}</div>
                        </div>
                        <div class="card-body">
                            <p class="card-text">{{comment.content}}</p>
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
        datePost:'',
        sendLike: {
          id:0
        },
      form: {
        attachment: '',
        content: '',
      },
      formComment: {
        content: '',
      }
    };
  },
  created: function () {
    // a function to call getposts action
    this.GetPosts()
  },
  computed: {
    ...mapGetters({Posts: "StatePosts", User: "StateUser", Token:"StateToken", Comments:"StateComments", UserId: "StateUserId"}),
  },
  methods: {
    ...mapActions(["CreatePost", "GetPosts","CreateComment","LikePost"]),
    handleFileUpload( event ){
      this.form.attachment = event.target.files[0];
    },
    async submit() {
      try {
        await this.CreatePost(this.form)
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }
      this.form.content ="";
    },
    async submitComment(id) {  
      try {
          this.formComment.messageId = id;
        await this.CreateComment(this.formComment)
      } catch (error) {
        throw "Sorry you can't make a post now!"
      }

    },
    async addLike(id){
      try {
          this.sendLike.id= id;
        await this.LikePost(this.sendLike)
      } catch (error) {
        throw `${error}`
      }
    },
    goToProfil(User){
      this.$router.push({name:`/profil/${User}`})
    }
},
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
.flex-1{
  flex:1;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
.liked i{

  color: green;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
}
.unliked i{

  color: grey;
  padding: 12px 20px;
  cursor: pointer;
  border-radius:30px;
  margin: 10px;
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
.form-comment{
  width: 90%;
  height: 70px;
  vertical-align: middle !important;
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
.titleSeparate{
  margin: 20px 0px;
}
.comment_space{
  border-top:0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.aside{
  object-fit: cover;
}
.card-footer{
  border-bottom: 1px solid rgba(0,0,0,.125);
}
</style>
