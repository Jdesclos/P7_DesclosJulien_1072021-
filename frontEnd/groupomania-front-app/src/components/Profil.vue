<template>
<div class="row py-5 px-4">
    <div class="col-xl-4 col-md-6 col-sm-10 mx-auto">

        <!-- Profile widget -->
        <div v-for="user in users" :key="user.id" class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 bg-dark">
                <div class="media align-items-end profile-header">
                    <div class="profile mr-3"><img :src="user.profilPicture" alt="..." width="130" class="rounded mb-2 img-thumbnail"><a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a></div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mt-0 mb-0">{{user.userName}}</h4>
                        <p class="small mb-4"> <i class="fa fa-map-marker mr-2"></i>{{user.userCity}}</p>
                    </div>
                </div>
            </div>
        <!-- Mettre en place un count des posts et des likes -->

            <!-- <div class="bg-light p-4 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">241</h5><small class="text-muted"> <i class="fa fa-picture-o mr-1"></i>Photos</small>
                    </li>
                    <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">84K</h5><small class="text-muted"> <i class="fa fa-user-circle-o mr-1"></i>Followers</small>
                    </li>
                </ul>
            </div> -->

            <div class="py-4 px-4">
                <div class="d-flex align-items-center justify-content-between mb-3">
                    <h5 class="mb-0">Posts recents</h5>
                </div>
                <div class="row">
                     <div v-for="post in Posts" :key="post.id" class="post_area">
                  <div  class="card gedf-card"  v-bind:id="post.id">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="mr-2">
                                    <img class="rounded-circle" width="45" src="/*infoUser.profil_Picture*/" alt="">
                                </div>
                                <div class="ml-2">
                                    <div class="h5 m-0">@{{post.userId}}<div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{post.updatedAt}}</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <img class="aside" :src="post.attachment"/>
                        <p class="card-text">{{post.content}}</p>
                    </div>
                    <div class="card-footer">
                        <button v-if="User == post.userLiked" type="submit" class="btn liked"  @click="addLike(post.id)" ><font-awesome-icon icon="thumbs-up" /></button>
                        <button v-if="User !== post.userLiked" type="submit" class="btn unliked"  @click="addLike(post.id)" ><font-awesome-icon :icon="['far','thumbs-up']" /></button>
                        <a href="#" @click="showComment" class="card-link"><i class="fa fa-comment"></i> Comment</a>
                    </div>
                  <div v-show="toggleComment">
                       <div class="form-group">
                                    <label class="sr-only" for="message">post</label>
                                    <textarea v-model="formComment.content" class="form-control" id="message" rows="3" placeholder="Réagir au commentaire">Réagir au commentaire</textarea>
                        </div>
                        <div class="btn-toolbar justify-content-between">
                            <div class="btn-group">
                                <button @click.stop="showComment" @click="submitComment(post.id)" type="submit" class="btn btn-primary">Partager</button>
                            </div>
                        </div>
                    </div>
                  </div>
                         <div  v-for="comment in post.comments" :key="comment.id" class="comment_space">
                    <div  class="comment-header">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="mr-2">
                                        <img class="rounded-circle" width="45" src="/*infoUser.profil_Picture*/" alt="">
                                    </div>
                                    <div class="ml-2">
                                        <div class="h5 m-0">@{{comment.userId}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="text-muted h7 mb-2"> <i class="fa fa-clock-o"></i>{{comment.updatedAt}}</div>
                            <p class="card-text">{{comment.content}}</p>
                        </div>
                  </div>
                </div>
            </div>
                </div>
        </div><!-- End profile widget -->

    </div>
</div>
</template>
<script>
import {  mapActions } from "vuex";
export default {
 created: function () {
    // a function to call getposts action
    this.GetProfil()
    this.GetPostsById()
  },
   methods: {
    ...mapActions(["getProfil", "updateProfil", "GetPostsById"]),
   }
}
</script>
<style scoped>

</style>