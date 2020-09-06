package com.csuft.gis.pojo;
/**
 * 景区基本信息表
 */
public class TbScenicInfo {
    //景区id
    private  String sid;

    //景区名称
    private  String name;

    //景区地址
    private  String address;

    //景区电话
    private  String tel;

    //景区等级
    private  String starLevel;

    //景区详细介绍
    private  String introduction;

    //景区标签
    private  String tag;

    //景区图片列表
    private  String pictureUrl;

    //景区经纬度
    private String location;


    public  String  getSid(){
        return  this.sid;
    };
    public  void  setSid(String sid){
        this.sid=sid;
    }

    public  String  getName(){
        return  this.name;
    };
    public  void  setName(String name){
        this.name=name;
    }

    public  String  getAddress(){
        return  this.address;
    };
    public  void  setAddress(String address){
        this.address=address;
    }

    public  String  getTel(){
        return  this.tel;
    };
    public  void  setTel(String tel){
        this.tel=tel;
    }

    public String getStarLevel() {
        return starLevel;
    }

    public void setStarLevel(String starLevel) {
        this.starLevel = starLevel;
    }

    public  String  getIntroduction(){
        return  this.introduction;
    };
    public  void  setIntroduction(String introduction){
        this.introduction=introduction;
    }

    public  String  getTag(){
        return  this.tag;
    };
    public  void  setTag(String tag){
        this.tag=tag;
    }

    public  String  getPictureUrl(){
        return  this.pictureUrl;
    };
    public  void  setPictureUrl(String pictureUrl){
        this.pictureUrl=pictureUrl;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "TbScenicInfo{" +
                "sid='" + sid + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", tel='" + tel + '\'' +
                ", starLevel='" + starLevel + '\'' +
                ", introduction='" + introduction + '\'' +
                ", tag='" + tag + '\'' +
                ", pictureUrl='" + pictureUrl + '\'' +
                ", location='" + location + '\'' +
                '}';
    }
}
