
# Worker Data Structure

小蜜蜂 Worker 字段信息。

## Honey
资讯主体。

#### 必填
- `title` 标题
- `originalUrl` 原文地址
- `coverPic` 封面图
- `pages` 正文内容
- `totalPage` 正文总页数
- `country` 国家
- `language` 语言
- `sourcePublishTime` 源站发布时间戳
- `belongSeed` 种子源URL
- `belongSite` 种子站点

#### 选填
- `articleFrom` 文章来源（作者）

## Extend
增量更新信息。

#### category
层级分类
```js
{
    xtype: 'category',
    categoryFirst: '一级分类名',
    categorySecond: '二级分类名'
}
```

#### tag
内容标签
```js
{
    xtype: 'tag',
    type: 'site|custom',
    tag: '标签名'
}
```

#### topic
专题信息
```js
{
    xtype: 'topic',
    topic: '专题名称',
    belongTopic: '归属专题名称'
}
```

#### relate
相关新闻
```js
{
    xtype: 'relate',
    originalUrl: '相关新闻源文URL'
}
```

#### publish
对应发布到 NAPI 列表
```js
{
    xtype: 'publish',
    list: 'headlines'
}
```

#### extra
其它信息
```js
{
    xtype: 'extra',
    isRelated: true // 是否被关联
}
```

&copy; Intlnews 2016
