const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


const isProduction = process.env.NODE_ENV === "PRODUCTION";

module.exports = {
    mode:isProduction ? "production" : "development",
    entry:"./src/app.js",
    output:{
        path:path.resolve(__dirname, "build"),
        filename:`[name].[chunkhash].js`
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
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'[contenthash].css'
        }),
        new HTMLWebpackPlugin({
        template:path.resolve(__dirname,"index.html"),
        meta:{
            description:"Introduce world-renowned software engineer GI",
            author:"gi"
        },
    })],
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