package com.csuft.gis.controller;

import com.csuft.gis.mapper.MapMapper;
import com.csuft.gis.pojo.Result;
import com.csuft.gis.pojo.TbScenicReviewInfo;
import com.csuft.gis.pojo.TbScenicSpotCheck;
import com.csuft.gis.pojo.TbScenicSpotInfo;
import com.csuft.gis.service.MapService;
import com.csuft.gis.utils.ScenicCrawler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 地图控制层
 *   功能：
 *      管理员：
 *         景区基本信息查询 √
 *         景点信息录入 √
 *         景区评论信息生成 √
 *         景区用户信息生成 √
 *         景点打卡信息生成 √
 *         景区评估信息生成 √
 *         景区人流量数据查询 √
 *
 *       用户：
 *          景点打卡记录 √
 *          旅途日志生成 √
 */
@RestController
@RequestMapping("/map")
//@CrossOrigin(origins = "http://127.0.0.1:5501") //测试阶段跨域
public class MapController {

    //地图服务
    @Autowired
    private MapService mapService;


    /**
     * 根据景区id查询景区信息
     * @param sid
     * @return
     */
    @RequestMapping("/getScenicInfoBySid")
    public Result getScenicInfoBySid(@RequestParam(value = "sid",required = true) String sid){
        return  mapService.getScenicInfoBySid(sid);
    }

    /**
     * 根据景区id和城市编号查询景区信息
     * @param sid
     * @param cityCode
     * @return
     */
    @RequestMapping("/getScenicInfo")
    public Result getScenicInfo(@RequestParam(value = "sid",required = true) String sid,
                                @RequestParam(value = "cityCode",required = true) Integer cityCode,
                                @RequestParam(value = "location",required = true) String location){
            return mapService.getScenicInfo(sid,cityCode,location);
    }

    /**
     * 获取所有景区的信息
     * @return
     */
    @RequestMapping("/getAllScenicInfo")
    public Result getAllScenicInfo(){
        return mapService.getAllScenicInfo();
    }

    /**
     * 保存景点信息
     * @param tbScenicSpotInfo
     * @return
     */
    @RequestMapping("/saveScenicPointInfo")
    public Result saveScenicPointInfo(@RequestBody TbScenicSpotInfo tbScenicSpotInfo){
        if(tbScenicSpotInfo!=null){
            return mapService.saveScenicPointInfo(tbScenicSpotInfo);
        }
        return Result.build("201","景点信息获取失败");
    }

    /**
     * 根据sid查询景点信息
     * @param sid
     * @return
     */
    @RequestMapping("/getScenicPointInfoBySid")
    public  Result getScenicPointInfoBySid(@RequestParam(value = "sid",required = true)String sid){
        return mapService.getScenicPointInfoBySid(sid);
    }

    /**
     * 根据sid查询景区评论
     * @param sid
     * @return
     */
    @RequestMapping("/getScenicReviewInfoBySid")
    public Result getScenicReviewInfoBySid(@RequestParam(value = "sid",required = true) String sid){
        return  mapService.getScenicReviewInfoBySid(sid);
    }

    /**
     * 生成景区用户评价信息
     * @param sid
     * @return
     */
    @RequestMapping("/generateUserEvaluation")
    public Result generateUserEvaluation(@RequestParam(value = "sid",required = true) String sid,
                                         @RequestParam(value = "cityCode",required = true)Integer cityCode,
                                         @RequestParam(value = "location",required = true) String location){
        return  mapService.generateUserEvaluation(sid,cityCode,location);
    }

    /**
     * 生成景区用户来源
     * @param sid
     * @return
     */
    @RequestMapping("/generateUserSrc")
    public Result generateUserSrc(@RequestParam(value = "sid",required = true) String sid,
                                  @RequestParam(value = "cityCode",required = true)Integer cityCode,
                                  @RequestParam(value = "location",required = true) String location){
        return mapService.generateUserInfo(sid,cityCode,location);
    }

    /**
     * 生成热力图数据
     * @param dataTime
     * @param hour
     * @returno
     */
    @RequestMapping("/generateHeatData")
    public Result generateHeatData(@RequestParam(value = "dateTime",required = true)String dataTime,
                                   @RequestParam(value = "hour",required = true) String hour){
        return mapService.generateHeatData(dataTime,hour);
    }

    /**
     * 保存打卡点
     * @param tbScenicSpotCheck
     * @return
     */
    @RequestMapping("/saveSpotCheck")
    public Result saveSpotCheck(@RequestBody TbScenicSpotCheck tbScenicSpotCheck){
        if(tbScenicSpotCheck!=null){
            return mapService.saveSpotCheck(tbScenicSpotCheck);
        }
        return Result.build("201","景区打卡点信息获取失败");
    }

    /**
     * 根据景区id查询打卡点
     * @param sid
     * @return
     */
    @RequestMapping("/getSpotCheckBySid")
    public Result getSpotCheckBySid(@RequestParam(value = "sid",required = true) String sid){
        if(sid!=null){
            return mapService.getSpotCheckBySid(sid);
        }
        return Result.build("201","景点id获取失败");
    }

    /**
     * 查询用户打卡点
     *      （暂不设计用户体系版本）
     * @return
     */
    @RequestMapping("/getSpotCheck")
    public Result getSpotCheck(){
        return  mapService.getSpotCheck();
    }

    /**
     * 根据景区id生成景区内打卡点统计情况
     * @param sid
     * @return
     */
    @RequestMapping("/generateSpotCheckStatistics")
    public Result generateSpotCheckStatistics(@RequestParam(value = "sid",required = true)String sid){
        if(sid!=null){
            return mapService.generateSpotCheckStatistics(sid);
        }
        return Result.build("201","景区id获取失败");
    }

    /**
     * 根据评论生成城市与sid对应景区的游客量
     * @param sid
     * @return
     */
    @RequestMapping("/generateTouristAmountByCommentInCity")
    public Result generateTouristAmountByCommentInCity(@RequestParam(value = "sid",required = true)String sid){
        if(sid!=null){
            return mapService.generateTouristAmountByCommentInCity(sid);
        }
        return Result.build("201","景区id获取失败");
    }

    /**
     * 根据评论生成各个景区的游客量
     * @return
     */
    @RequestMapping("/generateTouristAmountByCommentInScenic")
    public Result generateTouristAmountByCommentInScenic(){
        return mapService.generateTouristAmountByCommentInScenic();
    }

    /**
     * 景区评估生成
     * @param sid
     * @return
     */
    @RequestMapping("/generateScenicAssess")
    public Result generateScenicAssess(@RequestParam(value = "sid",required = true) String sid){
        if(sid!=null){
            return mapService.generateScenicAssess(sid);
        }
        return Result.build("201","景区id获取失败");
    }




}
