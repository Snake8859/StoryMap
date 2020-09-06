package com.csuft.gis.service.impl;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import com.csuft.gis.mapper.MapMapper;
import com.csuft.gis.pojo.*;
import com.csuft.gis.service.MapService;
import com.csuft.gis.utils.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 地图业务层 实现
 */
@Service
@PropertySource("classpath:resource.properties")
public class MapServiceImpl implements MapService {

    //地图mapper
    @Autowired
    private MapMapper mapMapper;

    //Windows环境下路径
    @Value("${UPLOAD_FOLDER_WINDOWS}")
    private String UPLOAD_FOLDER_WINDOWS;

    //Linux环境下路径
    @Value("${UPLOAD_FOLDER_LUNIX}")
    private String UPLOAD_FOLDER_LUNIX;

    //本地访问前缀
    @Value("${LOCAL_HTTP_PATH}")
    private String LOCAL_HTTP_PATH;

    //远程访问前缀
    @Value("${REMOTE_HTTP_PATH}")
    private String REMOTE_HTTP_PATH;


    /**
     *  查询景区信息
     *      数据库or爬虫
     * @param sid
     * @param cityCode
     * @return
     */
    @Override
    public Result getScenicInfo(String sid, Integer cityCode,String location) {
        //校验是否已存在
        TbScenicInfo tbScenicInfo = mapMapper.queryScenicInfoBySid(sid);
        if(tbScenicInfo!=null){//景区信息已存在
                return Result.build("200","数据库:查询景区信息",tbScenicInfo);
        }else { //景区信息不存在，爬虫获取
            tbScenicInfo  = ScenicCrawler.ScenicInfoCrawler(sid,cityCode);
            try{
                //设置经纬度
                tbScenicInfo.setLocation(location);
                //保存景区基本信息
                Integer i = mapMapper.insertScenicInfo(tbScenicInfo);
                //初始景区拓展信息
                //initScenicInfoExtend(tbScenicInfo.getSid(),tbScenicInfo.getName());
            }
            catch (Exception e){
                e.printStackTrace();
                return Result.build("202","景区信息保存失败:数据库未知异常");
            }
           return Result.build("200","爬虫:查询景区信息",tbScenicInfo);
        }
    }

    /**
     * 查询所有景区id和景区名称
     * @return
     */
    @Override
    public Result getAllScenicInfo() {
        List<TbScenicInfo> list =  mapMapper.queryAllScenic();
        if(list!=null&&list.size()>0){
            return Result.build("200","查询所有景区id和名称",list);
        }
        return Result.build("202","查询失败：未知异常");
    }

    /**
     * 根据景区id查询景区信息
     * @param sid
     * @return
     */
    @Override
    public Result getScenicInfoBySid(String sid) {
        TbScenicInfo tbScenicInfo =  mapMapper.queryScenicInfoBySid(sid);
        if(tbScenicInfo!=null){
            return  Result.build("200","查询景区信息",tbScenicInfo);
        }
        return Result.build("202","查询无结果");
    }

    /**
     * 保存景点信息
     * @param tbScenicSpotInfo
     * @return
     */
    @Override
    public Result saveScenicPointInfo(TbScenicSpotInfo tbScenicSpotInfo) {
        try{
            //生成景点id
            tbScenicSpotInfo.setSpotid(UuidUtil.get32UUID());
           Integer i =  mapMapper.insertScenicSpotInfo(tbScenicSpotInfo);
           return Result.build("200","景点信息保存成功");
        }
        catch (Exception e){
            e.printStackTrace();
            return Result.build("202","景点信息保存失败");
        }
    }

    /**
     * 根据sid查询景点信息
     * @param sid
     * @return
     */
    @Override
    public Result getScenicPointInfoBySid(String sid) {
        List<TbScenicSpotInfo> list = mapMapper.queryScenicPointInfoBySid(sid);
        if(list!=null&&list.size()>0){
            return Result.build("200","景点信息查询成功",list);
        }
        return Result.build("202","景区暂无标明景点");
    }

