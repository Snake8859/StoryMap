package com.csuft.gis.pojo;

import java.util.List;

/**
 * 用户信息封装类
 */
public class UserInfo {

    //词云路径
    private String wordCloudUrl;

    //用户信息
    private List<UserSrc> userSrcList;

    public String getWordCloudUrl() {
        return wordCloudUrl;
    }

    public void setWordCloudUrl(String wordCloudUrl) {
        this.wordCloudUrl = wordCloudUrl;
    }

    public List<UserSrc> getUserSrcList() {
        return userSrcList;
    }

    public void setUserSrcList(List<UserSrc> userSrcList) {
        this.userSrcList = userSrcList;
    }

    /**
     * 用户信息内部类-用户信息
     */
    public static class UserSrc {
        private String srcName;
        private Integer count;

        public String getSrcName() {
            return srcName;
        }

        public void setSrcName(String srcName) {
            this.srcName = srcName;
        }

        public Integer getCount() {
            return count;
        }

        public void setCount(Integer count) {
            this.count = count;
        }
    }
}
