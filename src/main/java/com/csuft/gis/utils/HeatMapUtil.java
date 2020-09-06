package com.csuft.gis.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.csuft.gis.pojo.TbHeatData;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

/**
 * 热力图数据爬虫
 *      腾讯位置大数据平台 区域热力图
 *      岳麓山为例
 */
public class HeatMapUtil {

    private static CloseableHttpClient httpClient =null;
    private static CloseableHttpResponse response = null;
    private static HttpGet httpGet = null;
    //岳麓山中心经纬度
    private final static double center_lat  = 28.183744046866305;
    private final static double center_lng = 112.93703449390313;

    public  static  List<TbHeatData> getHeatDataByTime(String datetime,String hour){
        //请求url
        String url = "https://heat.qq.com/api/getHeatDataByTime.php?region_id=1619&datetime="+datetime+"+"+hour+"%3A00%3A00&sub_domain=";
        //构造httpClient和httpGet对象
        httpClient = HttpClients.createDefault();
        httpGet = new HttpGet(url);
        //热力图数据
        List<TbHeatData> heatDateList = new ArrayList<TbHeatData>();

        try {
            //发起请求
            response =  httpClient.execute(httpGet);
            //解析响应
            if(response.getStatusLine().getStatusCode()==200) {
                //响应json字符串
                String content = EntityUtils.toString(response.getEntity(), "utf-8");
                //转为json对象
                JSONObject data = (JSONObject) JSON.parseObject(content);
                //取出所有键
                Set<String> keys = data.keySet();

                for (String key:keys) {//解密坐标
                        TbHeatData tbHeatData = new TbHeatData();
                        //取出权重
                        Integer weight = (Integer) data.get(key);
                        tbHeatData.setCount(weight.toString());
                        String[] split = key.split(",");
                        Double  lat = (10000*center_lat+Integer.parseInt(split[0]))/10000; //解码后纬度
                        Double  lng = (10000*center_lng+Integer.parseInt(split[1]))/10000; //解码后经度
                        tbHeatData.setLat(lat.toString());
                        tbHeatData.setLng(lng.toString());
                        tbHeatData.setDatetime(datetime+"-"+hour);
                        heatDateList.add(tbHeatData);
                        //System.out.println(lat+","+lng+":"+weight);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return heatDateList;
    }

    public static void main(String[] args) {
        System.out.println(getHeatDataByTime("2019-09-01","01"));
    }


}
