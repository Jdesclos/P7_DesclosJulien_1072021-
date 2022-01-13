<template>
<div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div v-if="Profile" class="profile-img">
                            <img :src="Profile.profilePicture" alt=""/>
                            <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        {{Profile.username}}
                                    </h5>
                                    <h6>
                                        {{Profile.profession}}
                                    </h6>
                                    
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Bio</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                    <!-- <div class="col-md-12">
                        <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="user-tab">
                            <div class="form-group">
                                 <label class="sr-only" for="user">Username</label>
                                <input v-model="form.username" type="username" class="form-control" id="username" rows="3" placeholder="Ecrivez votre nouveau username">
                            </div>
                        </div>
                        <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="user-tab">
                            <div class="form-group">
                                 <label class="sr-only" for="user">Email</label>
                                <input v-model="form.email" type="email" class="form-control" id="email" rows="3" placeholder="Ecrivez votre nouvel email">
                            </div>
                        </div>
                        <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="user-tab">
                            <div class="form-group">
                                 <label class="sr-only" for="user">Mot de pass</label>
                                <input v-model="form.password" type="password" class="form-control" id="password" rows="3" placeholder="Ecrivez votre nouveau mot de pass">
                            </div>
                        </div>
                        <div class="tab-pane fade show active"  role="tabpanel" aria-labelledby="user-tab">
                            <div class="form-group">
                                 <label class="sr-only" for="user">Profession</label>
                                <textarea v-model="form.profession" class="form-control" id="message" rows="3" placeholder="Ecrivez votre nouvelle profession"></textarea>
                            </div>
                        </div>
                        <div class="tab-pane fade show active" role="tabpanel" aria-labelledby="user-tab">
                            <div class="form-group">
                                 <label class="sr-only" for="message">Bio</label>
                                <textarea v-model="form.bio" class="form-control" id="bio" rows="3" :placeholder="`${Profile.bio}`"></textarea>
                            </div>
                        </div>
                        <button type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div> -->
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>WORK LINK</p>
                            <a href="">Website Link</a><br/>
                            <a href="">Bootsnipp Profile</a><br/>
                            <a href="">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">WordPress</a><br/>
                            <a href="">WooCommerce</a><br/>
                            <a href="">PHP, .Net</a><br/>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Username</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{Profile.username}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{Profile.email}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Web Developer and Designer</p>
                                            </div>
                                        </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                        <p>{{Profile.bio}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
</template>
<script>
import {  mapActions } from "vuex";
import {  mapGetters } from "vuex";
export default {
    name: 'users',
  components: {
    
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        profession:'',
        bio:'',
      },
    };
},
 created: function () {
    // a function to call getposts action
    this.GetProfile(this.$route.query.id);
  },
  computed: {
    ...mapGetters({Profile: "StateProfile"}),
  },
   methods: {
    ...mapActions(["GetProfile", "updateProfile", "GetPostsById"]),
   }
}
</script>
<style scoped>
body{
    background: -webkit-linear-gradient(left, #3931af, #00c6ff);
}
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>