'use strict';

/**
 * 变态的小蜜蜂
 * @param {object} task
 * @param {object} options
 */
function Bee(task, opt){
    if (!(this instanceof Bee)) {
        return new Bee(task, opt);
    }
    // options
    this.opt = opt || {};
    // init task
    this.t = {
        flower: [],
        extend: [],
        honey: {},
        harvest: []
    };
    // process task data
    this.task = task;
    this.data = parse(task.data);
    this.data.options = this.data.options || parse(task.options);
}

/**
 * 存 honey 信息
 * @param  {string|object}   key
 * @param  {function} fn
 */
Bee.prototype.honey = function(key, fn) {
    if (key && typeof key === 'object') {
        Object.keys(key).forEach(function(k){
            var tar = key[k];
            this.t.honey[k] = typeof tar === 'function' ? tar.call(this, this.t.honey[k]) : tar;
        }.bind(this));
        return this;
    }
    this.t.honey[key] = typeof fn === 'function' ? fn.call(this, this.t.honey[key], function(data){
        this.t.honey[key] = data;
        return data;
    }.bind(this)) : fn;
    return this;
}

/**
 * 存 flower 信息
 * @param  {string|array} url
 * @param  {object} data
 */
Bee.prototype.flower = function(url, data) {
    data = data || {};
    // task.options 通过 flower 往下传
    data.options = this.data.options;
    var urls = [].concat(url);
    urls.forEach(function(url){
        this.t.flower.push({
            url: url,
            data: data;
        });
    }.bind(this))
    return this;
}

/**
 * 存 honey extend 信息
 * @param  {string|array} url
 * @param  {object|array} data
 */
Bee.prototype.extend = function(url, data){
    var urls = [].concat(url);
    urls.forEach(function(url){
        this.t.extend.push({
            url: url,
            data: [].concat(data);
        })
    }.bind(this))
    return this;
}

/**
 * 将 harvest 信息保存并重置，目的是可添加多个 harvest
 * @param {object} opts
 */
Bee.prototype.harvest = function(opts) {
    this.t.harvest.push(mix({
        honey: this.t.honey,
        flower: this.t.flower,
        extend: this.t.extend
    }, opts||{}));
    this.t.honey = {};
    this.t.flower = [];
    this.t.extend = [];
    return this;
}

/**
 * 处理完成
 */
Bee.prototype.done = function(ctx){
    if (this.t.harvest.length) {
        this.task.harvest = this.t.harvest.map(function(harv){
            return mix({}, this.opt, harv);
        }.bind(this));
    }
    else {
        this.task.harvest = mix({}, this.opt, {
            flower: this.t.flower,
            honey: this.t.honey,
            extend: this.t.extend
        });
    }
    return this.task.done(null, this.task);
}

/**
 * JSON.parse
 * @param  {object} body
 */
function parse(body){
    if (body && typeof body === 'object') {
        return body;
    }
    var json = {};
    try {
        json = JSON.parse(body);
    } catch (e) {
        // console.error(e);
    }
    // fix body === '""'
    if (typeof json === 'string') {
        return {};
    }
    return json;
}

/**
 * 合并对象
 * @return {object}
 */
function mix(){
    var args = Array.prototype.slice.call(arguments);
    var base = args[0] || {};
    for (var i=1; i<args.length; i++) {
        if (Object.assign) {
            Object.assign(base, args[i]);
        }
        else {
            var tar = args[i];
            Object.keys(tar).forEach(function(k){
                base[k] = tar[k];
            });
        }
    }
    return base;
}

/**
 * 是否为数组
 * @param  {*}  obj
 * @return {Boolean}
 */
function isArray(obj) {
    return ojb && '[object Array]' === toString.call(obj);
}
