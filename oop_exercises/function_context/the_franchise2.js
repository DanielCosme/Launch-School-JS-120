// The method franchise.allMovies is supposed to return the following array:

[
  'How to Train Your Dragon 1',
  'How to Train Your Dragon 2',
  'How to Train Your Dragon 3'
]

// Explain why this method will not return the desired object? Try fixing this problem by taking advantage of JavaScript lexical scoping rules.

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map((number) => {
      return this.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());

