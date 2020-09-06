package com.csuft.gis.pojo;


/**
 * 景点基本信息表
 */
public class TbScenicSpotInfo {

    //景点id
    private  String spotid;

    //景点名称
    private  String name;

    //景点备注
    private  String remark;

    //景点图片列表
    private  String pictureUrl;

    //景区id
    private  String sid;

    //经度
    private  double lat;

    //纬度
    private  double lng;


    public  String  getSpotid(){
        return  this.spotid;
    };
    public  void  setSpotid(String spotid){
        this.spotid=spotid;
    }

    public  String  getName(){
        return  this.name;
    };
    public  void  setName(String name){
        this.name=name;
    }

    public  String  getRemark(){
        return  this.remark;
    };
    public  void  setRemark(String remark){
        this.remark=remark;
    }

    public  String  getPictureUrl(){
        return  this.pictureUrl;
    };
    public  void  setPictureUrl(String pictureUrl){
        this.pictureUrl=pictureUrl;
    }

    public  String  getSid(){
        return  this.sid;
    };
    public  void  setSid(String sid){
        this.sid=sid;
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


}
