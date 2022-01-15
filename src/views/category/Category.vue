<template>
  <div>
    <div class="hello" @touchmove.prevent>
      <p class="text">请在下方区域签名</p>
      <canvas id="canvas" width="350" height="350">Canvas画板</canvas>
      <!--<img v-bind:src="url" alt="">-->
      <p class="btn">
        <button type="" v-on:click="clear">清屏</button>
        <button v-on:click="saveA">取消</button>
      </p>
    </div>
    <div class="btnA">
      <button v-on:click="save">提交</button>
    </div>
  </div>
</template>

<script>
var draw;
var preHandler = function(e) {};
class Draw {
  constructor(el) {
    this.el = el;
    this.canvas = document.getElementById(this.el);
    this.cxt = this.canvas.getContext('2d');
    this.stage_info = this.canvas.getBoundingClientRect();
    this.path = {
      beginX: 0,
      beginY: 0,
      endX: 0,
      endY: 0,
    };
  }
  init(btn) {
    var that = this;
    console.log(this.canvas)
    this.canvas.addEventListener('touchstart', function(event) {
      document.addEventListener('touchstart', preHandler, false);
      that.drawBegin(event);
    });
    this.canvas.addEventListener('touchend', function(event) {
      document.addEventListener('touchend', preHandler, false);
      that.drawEnd();
    });
    this.clear(btn);
  }
  drawBegin(e) {
    var that = this;
    window.getSelection()
      ? window.getSelection().removeAllRanges()
      : document.selection.empty();
    this.cxt.strokeStyle = '#000';
    this.cxt.beginPath();
    this.cxt.moveTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    );
    this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left;
    this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top;
    this.canvas.addEventListener('touchmove', function() {
      that.drawing(event);
    });
  }
  drawing(e) {
    this.cxt.lineTo(
      e.changedTouches[0].clientX - this.stage_info.left,
      e.changedTouches[0].clientY - this.stage_info.top
    );
    this.path.endX = e.changedTouches[0].clientX - this.stage_info.left;
    this.path.endY = e.changedTouches[0].clientY - this.stage_info.top;
    this.cxt.stroke();
  }
  drawEnd() {
    document.removeEventListener('touchstart', preHandler, false);
    document.removeEventListener('touchend', preHandler, false);
    document.removeEventListener('touchmove', preHandler, false);
    //canvas.ontouchmove = canvas.ontouchend = null
  }
  clear(btn) {
    this.cxt.clearRect(0, 0, 470, 400);
  }
  save() {
    return this.canvas.toDataURL('image/png');
  }
}

export default {
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      val: true,
      url: '',
      url1: '',
      url2: '',
      url3: '',
      type: '',
    };
  },
  mounted() {
    this.$nextTick(() => {
      draw = new Draw('canvas');

      draw.init();
    })
  },
  created: function() {
    let query = this.$route.query;
    this.type = query.type;
  },
  methods: {
    clear: function() {
      draw.clear();
    },
    // base64转化blob
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
      else
        byteString = unescape(base64Data.split(',')[1]);
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], {type:mimeString});
    },
    isCanvasBlank: function(canvas) {
      var blank = document.createElement('canvas'); //系统获取一个空canvas对象
      blank.width = canvas.width;
      blank.height = canvas.height;
      return canvas.toDataURL() == blank.toDataURL(); //比较值相等则为空
    },
    save: function() {
      var data = draw.save();
      var c = document.getElementById('canvas');
      if (this.isCanvasBlank(c)) {
        // alert('请绘制草图后再上传！');
        this.$toast('请先签名')
        return;
      }
      this.url = data;
      let blob = this.dataURItoBlob(this.url);
      const formimg = new FormData();
      console.log('文件',this.file);
      formimg.append('file',blob,'image.png');
      this.$http.post('/file/upload',formimg)
        .then( res=>{
          let data=res.body
          if(data.success){
            let param={
              createTime:'',
              faceFile:this.$route.query.faceFile,
              signFile:data.data.fileId,
              signNo:this.$route.query.signNo
            }
            this.$http.post('/taskSign/uploadSign', param).then(res => {
              console.log('保存签名信息',res);
              if(res.body.success){
                this.$router.push({
                  path:'/electronicIframe',
                  query:{
                    signNo:this.$route.query.signNo,
                    type:'signsubmit'
                  }
                })
              }
            })

            //  this.$router.push({
            //    path:'/electronicSignature',
            //    query:{
            //      photourl:data.data.domain+data.data.fileId
            //    }
            //  })

          }else{
            this.$toast(res.errorMessage)
          }
        }).catch(err=>{
        this.$toast('上传失败请重新拍摄上传')
      })
    },
    saveA: function() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
body {
  background: #ffff;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #f1860f;
}
#canvas {
  background: none;
  cursor: default;
  height: 350px;
  width: 100%;
}
#keyword-box {
  margin: 10px 0;
}
.btn button {
  height: 25px;
  width: 80px;
  border: 1px solid #f1860f;
  color: #f1860f;
  font-size: 14px;
  border-radius: 15px;
  background: none;
}
.hello {
  border-radius: 8px;
  height: 470px;
  width: 90%;
  background: #ffff;
  box-shadow: 0px 0px 5px #f4f4f4;
  margin: auto;
  margin-top: 25px;
  border: 1px solid #cccccc;
}
.text {
  margin-left: 10px;
  margin-top: 20px;
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  color: #121212;
  font-weight: bold;
}
.btn {
  text-align: right;
  margin-right: 15px;
  line-height: 20px;
}
.btnA {
  text-align: center;
  margin-top: 30px;
}
.btnA button {
  height: 35px;
  width: 88%;
  color: white;
  font-size: 16px;
  border-radius: 15px;
  background: #f1860f;
  border: none;
}
</style>

