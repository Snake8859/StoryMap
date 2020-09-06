var template = `
        <div class='form-horizontal'>
            <h3 class='text-center'>
            信息录入
            </h3>
            <div class='form-group'>
                <label class='col-sm-4 control-label'>
                    名称
                </label>
                <div class='col-sm-8'>
                    <input type='text' class='form-control' v-model='spot.name' placeholder='请输入名称'>
                </div>
            </div>
            <div class='form-group'>
                <label class='col-sm-4 control-label'>
                    备注
                </label>
                <div class='col-sm-8'>
                    <textarea class='form-control' v-model='spot.remark' placeholder='请输入备注'
                    rows='3'>
                    </textarea>
                </div>
            </div>
            <div class='form-group'>
                <label class='col-sm-4 control-label'>
                    图片上传
                </label>
                <div class='col-sm-8'>
                    <input v-if="flag" type='file' @change='uploadImg'>
                    </input>
                    <img class='spotImg' v-else :src="spot.pictureUrl">
                </div>
            </div>
            <button type='button' class='btn btn-primary btn-sm btn-block' @click='saveSpot'>
            确定
            </button>
        </div>
        `;

Vue.component('spot-window', {
    data: function () {
        return {
            //景点基本信息
            spot: {
                name: "",
                remark: "",
                pictureUrl: "",
                sid: getQueryVariable("sid"), //路径获取
                lat: latlng.lat,    //全局js变量获取
                lng: latlng.lng     //全局js变量获取
            },
            flag:true
        }
    },
    methods: {
        //图片上传
        uploadImg: function (e) {
            var that = this;
            //取出文件
            var file = e.target.files[0];
            let formData = new FormData();
            formData.append("file", file);
            axios.post('http://120.79.198.96:8864/common/uploadImg', formData)
                .then(function (res) {
                    //console.log(res);
                    if(res.data.code=="200"){//图片上传成功
                        that.spot.pictureUrl = res.data.data;
                        that.flag = false;
                    }else{
                        alert("图片上传失败");
                    }
                })
                .catch(function (err) {  
                    console.log(err);
                });
        },
        //景点确认
        saveSpot: function () {
            var that =  this;
            //console.log(this.spot);
            //判断对象是否为空
            var flag = checkObjProp(this.spot);
            if(flag){
                axios.post("http://120.79.198.96:8864/map/saveScenicPointInfo",{
                    name:that.spot.name,
                    remark:that.spot.remark,
                    pictureUrl:that.spot.pictureUrl,
                    sid:that.spot.sid,
                    lat:that.spot.lat,
                    lng:that.spot.lng
                })
                .then(function(res){
                    console.log(res);
                    if(res.data.code=="200"){
                        //景点信息保存成功
                        alert("景点信息保存成功");
                        window.location.reload();
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
            }else{
                alert("将未填项填完继续")
            }
        }
    },
    template: template

})

var spot_window = new Vue({ el: '#components-spot' })