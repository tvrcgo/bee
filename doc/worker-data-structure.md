
# Worker Data Structure

小蜜蜂 Worker 字段信息。

## Honey
资讯主体。

#### 必填
- `title` 标题
- `originalUrl` 原文地址
- `language` 语言
- `country` 国家
- `city` 城市
- `coverPic` 封面图
- `pages` 正文内容
- `totalPage` 正文总页数
- `sourcePublishTime` 源站发布时间戳
- `belongSite` 种子站点

#### 选填
- `articleFrom` 文章来源（作者）

## Flower
```js
[{
    url: 'http://example.com',
    data: {
        // 自定义
    }
}]
```

## Extend
增量信息。

```js
[{
    url: 'http://example.com/story/123',
    data: [{
        seedName: 'bhaskar-politics' // 种子名称
    }]
}]
```

&copy; Intlnews 2016