    /**
     * 景点拓展信息初始化
     * @param sid
     * @param name
     * @return
     */
    @Override
    public Result initScenicInfoExtend(String sid, String name) {
        TbScenicExtend tbScenicExtend = new TbScenicExtend();
        tbScenicExtend.setSid(sid);
        tbScenicExtend.setName(name);
        try{
            Integer i = mapMapper.insertScenicInfoExtend(tbScenicExtend);
            return Result.build("200","景区拓展信息初始化成功");
        }
        catch (Exception e){
            e.printStackTrace();
            return Result.build("202","景区拓展信息初始化失败");
        }
    }

    /**
     * 根据sid获取景区评论
     *      数据库or爬虫
     * @param sid
     * @return
     */
    @Override
    public Result getScenicReviewInfoBySid(String sid) {
        //校验是否已有评论信息
        List<TbScenicReviewInfo> list =  mapMapper.queryScenicReviewInfoBySid(sid);
        if(list!=null&&list.size()>0){//景区评论已存在
                return Result.build("200","查询景区评论成功:数据库查询",list);
        }else {//景区评论不存在，爬虫获取
                list  = ScenicCrawler.ScenicReviewInfoCrawler(sid);
                if(list.size()>0){//爬取成功景区评论
                    //保存至数据库
                        for (TbScenicReviewInfo  tbScenicReviewInfo:list) {
                            try{
                                Integer i = mapMapper.insertScenicReviewInfo(tbScenicReviewInfo);
                            }
                            catch (Exception e){
                                e.printStackTrace();
                                System.out.println("sid:"+tbScenicReviewInfo.getSid()+",review_id:"+tbScenicReviewInfo.getReviewId()+",插入失败");
                            }
                        }
                        return Result.build("200","查询景区评论成功:爬虫获取",list);
                }else{//该景区未有评论
                    return Result.build("201","查询景区评论:该景区无评论",list);
                }
        }
    }

