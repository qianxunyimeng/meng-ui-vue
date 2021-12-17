<template>
  <div class="block" style="min-width:900px;">
    <mx-count-to ref='example' 
        class='example' 
        :start-val='setStartVal' 
        :end-val='setEndVal' 
        :duration='setDuration' 
        :decimals='_decimals'
        :separator='setSeparator' 
        :prefix='setSuffix' 
        :suffix='setPrefix' 
        :autoplay=false>
    </mx-count-to>
     
    <div>
      <label class="label" for="startValInput">startVal:  
        <input type="number" v-model='setStartVal' name='startValInput' />
      </label>
      <label class="label" for="endValInput">endVal:  
        <input type="number" v-model='setEndVal' name='endVaInput' />
      </label>
      <label class="label" for="durationInput">duration:  
        <input type="number" v-model='setDuration' name='durationInput' />
      </label>
      <div class="startBtn example-btn" @click='start'>开始</div>
      <div class="pause-resume-btn example-btn" @click='pauseResume'>暂停/恢复</div>
      <br/>
      <label class="label" for="decimalsInput">decimals:  
        <input type="number" v-model='setDecimals' name='decimalsInput' />
      </label>
      <label class="label" for="separatorInput">separator:  
        <input v-model='setSeparator' name='separatorInput' />
      </label>
      <label class="label" for="prefixInput">prefix: 
        <input v-model='setPrefix' name='prefixInput' />
      </label>
      <label class="label" for="suffixInput">suffix: 
        <input v-model='setSuffix' name='suffixInput' />
      </label>
    </div>
     
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive,ref,computed} from 'vue'
import { MxCountTo,MxButton } from 'meng-ui-vue'

export default defineComponent({
  setup() {
    const example = ref()
    const data = reactive({
      setStartVal: 0,
      setEndVal: 2021,
      setDuration: 4000,
      setDecimals: 0,
      setSeparator: ',',
      setSuffix: '',
      setPrefix: '¥ '
    })

    const _decimals = computed( () => {
      if (data.setDecimals) {
        if (data.setDecimals < 0 || data.setDecimals > 20) {
          alert('digits argument must be between 0 and 20')
          return 0
        }
        return data.setDecimals
      } else {
        return 0
      }
    }) 

    const start = () =>{
      example.value.start();
    }
    
    const pauseResume = () => {
      example.value.pauseResume();
    }

    const refData = toRefs(data)
    

    return {
      example,
      ...refData,
      _decimals,
      start,
      pauseResume,
    }
  },
})
</script>
<style scoped>
.example-btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  padding: 4px 15px;
  font-size: 12px;
  border-radius: 4px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  position: relative;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  border-color: #d9d9d9;
}

.example-btn:hover {
  color: #4AB7BD;
  background-color: #fff;
  border-color: #4AB7BD;
}

  .example {
  font-size: 50px;
  color: #F6416C;
  display: block;
  margin: 10px 0;
  text-align: center;
  font-size: 80px;
  font-weight: 500;
}
.label {
  color: #2f4f4f;
  font-size: 16px;
  display: inline-block;
  margin: 15px 30px 15px 0;
}

input {
  position: relative;
  display: inline-block;
  padding: 4px 7px;
  width: 80px;
  height: 28px;
  cursor: text;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, .65);
  background-color: #fff;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  -webkit-transition: all .3s;
  transition: all .3s;
}
.startBtn {
  margin-left: 20px;
  font-size: 20px;
  color: #30B08F;
  background-color: #fff;
}

.startBtn:hover {
  background-color: #30B08F;
  color: #fff;
  border-color: #30B08F;
}

.pause-resume-btn {
  font-size: 20px;
  color: #E65D6E;
  background-color: #fff;
}

.pause-resume-btn:hover {
  background-color: #E65D6E;
  color: #fff;
  border-color: #E65D6E;
}
</style>