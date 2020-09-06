package com.csuft.gis.controller;
import com.csuft.gis.pojo.Result;
import com.csuft.gis.pojo.TbUser;
import com.csuft.gis.service.MapService;
import com.csuft.gis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * 用户控制层
 *  功能：登录，注册，用户基本信息查询 √
 */
@RestController
@RequestMapping("/user")
//@CrossOrigin(origins = "http://127.0.0.1:5501") //测试阶段跨域
public class UserController {

    //用户服务
    @Autowired
    private UserService userService;

    //地图服务
    @Autowired
    private MapService mapService;

    /**
     * 用户登录
     * @param account
     * @param password
     * @param response
     * @return
     */
    @RequestMapping("/login")
    public Result login(@RequestParam(value = "account",required = true) String account,
                        @RequestParam(value = "password",required = true) String password,
                        HttpServletResponse response){
        Result result = userService.queryUser(account,password);
        //改用redis 跨域写cookie存在问题
        /*if(result.getCode().equals("200")){ //登录成功，将登录信息写入cookie
            //取数据，json转化
            TbUser tbUser = (TbUser)result.getData();
            Cookie cookie = new Cookie("storymap-token", tbUser.getUid());
            //设置cookie过期时间为2个小时
            cookie.setMaxAge(60*60*2);
            cookie.setPath("/");
            response.addCookie(cookie);
        }*/
        return result;
    }


    /**
     * 用户注册
     * @param tbUser
     * @return
     */
    @RequestMapping("/register")
    public Result register(@RequestBody TbUser tbUser,
                           @RequestParam(value = "cityCode",required = true) Integer cityCode,
                           @RequestParam(value = "location",required = true) String location){
        if(tbUser!=null){
            //用户信息保存
            Result userResult = userService.insertUser(tbUser);
            //用户所属景区信息获取
            Result mapResult = mapService.getScenicInfo(tbUser.getSid(),cityCode,location);
            if(mapResult.getCode().equals("200")){
                return userResult;
            }else {
                return mapResult;
            }
        }
        return Result.build("201","用户信息获取失败");
    }

    /**
     * 校验登录状态
     * @param uid
     * @return
     */
    @RequestMapping("/checkLogin")
    public Result checkLogin(@RequestParam(value = "uid",required = true) String uid){
        return  userService.queryUserByUidFromRedis(uid);
    }

    /**
     * 登出
     * @param uid
     * @return
     */
    @RequestMapping("/logout")
    public  Result logout(@RequestParam(value = "uid",required = true) String uid){
        return userService.logoutUserByUidFromRedis(uid);
    }

}
