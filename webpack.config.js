module.exports = (env, options) => ({
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/') // added this
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  }
})