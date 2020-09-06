package com.csuft.gis.pojo;

/**
 * 热力图数据表
 */
public class TbHeatData {

    //数据id
    private  long id;

    //纬度
    private  String lat;

    //经度
    private  String lng;

    //权重
    private  String count;

    //日期
    private  String datetime;


    public  long  getId(){
        return  this.id;
    };
    public  void  setId(long id){
        this.id=id;
    }

    public  String  getLat(){
        return  this.lat;
    };
    public  void  setLat(String lat){
        this.lat=lat;
    }

    public  String  getLng(){
        return  this.lng;
    };
    public  void  setLng(String lng){
        this.lng=lng;
    }

    public  String  getCount(){
        return  this.count;
    };
    public  void  setCount(String count){
        this.count=count;
    }

    public  String  getDatetime(){
        return  this.datetime;
    };
    public  void  setDatetime(String datetime){
        this.datetime=datetime;
    }

    @Override
    public String toString() {
        return "TbHeatData{" +
                "id=" + id +
                ", lat='" + lat + '\'' +
                ", lng='" + lng + '\'' +
                ", count='" + count + '\'' +
                ", datetime='" + datetime + '\'' +
                '}';
    }
}
