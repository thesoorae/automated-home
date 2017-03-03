

module.exports = {
  entry: "./main.js",
  output: {
  	filename: "./js/bundle.js"
  },

 devtool: 'source-maps',
 resolve: {
   extensions: ["", ".js", ".jsx" ]
 }
};
