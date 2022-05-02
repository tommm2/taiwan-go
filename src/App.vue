<script setup>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import BackTop from "@/components/BackTop.vue";
import Modal from "@/components/Modal.vue";
</script>

<template>
  <div class="bg-white">
    <header>
      <Navbar />
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <Footer />
    </footer>
    <BackTop />
    <transition name="zoom">
      <Modal />
    </transition>
  </div>
</template>

<style>
.zoom-enter-active,
.zoom-leave-active {
  @apply duration-500 ease-in-out;
}

.zoom-enter-from,
.zoom-leave-to {
  @apply scale-0 opacity-10;
}
</style>
