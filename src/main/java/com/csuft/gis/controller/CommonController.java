package com.csuft.gis.controller;

import com.csuft.gis.pojo.Result;
import com.csuft.gis.utils.UuidUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * 公共Controller
 *  功能：图片上传 √
 */
@RestController
@RequestMapping("/common")
@PropertySource("classpath:resource.properties")
//@CrossOrigin(origins = "http://127.0.0.1:5501")//测试阶段跨域
public class CommonController {


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
     * 图片上传
     * @param file
     * @return
     */
    @PostMapping("/uploadImg") //相当于@RequestMapping(value = “/xx”, method = RequestMethod.POST)
    public Result uploadImg(MultipartFile file){
        if(file.isEmpty()|| file==null){
            System.out.println("文件为空");
        }
        // 获得原始图片名称
        String originalFilename = file.getOriginalFilename();
        // 获得后缀名 由于blob，没有后缀
        //String suffix = originalFilename.substring(originalFilename.lastIndexOf("."));
        // uuid生成图片新的名称
        String picName = UuidUtil.get32UUID() + ".jpg";
        try {
            //本地
            //file.transferTo(new File(UPLOAD_FOLDER_WINDOWS,picName));
            //return Result.build("200","图片上传成功",LOCAL_HTTP_PATH+picName);
            //远程
            file.transferTo(new File(UPLOAD_FOLDER_LUNIX,picName));
            return Result.build("200","图片上传成功",REMOTE_HTTP_PATH+picName);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return Result.build("202","图片上传失败");
    }


}
