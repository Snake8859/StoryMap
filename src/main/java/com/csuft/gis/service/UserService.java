package com.csuft.gis.service;

import com.csuft.gis.pojo.Result;
import com.csuft.gis.pojo.TbUser; /**
 * 用户业务层
 */
public interface UserService {
    /**
     * 用户注册
     * @param tbUser
     * @return
     */
    Result insertUser(TbUser tbUser);

    /**
     * 用户登录
     * @param account
     * @param password
     * @return
     */
    Result queryUser(String account,String password);

    /**
     * 根据uid，从redis中查询用户信息
     * @param uid
     * @return
     */
    Result queryUserByUidFromRedis(String uid);

    /**
     * 根据uid，从redis中注销用户登录状态
     * @param uid
     * @return
     */
    Result logoutUserByUidFromRedis(String uid);
}
