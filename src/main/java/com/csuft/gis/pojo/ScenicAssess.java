package com.csuft.gis.pojo;

/**
 * 景区评估封装类
 */
public class ScenicAssess {

    private Integer total;
    private Double avgMonth;

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Double getAvgMonth() {
        return avgMonth;
    }

    public void setAvgMonth(Double avgMonth) {
        this.avgMonth = avgMonth;
    }

    /**
     * 季度评估封装类
     */
    public static class AuarterAssess{
        private Integer month;
        private Long count;

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
}
