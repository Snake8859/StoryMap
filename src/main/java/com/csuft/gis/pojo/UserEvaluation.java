package com.csuft.gis.pojo;

import java.util.List;
import java.util.Map;

/**
 * 用户评价信息封装类
 */
public class UserEvaluation {

    /**
     * 景区自身用户评价
     *      格式:
     *          5.0:89
     *          4.0:77
     *          3.0:32
     *          2.0:21
     *          1.0:17
     */
    Map<Double,Integer> selfEvaluation;

    /**
     * 各个景区用户评价
     *      格式：
     *          橘子洲：4.0
     *          岳麓山：4.5
     *          五一广场：3.5
     *          沙湾公园: 3.0
     */
    List<ScenicEvaluation> scenicEvaluation;


    public Map<Double, Integer> getSelfEvaluation() {
        return selfEvaluation;
    }

    public void setSelfEvaluation(Map<Double, Integer> selfEvaluation) {
        this.selfEvaluation = selfEvaluation;
    }

    public List<ScenicEvaluation> getScenicEvaluation() {
        return scenicEvaluation;
    }

    public void setScenicEvaluation(List<ScenicEvaluation> scenicEvaluation) {
        this.scenicEvaluation = scenicEvaluation;
    }

    /**
     * 景区评价内部类
     */
    public static class ScenicEvaluation{

        public ScenicEvaluation(){}

        public ScenicEvaluation(String sid, String name,double uae) {
            this.sid = sid;
            this.name = name;
            this.uae = uae;
        }


        //景区id
        private String sid;
        //景区名称
        private String name;
        //景区用户评价等级
        private double uae;

        public String getSid() {
            return sid;
        }

        public void setSid(String sid) {
            this.sid = sid;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public double getUae() {
            return uae;
        }

        public void setUae(double uae) {
            this.uae = uae;
        }
    }
}



