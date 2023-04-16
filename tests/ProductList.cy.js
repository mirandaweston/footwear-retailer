import ProductList from "../src/components/ProductList";

describe("ProductList", () => {
  let props;

  beforeEach(() => {
    props = {
      products: [
        {
          id: 1,
          name: "Product 1",
          brand: "Brand 1",
          price: 10.99,
          isAvailable: true,
          image: "image1.png",
          rank: 3,
        },
        {
          id: 2,
          name: "Product 2",
          brand: "Brand 2",
          price: 5.99,
          isAvailable: false,
          image: "image2.png",
          rank: 1,
        },
        {
          id: 3,
          name: "Product 3",
          brand: "Brand 1",
          price: 20.99,
          isAvailable: true,
          image: "image3.png",
          rank: 4,
        },
      ],
    };

    cy.mount(ProductList, { props });
  });

  it("displays all products", () => {
    cy.get(".grid").children().should("contain", "Product 1");
    cy.get(".grid").children().should("contain", "Product 2");
    cy.get(".grid").children().should("contain", "Product 3");
    cy.get(".grid").children().should("have.length", 3);
  });

  it("filters to show only available products", () => {
    cy.get('input[type="checkbox"]').click();

    cy.get(".grid").children().should("contain", "Product 1");
    cy.get(".grid").children().should("contain", "Product 3");
    cy.get(".grid").children().should("have.length", 2);
  });

  it("filters products by brand", () => {
    cy.get("#brand-select").select("Brand 1");

    cy.get(".grid")
      .children()
      .should("have.length", 2)
      .each(($el) => {
        cy.wrap($el).contains("Brand 1");
      });
  });

  it("displays counter for number of resulting products", () => {
    cy.get("p").contains("3 styles found").should("exist");
  });

  it("sorts products into ascending price order", () => {
    cy.get("#sort-select").select("Price: Low to High", { force: true });

    cy.get(".grid").children().first().should("contain", "Product 2");

    cy.get(".grid").children().last().should("contain", "Product 3");
  });

  it("sorts products into descending price order", () => {
    cy.get("#sort-select").select("Price: High to Low", { force: true });

    cy.get(".grid").children().first().should("contain", "Product 3");

    cy.get(".grid").children().last().should("contain", "Product 2");
  });

  it("sorts products by relevance", () => {
    cy.get("#sort-select").select("Relevance", { force: true });

    cy.get(".grid").children().first().should("contain", "Product 1");

    cy.get(".grid").children().last().should("contain", "Product 2");
  });

  it("contains branding statement", () => {
    cy.get("div").should("contain", "Powered by Hullabalook");
  });
});
