<template>
  <div class="container contact-form">
    <div class="contact-image">
      <router-link :to="{ name: 'Home' }">
        <img
          src="https://image.ibb.co/kUagtU/rocket_contact.png"
          alt="rocket_contact"
        />
      </router-link>
    </div>
    <form method="post" @submit.prevent="">
      <router-view></router-view>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
