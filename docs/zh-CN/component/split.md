---
title: Zoom
lang: zh-CN
---

# Split
split 可以拖拽改变上下高度比，左右宽度比

## horizontal 水平划分
:::demo

 split/horizontal

:::

## vertical 垂直划分
:::demo

 split/vertical

:::

##  mixture 混合布局
:::demo

 split/mixture

:::

## Attributes 属性
| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|-------|--------|
| value | 分隔面板初始位置,支持Number和String两种类型的数据。Number类型范围[0,1] 表示比例，String类型表示具体的像素值，例如'400px' | Number/String,在Vue3版本中的写法 v-model:value.sync |   | 0.5 |   
| mode | 水平布局或垂直布局  | String  |  vertical | horizontal  | 
| split | 分隔面板是否可滑动 | Boolean  |   | true  | 
| min | 左面板 或 上面板 最小阈值 支持 '40px' 或 0.4的写法| Number/String  |   | 40px  | 
| max | 右面板 或 下面板 最小阈值 支持 '40px' 或 0.4的写法| Number/String  |   | 40px  |  



