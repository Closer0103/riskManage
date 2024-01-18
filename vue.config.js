const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
        port:5173,
        proxy:{
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true, 
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },
})
