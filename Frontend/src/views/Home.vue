<template>
  <div class="home-page">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Hero Section -->
    <Hero />

    <!-- Features Section -->
    <Features />

    <!-- Advantages Section -->
    <Advantages />

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- Footer Component -->
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import Advantages from '../components/Advantages.vue';
import Testimonials from '../components/Testimonials.vue';
import Footer from '../components/Footer.vue';
</script>

<style scoped>
/* Add any specific styles for the Home page here */
</style>
