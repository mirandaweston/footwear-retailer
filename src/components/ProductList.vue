<template>
  <h1 style="text-align: center">Footwear</h1>
  <p style="text-align: center">{{ filteredProducts.length }} styles found</p>
  <div class="container">
    <div class="filter-column">
      <h3 class="filter-heading">Filter</h3>
      <form>
        <label style="width: 100px">
          <input type="checkbox" v-model="showOnlyInStock" />
          In stock
        </label>
        <label style="width: 100px">
          <select id="brand-select" v-model="selectedBrand">
            <option value="">All brands</option>
            <option v-for="brand in brands" :value="brand">
              {{ brand }}
            </option>
          </select>
        </label>
      </form>
    </div>
    <div class="sort-column">
      <div class="sort-container">
        <label for="sort-select">Sort by:</label>
        <select id="sort-select" v-model="sortBy">
          <option value="relevance">Relevance</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
    <div class="grid">
      <Product
        v-for="(product, index) in filteredProducts"
        :key="index"
        :id="index"
        :name="product.name"
        :brand="product.brand"
        :price="'£' + product.price.toFixed(2)"
        :inStock="product.isAvailable"
        :image="product.image"
        v-show="!showOnlyInStock || (showOnlyInStock && product.isAvailable)"
      />
    </div>
  </div>
  <div>Powered by Hullabalook</div>
</template>

<script>
import Product from "./ProductGridItem.vue";

export default {
  name: "ProductList",
  components: {
    Product,
  },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      sortBy: "relevance",
      showOnlyInStock: false,
      selectedBrand: "",
    };
  },

  computed: {
    sortedProducts() {
      let sortedProducts = this.products.slice();
      if (this.sortBy === "price-low-to-high") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (this.sortBy === "price-high-to-low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (this.sortBy === "relevance") {
        sortedProducts.sort((a, b) => {
          if (a.isAvailable && !b.isAvailable) {
            return -1;
          } else if (!a.isAvailable && b.isAvailable) {
            return 1;
          } else {
            return a.rank - b.rank;
          }
        });
      }
      return sortedProducts;
    },
    filteredProducts() {
      let filteredProducts = this.sortedProducts;
      if (this.showOnlyInStock) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.isAvailable;
        });
      }
      if (this.selectedBrand) {
        filteredProducts = filteredProducts.filter((product) => {
          return product.brand === this.selectedBrand;
        });
      }
      return filteredProducts;
    },
    brands() {
      let brands = [];
      this.products.forEach((product) => {
        if (!brands.includes(product.brand)) {
          brands.push(product.brand);
        }
      });
      return brands;
    },
  },
};
</script>

<style scope>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.filter-column {
  width: 30%;
}

.sort-column {
  width: 65%;
}

.filter-heading {
  margin-bottom: 10px;
}

.sort-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
