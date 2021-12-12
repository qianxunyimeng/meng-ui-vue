<script setup lang="ts">
import { computed, ref } from 'vue'
import { hyphenate } from '@vue/shared'
import clipboardCopy from 'clipboard-copy'
import { ElMessage } from 'element-plus'
import * as Icons from '@element-plus/icons'
import { useLang } from '../../composables/lang'
import localeData from '../../../i18n/component/icons.json'

const lang = useLang()
const locale = computed(() => localeData[lang.value])
const copyIcon = ref(true)

const copyContent = async (content) => {
  try {
    await clipboardCopy(content)

    ElMessage({
      showClose: true,
      message: locale.value['copy-success'],
      type: 'success',
    })
  } catch (e) {
    ElMessage({
      showClose: true,
      message: locale.value['copy-error'],
      type: 'error',
    })
  }
}

const copySvgIcon = async (name, refs) => {
  if (copyIcon.value) {
    await copyContent(`<el-icon><${hyphenate(name)} /></el-icon>`)
  } else {
    const content = refs[name].querySelector('svg')?.outerHTML ?? ''
    await copyContent(content)
  }
}

const copyfontIcon = async (name) => {
  await copyContent(`<mx-icon name="${name}"/>`)
}

</script>

<template>
  <!-- <div style="text-align: right">
    <el-switch
      v-model="copyIcon"
      active-text="Copy icon code"
      inactive-text="Copy SVG content"
    >
    </el-switch>
  </div> -->
  <ul class="demo-icon-list">
    <!-- <li
      v-for="component in Icons"
      :key="component"
      :ref="component.name"
      class="icon-item"
      @click="copySvgIcon(component.name, $refs)"
    >
      <span class="demo-svg-icon">
        <ElIcon :size="20">
          <component :is="component" />
        </ElIcon>
        <span class="icon-name">{{ component.name }}</span>
      </span>
    </li> -->
    <li v-for="name in $icon" :key="name" class="icon-item" @click="copyfontIcon(name)">
    <span class="demo-svg-icon">
      <i :class="'mx-icon-' + name"></i>
      <span class="icon-name">{{'mx-icon-' + name}}</span>
    </span>
  </li>
  </ul>
</template>

<style scoped lang="scss">
.demo-icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color-base);
  border-left: 1px solid var(--el-border-color-base);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  font-size: 14px;

  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    font-size: 14px;//13px
    border-right: 1px solid var(--el-border-color-base);
    border-bottom: 1px solid var(--el-border-color-base);
    transition: background-color var(--el-transition-duration);
    &:hover {
      background-color: var(--el-border-color-extra-light);
      [class^="mx-icon-"] {
        color: var(--brand-color-light);
      }
      color: var(--brand-color-light);
    }

  //   &:hover {
  //   span,
  //   i {
  //     color: rgb(92, 182, 255);
  //   }
  // }

    .demo-svg-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      cursor: pointer;

      i {
        display: block;
        font-size: 24px;
        //margin-bottom: 15px;
        color: #606266;
        transition: color 0.15s linear;
      }

      .icon-name {
        margin-top: 8px;
      }
    }

  //    span {
  //   display: inline-block;
  //   line-height: normal;
  //   vertical-align: middle;
  //   font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
  //     "Microsoft YaHei", SimSun, sans-serif;
  //   color: #99a9bf;
  //   transition: color 0.15s linear;
  // }

  // i {
  //   display: block;
  //   font-size: 32px;
  //   margin-bottom: 15px;
  //   color: #606266;
  //   transition: color 0.15s linear;
  // }

  // .icon-name {
  //   display: inline-block;
  //   padding: 0 3px;
  //   height: 1em;
  // }
  }
}
</style>
