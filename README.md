### Vite创建项目
***
* 创建typescript项目
      
      npm create vite@latest project-name -- --template vue-ts

***
* 上传到github

      git branch -M main
      git remote add origin git@github.com:DragonLJH/my-vite-vue-ts-app.v.1.git
      git push -u origin main

***
* 添加 sass包、node-sass包 、 sass-loader包，需要分别添加，以及对应版本号

      npm i sass --save-dev
      
      npm i node-sass@6.0.1 --save-dev

      npm i sass-loader@10.2.1 --save-dev

***
* 添加 vue-router 路由

      npm install vue-router@4 --save-dev

***
* 添加类别名，让vite识别

      npm i @types/node -D

* vite.config.ts配置

      import path from 'path'

      resolve:{
            alias:{
                  "@":path.resolve(__dirname,"./src")
            }
      }




