<template>
   <div class="fall-pic">
    <ul class="col left" ref="col1">
        <li class="item-pro" v-for="(item,keys) in dataList1" :key="keys">
          <img :src="item.picUrl" v-lazy="item.picUrl"/>
        </li>
    </ul>
    <ul class="col right" ref="col2">
        <li class="item-pro" v-for="(item,keys) in dataList2" :key="keys">
            <img :src="item.picUrl"  v-lazy="item.picUrl"/>
        </li>
    </ul>
  </div>
</template>

<script>
import api from '../utils/api'
import Http from '../utils/Http'
export default {
    data() {
      return {
        mainMenuList: [],//保存所有图片
        //保存渲染到页面上的图片
        dataList1: [],
        dataList2: [],
      }
    },
    mounted() {
   
    },
    created(){
      this.initData();
    },
    methods: {
      async initData(){
         // 发送请求
        const {data: result} = await Http.get(api.DATA_LIST);
        console.log(result);
        const picUrlList = result.picList;
        console.log(picUrlList)
        
        this.mainMenuList = picUrlList;
        this.mountMenu();
      },
      mountMenu(arg) {
        var temp = this.mainMenuList
        var index = arg || 0
        // console.log(index)
        // 判断ul高度（返回来一个高度最小的ul）
        var refName = this.selectCol()
        console.log(refName)
        if (temp.length > index) {
          // console.log(index)
            // 每次比较高度之后从mainMenuList数组中取出一张图片放到高度最小的ul中
            this[refName].push(this.mainMenuList[index])
            //当你修改了data的值然后马上获取这个dom元素的值，是不能获取到更新后的值，
            // 你需要使用$nextTick这个回调，让修改后的data值渲染更新到dom元素之后在获取，才能成功
            this.$nextTick(() => {
              this.mountMenu(index + 1)
              // console.log(refName)
          })
        }
      },
      selectCol() {
        var getHeight = (ref) => {
          // $refs获取dom节点
          return this.$refs[ref].offsetHeight;
        }
        var height1 = getHeight('col1')
        var height2 = getHeight('col2')
        // 判断高度
        switch (Math.min(height1, height2)) {
          case height1:
          return 'dataList1'
          break
          case height2:
          return 'dataList2'
          break
        }
      },
    }
}
</script>

<style lang='scss' scoped>
// 布局样式
  .fall-pic{
    background: #f5f5f5;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .col{
      width: 50%;
      &.left{
        float: left;
      }
      &.right{
        float:right;
      }
      
      .item-pro{
        padding: 2px 4px;
            img{
            display: block;
            width: 100%;
          }
        
      }
    }
  }
</style>