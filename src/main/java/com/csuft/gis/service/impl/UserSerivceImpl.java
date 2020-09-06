package com.csuft.gis.service.impl;

import com.alibaba.fastjson.JSON;
import com.csuft.gis.mapper.MapMapper;
import com.csuft.gis.mapper.UserMapper;
import com.csuft.gis.pojo.Result;
import com.csuft.gis.pojo.TbScenicInfo;
import com.csuft.gis.pojo.TbUser;
import com.csuft.gis.service.UserService;
import com.csuft.gis.utils.ScenicCrawler;
import com.csuft.gis.utils.UuidUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 用户业务层 实现
 */
@Service
public class UserSerivceImpl implements UserService {

    //用户mapper
    @Autowired
    private UserMapper userMapper;

    //地图mapper
    @Autowired
    private MapMapper mapMapper;

    //redis
    @Autowired
    private RedisTemplate<String,String> redisTemplate;


    /**
     * 用户表插入用户信息
     * @param tbUser
     * @return
     */
    @Override
    public Result insertUser(TbUser tbUser) {
        //生成uuid
        tbUser.setUid(UuidUtil.get32UUID());
        //设置身份
        tbUser.setIdentity("0");
        try{
            //账户重复校验
            int count = userMapper.queryUserByAccount(tbUser.getAccount());
            if(count>=1){
                return Result.build("203","注册失败:该账户已被注册");
            }
            int resultCount  = userMapper.insertUser(tbUser);
            return Result.build("200","注册成功");
        }
        catch (Exception e){
            e.printStackTrace();
            return Result.build("202","注册失败:异常未知");
        }

    }


    /**
     * 用户表查询用户信息
     * 根据用户名和密码
     * @param account
     * @param password
     * @return
     */
    @Override
    public Result queryUser(String account,String password) {
        TbUser tbUser = userMapper.queryUser(account,password);
        if(tbUser!=null){
            //登录状态写入redis
            String key = "STORYMAP:"+tbUser.getUid();
            redisTemplate.boundValueOps(key).set(JSON.toJSONString(tbUser));
            //2小时过期
            redisTemplate.expire(key,2*60, TimeUnit.MINUTES);
            return Result.build("200","登录成功",tbUser);
        }
        return Result.build("201","登录失败:账户或者密码为空");
    }

    /**
     * redis中存储用户信息
     * @param uid
     * @return
     */
    @Override
    public Result queryUserByUidFromRedis(String uid) {
        //从redis中获取用户信息
        String key = "STORYMAP:" +uid;
        String userJsonStr = redisTemplate.boundValueOps(key).get();
        if(userJsonStr!=null&&!userJsonStr.equals("")){//登录未失效
            //转回对象
            TbUser tbUser = JSON.parseObject(userJsonStr,TbUser.class);
            //查询所属景区
            TbScenicInfo tbScenicInfo = mapMapper.queryScenicInfoBySid(tbUser.getSid());
            if(tbScenicInfo!=null){
                tbUser.setTbScenicInfo(tbScenicInfo);
            }
            return Result.build("200","用户已登录",tbUser);
        }
        //登录失效
        return Result.build("201","登录已过期，请重新登录");
    }

    /**
     * redis中清除用户信息
     * @param uid
     * @return
     */
    @Override
    public Result logoutUserByUidFromRedis(String uid) {
        //从redis中清除登录状态
        String key = "STORYMAP:" +uid;
        redisTemplate.delete(key);
        return Result.build("200","登录状态清除");
    }

}
