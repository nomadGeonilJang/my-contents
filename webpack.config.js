const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isProduction = process.env.NODE_ENV === "PRODUCTION";

module.exports = {
    mode:isProduction ? "production" : "development",
    entry:"./src/app.js",
    output:{
        path:path.resolve(__dirname, "build"),
        filename:`[name].[chunkhash].js`,
    },
    module:{
        rules:[
            {
                test:/\.css/i,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader // style-loader를 대체 한다.
                    },
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    }
                ]
            },
            {
                test:/\.(png|jep?g|gif)$/i,
                use:[{
                    loader:'file-loader',
                    options:{
                        name(){ //함수를 사용해서 개발환경에서 어떤 위지에 있는지 확인할 수 있도록 분기 처리 한다.
                            if(!isProduction){
                                return `[path][name].[ext]`
                            }
                            return `[contenthash].[ext]`
                        },
                        publicPath:'assets/', // [publicPatch]/hello.png 이런식이 된다
                        outputPath:'assets/' //실제 생성 경로 // 폴더 구조가 하나 더 생긴
                    }
                }]
            }
        ]
    },
    plugins:[
        new CopyPlugin({
            patterns: [
              { from: "src/assets", to: "assets" },
              { from: "favicon.ico", to: "favicon.ico" },
              { from: "src/css", to: "css" }
            ],
        }),
        new MiniCssExtractPlugin({
            filename:'[contenthash].css'
        }),
        new HTMLWebpackPlugin({
        template:path.resolve(__dirname,"index.html"),
        meta:{
            description:"Introduce world-renowned software engineer GI",
            author:"gi"
        },
        }),
        new CleanWebpackPlugin()

    ],
    devServer:{
        open:true, //실행시 자동으로 오픈
        overlay:true, //에러 발생시 페이지에 나오게
        //historyApiFallback:true //접근 경로를 파악하여 특정페이지로 이동 시킬 수 있다. spa -> index.html
        // historyApiFallback:{
        //     rewrites:[
        //         {from:/^\/subpage$/,to:'sub.html'},
        //         {from:/./,to:'404.html'}
        //     ]
        // },
        port:3005
    }

}