    /**
     * 景区用户评价信息生成
     * @param sid
     * @return
     */
    @Override
    public Result generateUserEvaluation(String sid,Integer cityCode,String location) {

        //判断景区基本信息情况是否存在
        TbScenicInfo tbScenicInfo = mapMapper.queryScenicInfoBySid(sid);
        if(tbScenicInfo==null){ //若不存在，爬虫获取
            tbScenicInfo = ScenicCrawler.ScenicInfoCrawler(sid,cityCode);
            try {
                //设置经纬度
                tbScenicInfo.setLocation(location);
                //保存景区基本信息
                Integer i = mapMapper.insertScenicInfo(tbScenicInfo);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        Result result = getScenicReviewInfoBySid(sid);
        if(result.getCode().equals("200")){//评论信息获取成功
            UserEvaluation userEvaluation = new UserEvaluation();
            //计算自身景区的评价分布 后端计算
            List<TbScenicReviewInfo> list = (List<TbScenicReviewInfo>) result.getData();
            Map<Double,Integer> selfEvaluation = new HashMap<Double, Integer>();
            Integer five = 0; //5分
            Integer four = 0; //4分
            Integer three = 0; //3分
            Integer two = 0; //2分
            Integer one = 0; //1分
            for (TbScenicReviewInfo tbScenicReviewInfo:list) {
                //获取分数
                double score =  tbScenicReviewInfo.getScore();
                if(score==5){
                    five++;
                }
                else if(score==4){
                    four++;
                }
                else if(score==3){
                    three++;
                }
                else if(score==2){
                    two++;
                }
                else if(score==1){
                    one++;
                }
            }
            selfEvaluation.put(5.0,five);
            selfEvaluation.put(4.0,four);
            selfEvaluation.put(3.0,three);
            selfEvaluation.put(2.0,two);
            selfEvaluation.put(1.0,one);
            userEvaluation.setSelfEvaluation(selfEvaluation);
            //计算各个景区的评价总体值 sql计算
            List<UserEvaluation.ScenicEvaluation> scenicEvaluation =  mapMapper.queryAllScenicUserAverageEvaluation();
            userEvaluation.setScenicEvaluation(scenicEvaluation);
            return Result.build("200","景区用户评价信息生成",userEvaluation);
        }
        return Result.build("201","景区用户评价信息缺失");
    }

    /**
     * 景区用户信息生成
     * @param sid
     * @return
     */
    @Override
    public Result generateUserInfo(String sid,Integer cityCode,String location) {

        //判断景区基本信息情况是否存在
        TbScenicInfo tbScenicInfo = mapMapper.queryScenicInfoBySid(sid);
        if(tbScenicInfo==null){ //若不存在，爬虫获取
            tbScenicInfo = ScenicCrawler.ScenicInfoCrawler(sid,cityCode);
            try {
                //设置经纬度
                tbScenicInfo.setLocation(location);
                //保存景区基本信息
                Integer i = mapMapper.insertScenicInfo(tbScenicInfo);
            }
            catch (Exception e){
                e.printStackTrace();
            }
        }
        Result result = getScenicReviewInfoBySid(sid);
        if(result.getCode().equals("200")){//景区评论信息获取成功
            UserInfo userInfo = new UserInfo();
            //计算景区用户来源
            List<UserInfo.UserSrc> userSrcList =  mapMapper.queryAllScenicUserSrc(sid);
            if(userSrcList!=null&&userSrcList.size()>0){
                userInfo.setUserSrcList(userSrcList);
            }
            //查询评论信息
            List<String> reviewList =  mapMapper.queryScenicReview(sid);
            if(reviewList!=null&&reviewList.size()>0){ //若评论不为空
                //根据评论和sid生成词云
                String wordCloudUrl =  WordCloudUtil.createWordCloud(reviewList,sid);
                userInfo.setWordCloudUrl(wordCloudUrl);
            }
            return Result.build("200","景区用户来源信息生成",userInfo);

        }
        return Result.build("201","景区用户来源信息缺失");
    }

    /**
     * 生成热力图数据
     *      根据日期和小时
     * @param dataTime
     * @param hour
     * @return
     */
    @Override
    public Result generateHeatData(String dataTime, String hour) {
        List<TbHeatData> tbHeatDataList =  HeatMapUtil.getHeatDataByTime(dataTime,hour);
        if(tbHeatDataList!=null&&tbHeatDataList.size()>0){//热力图数据生成成功
                return Result.build("200","热力图数据生成",tbHeatDataList);
        }
        return Result.build("201","热力图数据生成失败");
    }

    /**
     * 打卡点保存
     * @param tbScenicSpotCheck
     * @return
     */
    @Override
    public Result saveSpotCheck(TbScenicSpotCheck tbScenicSpotCheck) {
        try {
            //设置打卡id
            tbScenicSpotCheck.setCid(UuidUtil.get32UUID());
            //根据景点id查询景点名称
            TbScenicSpotInfo tbScenicSpotInfo =  mapMapper.queryScenicPointInfoBySpointId(tbScenicSpotCheck.getSpotid());
            //设置景点名称
            tbScenicSpotCheck.setSpoName(tbScenicSpotInfo.getName());
            //设置打卡时间
            tbScenicSpotCheck.setTime(DateUtil.getStringDateShort());
            Integer i = mapMapper.insertScenicSpotCheck(tbScenicSpotCheck);
            return Result.build("200","打卡点保存成功");
        }catch (Exception e){
            e.printStackTrace();
            return Result.build("202","数据库插入失败");
        }

    }

    /**
     * 根据景区id搜索打卡点
     * @param sid
     * @return
     */
    @Override
    public Result getSpotCheckBySid(String sid) {
        List<TbScenicSpotCheck> list =  mapMapper.queryScenicCheckBySid(sid);
        if(list!=null&&list.size()>0){
            return Result.build("200","打卡点信息查询成功",list);
        }
        return Result.build("202","暂无打卡点");
    }

    /**
     * 获取用户打卡点信息
     *      （暂不考虑用户体系版本）
     * @return
     */
    @Override
    public Result getSpotCheck() {
        List<TbScenicSpotCheck> tbScenicSpotCheckList =  mapMapper.queryAllScenicCheck();
        if(tbScenicSpotCheckList!=null&&tbScenicSpotCheckList.size()>0){
            return Result.build("200","用户打卡点信息查询成功",tbScenicSpotCheckList);
        }
        return Result.build("202","用户暂无打卡点");
    }

    /**
     * 根据景区id生成景区内打卡情况
     * @param sid
     * @return
     */
    @Override
    public Result generateSpotCheckStatistics(String sid) {
        List<TbScenicSpotCheck.SpotCheckStatistics>  list =  mapMapper.querySpotCheckCount(sid);
        if(list!=null&&list.size()>0){
            return Result.build("200","景区打卡统计生成",list);
        }
        return Result.build("202","景区打卡统计生成失败");
    }

    /**
     * 根据评论生成城市和景区的游客量
     * @param sid
     * @return
     */
    @Override
    public Result generateTouristAmountByCommentInCity(String sid) {
        Map<String,List<TbScenicReviewInfo.TouristAmount>> touristAmount = new HashMap<String,List<TbScenicReviewInfo.TouristAmount>>();
        //景区游客量
        List<TbScenicReviewInfo.TouristAmount> scenicTourist =   mapMapper.queryTouristAmountBySid(sid);
        if(scenicTourist!=null&&scenicTourist.size()>0){
            touristAmount.put(sid,scenicTourist);
        }
        //城市游客量
        List<TbScenicReviewInfo.TouristAmount> cityTourist = mapMapper.queryTouristAmount();
        if(cityTourist!=null&&cityTourist.size()>0){
            touristAmount.put("cs",cityTourist);
        }
        return Result.build("200","城市与景区的游客量",touristAmount);
    }

    /**
     * 根据评论生成各个景区的游客量
     * @return
     */
    @Override
    public Result generateTouristAmountByCommentInScenic() {
        Map<String,List<TbScenicReviewInfo.TouristAmount>> touristAmount = new HashMap<String,List<TbScenicReviewInfo.TouristAmount>>();
        //获取评论总数前10的景区id
        List<TbScenicInfo> tbScenicInfoList = mapMapper.queryAllScenicTop10ByReviewCount();
        if(tbScenicInfoList!=null&&tbScenicInfoList.size()>0){
            for (TbScenicInfo tbScenicInfo: tbScenicInfoList) {//获取各个景区游客量
                List<TbScenicReviewInfo.TouristAmount> scenicTourist =   mapMapper.queryTouristAmountBySid(tbScenicInfo.getSid());
                if(scenicTourist!=null&&scenicTourist.size()>0){//存入map
                    touristAmount.put(tbScenicInfo.getSid(),scenicTourist);
                }
            }
        }
        return Result.build("200","景区与景区游客量",touristAmount);
    }

    /**
     * 根据sid生成景区评估信息
     * 2015-2016年度
     * @param sid
     * @return
     */
    @Override
    public Result generateScenicAssess(String sid) {
        Map<String,Object> data = new HashMap<String,Object>();
        String year_2015 = "2015";
        String year_2016 ="2016";

        //第一幕数据生成
        //获取2015总游客量以及每月平均游客量
        ScenicAssess scenicAssess_2015 =  mapMapper.queryScenicAVGMonthTouristByYear(sid,year_2015);
        //获取2016总游客量以及每月平均游客量
        ScenicAssess scenicAssess_2016 = mapMapper.queryScenicAVGMonthTouristByYear(sid,year_2016);
        //2016年月均游客量
        data.put("avgMonth",scenicAssess_2016.getAvgMonth());
        //计算年对年增长倍数
        Integer multiple = scenicAssess_2016.getTotal()/scenicAssess_2015.getTotal();
        data.put("multiple",multiple);
        //计算年净增长量
        Integer number = scenicAssess_2016.getTotal()-scenicAssess_2015.getTotal();
        data.put("number",number);
        //计算每个季度的游客量趋势
        List<ScenicAssess.AuarterAssess> auarterAssessList = mapMapper.queryScenicAuarterAssess(sid,year_2016);
        if(auarterAssessList!=null&&auarterAssessList.size()>0) {
            double auaterOne = (auarterAssessList.get(0).getCount() + auarterAssessList.get(1).getCount() + auarterAssessList.get(2).getCount()) / 3;
            double auaterTwo = (auarterAssessList.get(3).getCount() + auarterAssessList.get(4).getCount() + auarterAssessList.get(5).getCount()) / 3;
            double auaterThree = (auarterAssessList.get(6).getCount() + auarterAssessList.get(7).getCount() + auarterAssessList.get(8).getCount()) / 3;
            double auaterFour = (auarterAssessList.get(9).getCount() + auarterAssessList.get(10).getCount() + auarterAssessList.get(11).getCount()) / 3;
            data.put("auaterOne", auaterOne);
            data.put("auaterTwo", auaterTwo);
            data.put("auaterThree", auaterThree);
            data.put("auaterFour", auaterFour);
        }

        //第二幕数据生成
        //2015年评价等级
        UserEvaluation.ScenicEvaluation scenicEvaluation_2015 = mapMapper.queryScenicUserAverageEvaluationBySidAndYear(sid,year_2015);
        //2016年评价等级
        UserEvaluation.ScenicEvaluation scenicEvaluation_2016 = mapMapper.queryScenicUserAverageEvaluationBySidAndYear(sid,year_2016);
        //2016年用户评价
        data.put("avgEvaluation",scenicEvaluation_2016.getUae());
        //计算用户评价增长情况
        DecimalFormat df = new DecimalFormat("0.00");
        double uaeGrowth = scenicEvaluation_2016.getUae() - scenicEvaluation_2015.getUae();
        data.put("uaeGrowth",df.format(uaeGrowth));
        //计算年度好评人数  评分>=4
        Integer goodEvaluationNumber = mapMapper.queryScenicReviewGoodEvaluationBySidAndYear(sid,year_2016);
        data.put("goodEvaluationNumber",goodEvaluationNumber);
        //计算好评率  好评/总评
        double goodEvaluationRate =  (double)goodEvaluationNumber/scenicAssess_2016.getTotal();
        data.put("goodEvaluationRate",df.format(goodEvaluationRate));

        //第三幕数据生成
        //计算用户评价来源Top4
       List<UserInfo.UserSrc> userSrcList =  mapMapper.queryAllScenicUserSrcBySidTop4(sid);
       if(userSrcList!=null&&userSrcList.size()>0){
           data.put("userSrcList",userSrcList);
       }
        //根据用户头像拼接大图
        //随机取16张美团用户头像
        List<String> userPicList = mapMapper.queryScenicReviewUserPicBySid(sid);
        try {
            //Windows环境 拼接用户头像
            //UserAvatarsImageUtil.getGroupAvatar(userPicList,UPLOAD_FOLDER_WINDOWS+"//userPic_"+sid+".jpg");
            //data.put("userPicListUrl",LOCAL_HTTP_PATH+"/userPic_"+sid+".jpg");
            //Liunx环境 拼接用户头像
            UserAvatarsImageUtil.getGroupAvatar(userPicList,UPLOAD_FOLDER_LUNIX+"//userPic_"+sid+".jpg");
            data.put("userPicListUrl",REMOTE_HTTP_PATH+"/userPic_"+sid+".jpg");
        } catch (IOException e) {
            //拼接失败
            e.printStackTrace();
            data.put("userPicListUrl","error");
        }
        return Result.build("200","评估数据生成成功",data);
    }

}
