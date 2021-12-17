---
title: Zoom
lang: zh-CN
---

# Zoom 变焦

zoom 提供两种放大方式，场内变焦和场外变焦

## Basic 基础用法

:::demo

zoom/basic

:::

## Attributes 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|-------|--------|
| url | 需要被放大的图片地址  | String |   |   |   
| high-url | 高清图地址,用于放大使用,如果不设置，默认使用url  | String  |   |   | 
| selector-width | 选择器的宽度  | Number  |   | 148  | 
| selector-height | 选择器的高度,如果不设置或```<0``` 和 selector-width保持一致 | Number  |   | -1  |   
| zoom-type | 选择器类型  | String | circle  | square  |   
| zoomer-style | 内部放大区域样式  | Object  |   | {}  |   
| out-zoomer-style | 外部放大区域样式  | Object |   | {}  |  
| scale | 放大倍数  | Number  |   | 1.5  |   
| outZoomer | 是否使用外部放大镜  | Boolean  |   | false  |   
| disabled | 是否禁止使用放大镜(当成普通图片展示,等同`img`)  | Boolean  |   | false  |   
| selector | 是否显示选择器   | Boolean  |   | true  |  

## Events 事件
| 事件 | 说明 | 参数 | 
|------|------|-----|
| zoomClick | 点击事件  |  |  