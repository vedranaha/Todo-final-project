
 <template>
  <div>
      <h1>Auth vue</h1>
      
         <form @submit.prevent="signIn">
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="form.email"
        />
        <input
          class="inputField"
          type="password"
          placeholder="Your Password"
          v-model="form.password"
        />
        <button type="submit">Sign In</button>
      </form>
        Don't have an account? 
        <router-link to="/">Sign Up</router-link>
   
    </div>
</template>

<script setup>
    import {ref} from 'vue'
    const form = ref({
      email: '',
      password: ''
    })
</script>

<style>
</style>
