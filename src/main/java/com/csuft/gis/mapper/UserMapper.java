package com.csuft.gis.mapper;

import com.csuft.gis.pojo.TbUser;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

/**
 * 用户Mapper
 */
@Mapper
public interface UserMapper {
    @Insert("insert into tb_user(uid,account,password,name,identity,sid) values(#{uid},#{account},#{password},#{name},#{identity},#{sid})")
    int insertUser(TbUser tbUser);

    @Select("select uid,account,name,identity,sid from tb_user where account=#{account} and password=#{password}")
    TbUser queryUser(@Param("account") String account, @Param("password") String password);

    @Select("select count(*) from tb_user where account=#{account}")
    int queryUserByAccount(@Param("account") String account);
}
