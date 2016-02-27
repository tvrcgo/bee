# Bee
变态的小蜜蜂

简化 worker 脚本开发

## Install
```
npm i tvrcgo/bee
```

## Usage
实例化 bee 对象
```js
var Bee = require('bee');

var bee = Bee(task, {
    tag: 'xxx',
    author: 'username'
});
```

### honey
保存 honey
```js
// 单个值.
bee.honey('title', 'hello bee!');
bee.honey('title', function(title){
    return 'hello bee!';
})

// 多个值的对象.
bee.honey({
    title: data.title,
    originalUrl: data.url,
    coverPic: function(picUrl){
        // process picUrl.
        return picUrl;
    }
})
```

### honey extend
保存 honey extend
```js
// 保存 extend 信息
bee.extend(url, {
    seedName: 'bhaskar-politics'
})
```

### flower
保存 flower
```js
// 保存 flower.
bee.flower(url);
// 保存 flower 并附带信息.
bee.flower(url, {
    topic: 'xxx'
})

// flower data.
bee.data;
// 把当前任务的 data 通过 flower 往下传递
bee.flower(url, _.extend({
    topic: 'xxx'
}, bee.data))
```

### harvest
保存一个 harvest，适用于一次需要返回多个 harvest 的情况。
```js
bee.harvest({
    url: 'harvest url' // 为每个 harvest 单独设置 url。[可选]
});
```

### done
任务完成
```js
.done(function(ctx){
    bee.done();
})
```

## License
MIT
