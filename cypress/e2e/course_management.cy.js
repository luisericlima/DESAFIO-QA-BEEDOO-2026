/// <reference types="cypress" />

describe("Gerenciamento de Cursos", () => {
  let courseData;

  beforeEach(() => {
    cy.fixture("course.json").then((data) => {
      courseData = data.newCourse;
    });
    cy.visit("/");
  });

  it("Deve cadastrar um novo curso com sucesso usando fixture", () => {
    cy.contains("a", /CADASTRAR CURSO/i).click();

    const courseName = "Curso de Inteligência Artificial - " + Math.floor(Math.random() * 1000);

    cy.get("input").first().type(courseName);
    cy.get("textarea").type(courseData.description);
    cy.get("input").eq(1).type(courseData.instructor);
    cy.get("input").eq(2).type(courseData.imageUrl);
    cy.get("input[type='date']").eq(0).type(courseData.startDate);
    cy.get("input[type='date']").eq(1).type(courseData.endDate);
    cy.get("input[type='number']").type(courseData.vacancies);

    cy.contains("Tipo de curso").click();
    cy.get(".q-item, .q-virtual-scroll__content div").first().click({force: true});

    cy.contains("button", /CADASTRAR CURSO/i).click();

    cy.contains("a", /LISTAR CURSOS/i).click();
    cy.contains(courseName).should("exist");
  });

  it("Deve exibir a lista de cursos", () => {
    cy.contains("a", /LISTAR CURSOS/i).click();
    cy.url().should("include", "/");
    cy.contains(/Lista de cursos/i).should("be.visible");
  });
});