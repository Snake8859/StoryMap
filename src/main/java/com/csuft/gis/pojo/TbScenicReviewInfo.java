package com.csuft.gis.pojo;
/**
 * 景区评论信息表
 */
public class TbScenicReviewInfo {

    //评论id
    private  String reviewId;

    //评论人
    private  String author;

    //评论人照片
    private  String authorProfileUrl;

    //评论内容照片列表
    private  String picInfo;

    //评论内容
    private  String review;

    //评论评分
    private  double score;

    //评论来源
    private  String srcName;

    //评论时间
    private  String time;

    //景区id
    private  String sid;


    public  String  getReviewId(){
        return  this.reviewId;
    };
    public  void  setReviewId(String reviewId){
        this.reviewId=reviewId;
    }

    public  String  getAuthor(){
        return  this.author;
    };
    public  void  setAuthor(String author){
        this.author=author;
    }

    public  String  getAuthorProfileUrl(){
        return  this.authorProfileUrl;
    };
    public  void  setAuthorProfileUrl(String authorProfileUrl){
        this.authorProfileUrl=authorProfileUrl;
    }

    public  String  getPicInfo(){
        return  this.picInfo;
    };
    public  void  setPicInfo(String picInfo){
        this.picInfo=picInfo;
    }

    public  String  getReview(){
        return  this.review;
    };
    public  void  setReview(String review){
        this.review=review;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public  String  getSrcName(){
        return  this.srcName;
    };
    public  void  setSrcName(String srcName){
        this.srcName=srcName;
    }

    public  String  getTime(){
        return  this.time;
    };
    public  void  setTime(String time){
        this.time=time;
    }

    public  String  getSid(){
        return  this.sid;
    };
    public  void  setSid(String sid){
        this.sid=sid;
    }


    /**
     * 景区评论表内部类
     * 游客统计
     */
    public static  class TouristAmount{

        private String name;
        private Integer month;
        private Long count;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getMonth() {
            return month;
        }

        public void setMonth(Integer month) {
            this.month = month;
        }

        public Long getCount() {
            return count;
        }

        public void setCount(Long count) {
            this.count = count;
        }
    }



    @Override
    public String toString() {
        return "TbScenicReviewInfo{" +
                "reviewId='" + reviewId + '\'' +
                ", author='" + author + '\'' +
                ", authorProfileUrl='" + authorProfileUrl + '\'' +
                ", picInfo='" + picInfo + '\'' +
                ", review='" + review + '\'' +
                ", score=" + score +
                ", srcName='" + srcName + '\'' +
                ", time='" + time + '\'' +
                ", sid='" + sid + '\'' +
                '}';
    }
}
