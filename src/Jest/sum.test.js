const ay = require('./sum');

test("test sum", () => {
  return ay().then(data => {
    expect(data).toBe(1);
  })
});