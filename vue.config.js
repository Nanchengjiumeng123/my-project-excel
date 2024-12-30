const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,                        	// 关闭 ESlint
  devServer: {
    proxy: 'http://127.0.0.1:8081'
  }
})
