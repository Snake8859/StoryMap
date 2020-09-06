package com.csuft.gis.pojo;

/**
 * 景区拓展信息表
 */


public class TbScenicExtend {

    //拓展id
    private  long eid;

    //景区id
    private  String sid;

    //景区名称
    private  String name;

    //年份
    private  long year;

    //年均游客量
    private  long averageTourist;

    //年均收入
    private  double averageIncome;

    //年均用户评价等级
    private  double averageEvaluate;


    public  long  getEid(){
        return  this.eid;
    };
    public  void  setEid(long eid){
        this.eid=eid;
    }

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

    public  long  getYear(){
        return  this.year;
    };
    public  void  setYear(long year){
        this.year=year;
    }

    public  long  getAverageTourist(){
        return  this.averageTourist;
    };
    public  void  setAverageTourist(long averageTourist){
        this.averageTourist=averageTourist;
    }

    public  double  getAverageIncome(){
        return  this.averageIncome;
    };
    public  void  setAverageIncome(double averageIncome){
        this.averageIncome=averageIncome;
    }

    public  double  getAverageEvaluate(){
        return  this.averageEvaluate;
    };
    public  void  setAverageEvaluate(double averageEvaluate){
        this.averageEvaluate=averageEvaluate;
    }


}