<template>
  <div class="product">
    <img :src="image" alt="Product Image" />
    <h3>{{ name }}</h3>
    <p>{{ brand }}</p>
    <p>{{ price }}</p>
    <p>{{ rank }}</p>
    <p v-if="inStock">In stock</p>
    <p v-else>Out of stock</p>
  </div>
</template>

<script>
export default {
  name: "Product",
  props: {
    id: Number,
    name: String,
    brand: String,
    price: Number,
    inStock: Boolean,
    image: String,
    rank: Number,
  },
};
</script>

<style scoped>
.product {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 250px;
  display: inline-block;
  vertical-align: top;
  text-align: center;
}

.product img {
  max-width: 100%;
}
</style>
