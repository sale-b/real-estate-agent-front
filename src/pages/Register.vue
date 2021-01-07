<template>
  <div v-if="!userId" class="content">
    <div class="md-layout">
       <div class="md-layout-item md-medium-size-100 md-size-50">
        <login-form data-background-color="green"> </login-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-50">
        <register-form data-background-color="green"> </register-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
      </div>
    </div>
  </div>
</template>

<script>
import { RegisterForm, LoginForm } from "@/pages";
import { mapGetters } from "vuex";

export default {
  components: {
    RegisterForm,
    LoginForm
  },
  computed: mapGetters(['userId']), 
  created(){
    if(this.userId != null)
     this.$router.push( "user" );
  }
};
</script>
