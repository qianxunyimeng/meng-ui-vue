---
title: CountTo
lang: zh-CN
---

# CountTo
数字计数动画

## Basic 基础用法
:::demo

count-to/basic

:::

## Custom 自定义

:::demo

count-to/custom

:::


## Attributes 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|-------|--------|
| startVal | 计数开始时的数值  | Number |   | 0  |   
| endVal | 计数结束时的数值  | Number  |   | 0  | 
| duration | 动画持续时间 单位毫秒 | Number  |   | 3000  | 
| delay | 动画延时 单位毫秒 | Number  |   | 0  | 
| autoplay | 动画延时 单位毫秒 | Number  |   | 0  |   
| decimals | 保留小数点位数  | Number |   | 0  |   
| separator | 进位分隔符 2021显示为 2,021  | String  |   | ,  |   
| prefix | 前缀  | String |   |   |  
| suffix | 后缀  | String  |   |   |   

## Events 事件
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|-------|--------|
| callback | 计数动画结束回调  |  |   |  | 