import Product from "../src/components/ProductGridItem";

describe("Product Component", () => {
  const props = {
    id: 1,
    name: "Test Product",
    brand: "Test Brand",
    price: 100,
    inStock: true,
    image: "test-image.png",
    rank: 5,
  };

  beforeEach(() => {
    cy.mount(Product, { props });
  });

  it("displays the product name", () => {
    cy.contains("Test Product").should("be.visible");
  });

  it("displays the product brand", () => {
    cy.contains("Test Brand").should("be.visible");
  });

  it("displays the product price", () => {
    cy.contains("100").should("be.visible");
  });

  it("displays the product rank", () => {
    cy.contains("5").should("be.visible");
  });

  it("displays 'In stock' if the product is in stock", () => {
    cy.contains("In stock").should("be.visible");
  });

  it("displays 'Out of stock' if the product is out of stock", () => {
    cy.mount(Product, { props: { ...props, inStock: false } });
    cy.contains("Out of stock").should("be.visible");
  });

  it("displays the product image", () => {
    cy.get(".product img").should("have.attr", "src", "test-image.png");
  });
});
