package com.csuft.gis.mapper;

import com.csuft.gis.pojo.*;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * 地图Mapper
 */
@Mapper
public interface MapMapper {

    @Select("select * from tb_scenic_info where sid = #{sid}")
    TbScenicInfo queryScenicInfoBySid(@Param("sid") String sid);

    @Insert("insert into tb_scenic_info values(#{sid},#{name},#{address},#{tel},#{starLevel},#{introduction},#{tag},#{pictureUrl},#{location})")
    Integer insertScenicInfo(TbScenicInfo tbScenicInfo);

    @Select("select sid,name from tb_scenic_info")
    List<TbScenicInfo> queryAllScenic();

    @Insert("insert into tb_scenic_spot_info values(#{spotid},#{name},#{remark},#{pictureUrl},#{sid},#{lat},#{lng})")
    Integer insertScenicSpotInfo(TbScenicSpotInfo tbScenicSpotInfo);

    @Select("select * from tb_scenic_spot_info where sid = #{sid}")
    List<TbScenicSpotInfo> queryScenicPointInfoBySid(@Param("sid") String sid);

    @Insert("insert into tb_scenic_extend(sid,name) values(#{sid},#{name})")
    Integer insertScenicInfoExtend(TbScenicExtend tbScenicExtend);

    @Select("select * from tb_scenic_review_info where sid = #{sid}")
    List<TbScenicReviewInfo> queryScenicReviewInfoBySid(@Param("sid") String sid);

    @Insert("insert into tb_scenic_review_info values(#{reviewId},#{author},#{authorProfileUrl},#{picInfo},#{review},#{score},#{srcName},#{time},#{sid})")
    Integer insertScenicReviewInfo(TbScenicReviewInfo tbScenicReviewInfo);

    @Select("select t1.sid,t2.`name`,avg(t1.score) as uae from tb_scenic_review_info t1 left join tb_scenic_info t2  on t1.sid = t2.sid  group by t1.sid")
    List<UserEvaluation.ScenicEvaluation> queryAllScenicUserAverageEvaluation();

    @Select("select  srcName,count(*) as count from tb_scenic_review_info where sid = #{sid} group by srcName")
    List<UserInfo.UserSrc> queryAllScenicUserSrc(@Param("sid") String sid);

    @Select("select review from tb_scenic_review_info where sid=#{sid}")
    List<String> queryScenicReview(@Param("sid") String sid);

    @Insert("insert into tb_scenic_spot_check values(#{cid},#{spoName},#{thoughts},#{pictureUrl},#{address},#{lat},#{lng},#{spotid},#{sid},#{time})")
    Integer insertScenicSpotCheck(TbScenicSpotCheck tbScenicSpotCheck);

    @Select("select * from tb_scenic_spot_info where spotid=#{spotid}")
    TbScenicSpotInfo queryScenicPointInfoBySpointId(@Param("spotid") String spotid);

    @Select("select * from tb_scenic_spot_check where sid = #{sid}")
    List<TbScenicSpotCheck> queryScenicCheckBySid(@Param("sid") String sid);

    @Select("select spoName, count(*) as count from tb_scenic_spot_check  where sid = #{sid} group by spotid")
    List<TbScenicSpotCheck.SpotCheckStatistics> querySpotCheckCount(@Param("sid") String sid);

    @Select("select t2.name,CONCAT(MONTH(time)) as month,count(*) as count from tb_scenic_review_info t1 left join tb_scenic_info t2 on t1.sid = t2.sid where t1.sid=#{sid} group by month order by month+0")
    List<TbScenicReviewInfo.TouristAmount> queryTouristAmountBySid(@Param("sid") String sid);

    @Select("select CONCAT(MONTH(time)) as month,count(*) as count from tb_scenic_review_info group by month order by month+0")
    List<TbScenicReviewInfo.TouristAmount> queryTouristAmount();

    @Select("select t2.name,t2.sid from tb_scenic_review_info t1 left join tb_scenic_info t2 on t1.sid = t2.sid  group by t1.sid order by count(reviewId) desc limit 10")
    List<TbScenicInfo> queryAllScenicTop10ByReviewCount();

    @Select("select  count(*) as total,count(*)/12 as avgMonth from tb_scenic_review_info  where time like CONCAT(#{year},'%') and sid = #{sid}")
    ScenicAssess queryScenicAVGMonthTouristByYear(@Param("sid") String sid, @Param("year") String year);

    @Select("select  MONTH(time) as month,count(*) as count from tb_scenic_review_info  where time like CONCAT(#{year},'%') and sid = #{sid} group by month order by time ")
    List<ScenicAssess.AuarterAssess> queryScenicAuarterAssess(@Param("sid") String sid, @Param("year") String year);

    @Select("select t1.sid,t2.`name`,avg(t1.score) as uae from tb_scenic_review_info t1 left join tb_scenic_info t2 on t1.sid = t2.sid where time like CONCAT(#{year},'%') and t2.sid=#{sid}")
    UserEvaluation.ScenicEvaluation queryScenicUserAverageEvaluationBySidAndYear(@Param("sid") String sid,@Param("year") String year);

    @Select("select count(*) from tb_scenic_review_info where sid = #{sid} and score>=4 and time like CONCAT(#{year},'%')")
    Integer queryScenicReviewGoodEvaluationBySidAndYear(@Param("sid") String sid, @Param("year") String year);

    @Select("select  srcName,count(*) as count from tb_scenic_review_info where sid = #{sid} group by srcName order by count desc limit 4")
    List<UserInfo.UserSrc> queryAllScenicUserSrcBySidTop4(@Param("sid") String sid);

    @Select("select authorProfileUrl from tb_scenic_review_info where sid =#{sid} and authorProfileUrl <> '' and  authorProfileUrl like '%.jpg' and srcName='美团网' order by rand() limit 16")
    List<String> queryScenicReviewUserPicBySid(@Param("sid") String sid);

    @Select("select * from tb_scenic_spot_check order by sid")
    List<TbScenicSpotCheck> queryAllScenicCheck();
}
