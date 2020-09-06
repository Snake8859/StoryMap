package hello;

import com.csuft.gis.pojo.TbScenicInfo;
import com.csuft.gis.utils.ScenicCrawler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.PathParam;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

@RestController
public class HelloController {

    @Autowired
    private HelloMapper helloMapper;

    //测试环境搭建
    @RequestMapping("/hello-springboot")
    public List<UserTest> index(){
        return  helloMapper.queryUser();
    }


    @RequestMapping("/saveScenic/{sid}")
    public void saveScenic(@PathVariable("sid") String sid,@PathParam("citycode") Integer cityCode) {
        TbScenicInfo tbScenicInfo = ScenicCrawler.ScenicInfoCrawler(sid,cityCode);
        helloMapper.insertScenicInfo(tbScenicInfo);
    }

    @RequestMapping("/getScenic/{sid}")
    public TbScenicInfo getScenic(@PathVariable("sid") String sid){
        return helloMapper.queryScenicInfo(sid);
    }

}
