package com.csuft.gis.pojo;


/**
 * 用户表
 */
public class TbUser {

    //用户id
    private  String uid;

    //登录账户
    private  String account;

    //密码
    private  String password;

    //昵称
    private  String name;

    //用户身份 0：景区管理员 1：普通用户
    private  String identity;

    //景区id
    private  String sid;

    //年龄
    private  int age;

    //性别 0：男 1：女
    private  String gender;

    //用户所属景区信息
    private TbScenicInfo tbScenicInfo;


    public  String  getUid(){
        return  this.uid;
    };
    public  void  setUid(String uid){
        this.uid=uid;
    }

    public  String  getAccount(){
        return  this.account;
    };
    public  void  setAccount(String account){
        this.account=account;
    }

    public  String  getPassword(){
        return  this.password;
    };
    public  void  setPassword(String password){
        this.password=password;
    }

    public  String  getName(){
        return  this.name;
    };
    public  void  setName(String name){
        this.name=name;
    }

    public  String  getIdentity(){
        return  this.identity;
    };
    public  void  setIdentity(String identity){
        this.identity=identity;
    }

    public  String  getSid(){
        return  this.sid;
    };
    public  void  setSid(String sid){
        this.sid=sid;
    }

    public  int  getAge(){
        return  this.age;
    };
    public  void  setAge(int age){
        this.age=age;
    }

    public  String  getGender(){
        return  this.gender;
    };
    public  void  setGender(String gender){
        this.gender=gender;
    }

    public TbScenicInfo getTbScenicInfo() {
        return tbScenicInfo;
    }

    public void setTbScenicInfo(TbScenicInfo tbScenicInfo) {
        this.tbScenicInfo = tbScenicInfo;
    }
}
