<template>
  <div class="block" style="min-width:900px;">
    <mx-zoom style="height:350px;width:350px;"
        :selector-width="width"
        :selector-height="height"
        :url="url"
        :zoom-type="type"
        :scale="scale"
        :out-zoomer="showType"
        @zoomClick="fnClick"
    >
    </mx-zoom>
     
    <mx-button style="margin-top:8px" @click="changeImg">更换图片</mx-button>
    <mx-button style="margin-top:8px" @click="changeType">更换放大镜类型</mx-button>
    <mx-button style="margin-top:8px" @click="changeShowType">更换放大方式</mx-button>
     
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive} from 'vue'
import { MxZoom,MxButton } from 'meng-ui-vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    const data = reactive({
      url: '',
      index: 0,
      scale: 2,
      type: 'square',
      showType: false,
      changeImgPosition: false,
      width: 128,
      taobao: false,
      filter: false,
      height: -1,
      imgList: [
        '/images/zoom_1_mid.jpg',
        '/images/zoom_2_mid.jpg',
        '/images/zoom_3_mid.jpg',
      ],
    })

    data.url = data.imgList[data.index]
    const changeType = () => {
      data.type = data.type === 'circle' ? 'square' : 'circle'
    }
    const changeImg = () => {
      data.index = data.index > data.imgList.length - 2 ? -1 : data.index
      data.url = data.imgList[++data.index]
    }
    const changeShowType = () => {
      data.showType = !data.showType
    }

    const fnClick = () => {
      ElMessage({
        showClose: true,
        message: '点我干啥呢 😜',
        type: 'success',
      })
    }

    const refData = toRefs(data)
    

    return {
      ...refData,
     
      changeType,
      changeImg,
      changeShowType,
      fnClick,
    }
  },
})
</script>