import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//启动注解方式一
//@EnableAutoConfiguration
//@ComponentScan(basePackages = "com.csuft.gis.controller")
//@MapperScan("com.csuft.gis.mapper")

//启动注解方式二
@SpringBootApplication(scanBasePackages = {"com.csuft.gis.controller","com.csuft.gis.service"})
@MapperScan("com.csuft.gis.mapper")
public class App {

    public static void  main(String[] args){
        SpringApplication.run(App.class,args);
    }

}
