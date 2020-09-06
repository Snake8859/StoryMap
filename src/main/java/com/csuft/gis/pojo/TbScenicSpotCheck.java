package com.csuft.gis.pojo;


/**
 * 景点打卡信息表
 */
public class TbScenicSpotCheck {

    //打卡id
    private  String cid;

    //景点名称
    private  String spoName;

    //感想
    private  String thoughts;

    //打卡图片列表
    private  String pictureUrl;

    //打卡点地址
    private  String address;

    //经度
    private  double lat;

    //纬度
    private  double lng;

    //景点id
    private  String spotid;

    //景区id
    private String sid;

    //打卡日期
    private  String time;


    public  String  getCid(){
        return  this.cid;
    };
    public  void  setCid(String cid){
        this.cid=cid;
    }

    public  String  getSpoName(){
        return  this.spoName;
    };
    public  void  setSpoName(String spoName){
        this.spoName=spoName;
    }

    public  String  getThoughts(){
        return  this.thoughts;
    };
    public  void  setThoughts(String thoughts){
        this.thoughts=thoughts;
    }

    public  String  getPictureUrl(){
        return  this.pictureUrl;
    };
    public  void  setPictureUrl(String pictureUrl){
        this.pictureUrl=pictureUrl;
    }

    public  String  getAddress(){
        return  this.address;
    };
    public  void  setAddress(String address){
        this.address=address;
    }

    public  double  getLat(){
        return  this.lat;
    };
    public  void  setLat(double lat){
        this.lat=lat;
    }

    public  double  getLng(){
        return  this.lng;
    };
    public  void  setLng(double lng){
        this.lng=lng;
    }

    public  String  getSpotid(){
        return  this.spotid;
    };
    public  void  setSpotid(String spotid){
        this.spotid=spotid;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public  String  getTime(){
        return  this.time;
    };
    public  void  setTime(String time){
        this.time=time;
    }

    /**
     * 打卡点统计内部类
     */
    public static class SpotCheckStatistics{
            private String spoName;
            private Integer count;

        public String getSpoName() {
            return spoName;
        }

        public void setSpoName(String spoName) {
            this.spoName = spoName;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }
    }


}
