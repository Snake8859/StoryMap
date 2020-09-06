package com.csuft.gis.service;

import com.csuft.gis.pojo.Result;
import com.csuft.gis.pojo.TbScenicSpotCheck;
import com.csuft.gis.pojo.TbScenicSpotInfo;

/**
 * 地图业务层
 */
public interface MapService {
    /**
     * 根据景区id和城市编号查询景区信息
     * @param sid
     * @param cityCode
     * @param location
     * @return
     */
    Result getScenicInfo(String sid, Integer cityCode,String location);


    /**
     * 查询所有景区id和名称
     * @return
     */
    Result getAllScenicInfo();

    /**
     * 根据景区id查询景区信息
     * @param sid
     * @return
     */
    Result getScenicInfoBySid(String sid);

    /**
     * 景点基本信息保存
     * @param tbScenicSpotInfo
     * @return
     */
    Result saveScenicPointInfo(TbScenicSpotInfo tbScenicSpotInfo);

    /**
     * 根据sid查询景点信息
     * @param sid
     * @return
     */
    Result getScenicPointInfoBySid(String sid);

    /**
     * 景点拓展信息初始化
     * @param sid
     * @param name
     * @return
     */
    Result initScenicInfoExtend(String sid,String name);

    /**
     * 根据sid获取景区评论
     * @param sid
     * @return
     */
    Result getScenicReviewInfoBySid(String sid);

    /**
     * 景区用户评价信息生成
     * @param sid
     * @return
     */
    Result generateUserEvaluation(String sid,Integer cityCode,String location);

    /**
     * 景区用户信息生成
     * @param sid
     * @return
     */
    Result generateUserInfo(String sid,Integer cityCode,String location);

    /**
     * 生成热力图数据
     * @param dataTime
     * @param hour
     * @return
     */
    Result generateHeatData(String dataTime, String hour);

    /**
     * 保存打卡点
     * @param tbScenicSpotCheck
     * @return
     */
    Result saveSpotCheck(TbScenicSpotCheck tbScenicSpotCheck);

    /**
     * 根据sid查询景区打卡信息
     * @param sid
     * @return
     */
    Result getSpotCheckBySid(String sid);

    /**
     * 查询用户打卡点
     *      （暂不设计用户体系版本）
     * @return
     */
    Result getSpotCheck();

    /**
     * 根据sid生成景区内打卡统计
     * @param sid
     * @return
     */
    Result generateSpotCheckStatistics(String sid);

    /**
     * 根据评论生成城市和景区游客量
     * @param sid
     * @return
     */
    Result generateTouristAmountByCommentInCity(String sid);

    /**
     * 根据评论生成各个景区的游客量
     * @return
     */
    Result generateTouristAmountByCommentInScenic();

    /**
     * 根据sid生成景区评估信息
     * @param sid
     * @return
     */
    Result generateScenicAssess(String sid);


}
