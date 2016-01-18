'use strict';

/**
 * 变态的小蜜蜂
 * @param {object} opt
 */
function Bee(opt){
    if (!(this instanceof Bee)) {
        return new Bee(opt);
    }
    this.opt = opt || {};
    this.flower = [];
    this.extend = [];
    this.honey = {};
}

/**
 * 存数据
 * @param data
 * @param select
 */
Bee.prototype.store = function(data, select){
    var keys = select || ['title', 'originalUrl', 'keywords', 'summary', 'coverPic'];
    Object.keys(keys).forEach(function(key){
        this.honey[key] = data[key] || '';
    }.bind(this));
    return this;
}

/**
 * 扩展 honey
 * @param  {[string, object]}   key
 * @param  {function} fn
 */
Bee.prototype.honey = function(key, fn) {
    if (key && typeof key === 'object') {
        Object.keys(key).forEach(function(k){
            var tar = key[k];
            this.honey[k] = typeof tar === 'function' ? tar.call(this, this.honey[k]) : tar||'';
        }.bind(this));
        return this;
    }
    key = key || '_';
    this.honey[key] = typeof fn === 'function' ? fn.call(this, this.honey[key], function(data){
        this.honey[key] = data;
        return data;
    }.bind(this)) : fn||'';
    return this;
}

/**
 * 存 flower
 * @param  {string} url
 * @param  {object} data
 */
Bee.prototype.flower = function(url, data) {
    this.flower.push({
        url: url,
        data: data;
    });
    return this;
}

/**
 * 存 honey extend
 * @param  {string} url
 * @param  {object|array} data
 */
Bee.prototype.extend = function(url, data){
    this.extend.push({
        url: url,
        data: [].concat(data);
    })
    return this;
}

/**
 * 处理完成
 * @param  {object} task
 * @param  {object} ctx
 */
Bee.prototype.done = function(task, ctx){
    task.harvest = mix(this.opt, {
        // author, bid, tag
        flower: this.flower,
        honey: this.honey,
        extend: this.extend
    });
    return task.done(null, task);
}

/**
 * 解析 flower data
 * @param  {object} task
 * @param  {object} ext
 */
Bee.xflower = function(task, ext){
    var json = {};
    try {
        json = JSON.parse(task.data);
    } catch (e) {
        // console.error(e);
    }
    if (ext && typeof ext === 'object') {
        mix(json, ext);
    }
    return json;
}

/**
 * 合并对象
 * @return {object}
 */
function mix(){
    // mix objects.
}
