const { deepStrictEqual, ok } = require("assert");
const database = require("./database");
//const { listar } = require("./database");

const DEFAULT_ITEM_CADASTRAR = {
  nome: "Flash",
  poder: "Speed",
  id: 1,
};
const DEFAULT_ITEM_ATUALIZAR = {
  nome: "Batman",
  poder: "Rich",
  id: 2,
};

describe("Suite de manipulacao de herois", () => {
  before(async () => {
    await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    await database.cadastrar(DEFAULT_ITEM_ATUALIZAR);
  });

  it("deve pesquisar um heroi usando arquivo!", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const [resultado] = await database.listar(expected.id);

    deepStrictEqual(resultado, expected);
  });
  it("deve cadastrar um heroi usando arquivo!", async () => {
    const expected = DEFAULT_ITEM_CADASTRAR;
    const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR);
    const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id);

    deepStrictEqual(actual, expected);
  });
  it("deve remover um heroi por id!", async () => {
    const expected = true;
    const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id);
    deepStrictEqual(resultado, expected);
  });
  it("deve atualizar um heroi pelo id!", async () => {
    const expected = {
      ...DEFAULT_ITEM_ATUALIZAR,
      nome: "green lantern",
      poder: "power ring",
    };
    const novoDado = {
      nome: "green lantern",
      poder: "power ring",
    };
    await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado);
    const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id);
    deepStrictEqual(resultado, expected);
  });
});
