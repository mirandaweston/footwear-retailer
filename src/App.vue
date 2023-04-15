<template>
  <div class="app">
    <ProductList :products="products" />
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import products from "./data/products.json";

export default {
  name: "App",
  components: {
    ProductList,
  },
  data() {
    return {
      products,
    };
  },
};
</script>

<style>
.app {
  max-width: 1024px;
  margin: 0 auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #606569;
}

.link {
  color: #3a7f71;
}
</style>
