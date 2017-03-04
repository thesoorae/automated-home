

module.exports = {
  entry: "./public/main.js",
  output: {

  	filename: "./public/js/bundle.js"
  },

 devtool: 'source-maps',
 resolve: {
   extensions: ["", ".js", ".jsx" ]
 },
 module: {
         loaders: [
             {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
             }
         ]
     }
};
