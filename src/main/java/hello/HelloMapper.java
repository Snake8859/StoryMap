package hello;

import com.csuft.gis.pojo.TbScenicInfo;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

//mapper测试
@Mapper
public interface HelloMapper {

    @Select("select * from tb_user")
    public List<UserTest> queryUser();

    @Insert("insert into tb_scenic_info values(#{sid},#{name},#{address},#{tel},#{startLevel},#{introduction},#{tag},#{pictureUrl})")
    public int insertScenicInfo(TbScenicInfo tbScenicInfo);

    @Select("select * from tb_scenic_info where sid = #{sid}")
    public  TbScenicInfo queryScenicInfo(@Param("sid") String sid);

}
