## Post-Summary-AI
一个较通用的，生成网站内文章摘要，基于 TianliGPT 后端

> 该项目理论支持所有类型的网站，无论动态还是静态站，本项目在创作    [hexo-theme-solitude](https://github.com/wleelw/hexo-theme-solitude) 时诞生，主题已内置，欢迎大家使用。

## 演示效果
![Alt text](/demo/image.png)
![Alt text](/demo/image1.png)

## 快速上手
1. 引入CDN
    在 body 中引入 CDN链接：
    > tianliCDN: https://cdn1.tianli0.top/gh/wleelw/Post-Summary-AI@1.0.0/sco-post-ai.min.js
    
    > cdn.cbd: https://cdn.cbd.int/post-summary-ai@1.0.0/sco-post-ai.min.js

    > unpkg: https://unpkg.com/post-summary-ai@1.0.0/sco-post-ai.min.js
2. 查看当前网站的文章挂载ID
   文章内容的最外围的元素类名或者ID
   ![Alt text](/demo/image2.png)
   例如这里：evid 就是 `#article-container`
3. 设置scoConfig
    ```js
    const scoConfig = {
        key:'Qi7QIXLOrxLCyKBW0bie', # TianliGPT Key
        aiTag: 'ScoGPT', # 例如：ScoGPT、ChatGPT、GPT 4
        talk:'我是王卓Sco开发的摘要生成助理ScoGPT，ScoGPT在静态部署时进行摘要的撰写，并且在访客访问时通过ScoCorrection转译后的文本摘要实现工具。我在这里只负责已经生成的摘要显示，你无法与我直接沟通，但我可以回答一些预设的问题。', # 自我介绍
        tip:'此内容根据文章生成，并经过人工审核，仅用于文章内容的解释与总结', # 底部提示文字
        evid: '#article-container', # 挂在点
        report: '/', # 投诉地址
        pjax: true, # 是否开启pjax支持
    }
    ```

## 注意事项
若是动态网站（静态或服务端渲染网站无需注意此事项），文章内容需要通过后端接口获取后返回给前端展示的，不同的网站有各自的获取文章成功后的回调，请查阅自己网站系统的文档。

若网站开启了PJAX，可以将 pjax 设为 true

## TianliGPT KEY

使用前，tianliGPT的key请到 [爱发电](https://afdian.net/item/f18c2e08db4411eda2f25254001e7c00) 中购买，10元5万字符（常有优惠）。请求过的内容再次请求不会消耗key，可以无限期使用。

购买完成后，进入管理后台：summary.zhheo.com ，登录后点击右上角的“添加新网站”，输入密钥即可绑定成功。
若需要进行本地调试，请在管理后台将 127.0.0.1:端口 加入白名单，否则会触发防盗KEY，无法正常获取摘要。

## 部署预览
可以到 [hexo-theme-solitude](https://github.com/wleelw/hexo-theme-solitude) 查看

## 赞助我

非常感谢你的支持和赞赏！我非常欣赏你为爱发电的精神和对开发者的理解。我将继续用心开发和提供帮助，尽最大努力满足你的需求。如有任何其他问题或需求，请随时告诉我，我将尽力为你提供支持。谢谢！🙏

[@王卓Sco](https://afdian.net/a/wleelw0u0)

## 仓库统计

![Alt](https://repobeats.axiom.co/api/embed/5d60f1155c34aa0ace040ca2ffdb1a0b3b0ac208.svg "Repobeats analytics image")
