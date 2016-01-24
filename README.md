# Bee
变态的小蜜蜂

## Install
```
npm i tvrcgo/bee
```

## Usage
```js
var Bee = require('bee');

var bee = Bee({
    bid: 'i-xx',
    author: 'username',
    tag: 'i-xx-news'
});
```

### honey
```js
// Assign single.
bee.honey('title', 'hello bee!');

bee.honey('title', function(title){
    return 'hello bee!';
})

// Assign many.
bee.honey({
    title: data.mainTitle,
    originalUrl: data.url,
    category: function(cat){
        // process category.
        return cat;
    }
})
```

### honey extend
```js
// Feed honey extend.
bee.extend(url, {
    xtype: 'tags',
    list: 'headlines'
})
```

### flower
```js
// Feed flower.
bee.flower(url);
// Feed flower with data.
bee.flower(url, {
    topic: 'xxx'
})
// Feed flower with task.data .
bee.flower(url, bee.xflower(task));
// Feed flower with task.data and extends.
bee.flower(url, bee.xflower(task, {
    tags: 'xxx'
}))
```

### done
```js
// in worker.
.done(function(ctx){
    bee.done(task);
})
```

## License
MIT
