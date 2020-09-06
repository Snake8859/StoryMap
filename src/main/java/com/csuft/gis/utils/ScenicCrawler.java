package com.csuft.gis.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.csuft.gis.pojo.TbScenicInfo;
import com.csuft.gis.pojo.TbScenicReviewInfo;
import com.vdurmont.emoji.EmojiParser;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import sun.security.krb5.SCDynamicStoreConfig;

import java.util.ArrayList;
import java.util.List;

/**
 * 景区爬虫
 *      景区基本信息爬虫
 *      景区评论爬虫
 *
 *      httpclient+jsoup实现
 */
public class ScenicCrawler {

    private static CloseableHttpClient httpClient =null;
    private static CloseableHttpResponse response = null;
    private static HttpGet httpGet = null;

    /**
     * 景区详情爬虫  - 高德景区（已被屏蔽）
     * @param sid
     * @param cityCode
     */
    public static TbScenicInfo ScenicInfoCrawler(String sid,int cityCode){
       String url = "https://www.amap.com/detail/"+sid+"?citycode="+cityCode;
       TbScenicInfo tbScenicInfo = new TbScenicInfo();
       //设置sid
        tbScenicInfo.setSid(sid);
       try{
           //构造httpClient和httpGet对象
           httpClient = HttpClients.createDefault();
           httpGet = new HttpGet(url);
           //发起请求
           response =  httpClient.execute(httpGet);
           //获取返回结果
           /**
            * 标签，名称和地址一般都会有 景区基本信息
            * 电话，星级，详细介绍和图片 不一定会有 景区拓展信息
            */
           if(response.getStatusLine().getStatusCode()==200) {
               String content = EntityUtils.toString(response.getEntity(), "utf-8");
               //Jsoup解析
               Document doc = Jsoup.parse(content);
               //获得景区标签
               Element tag_2 = doc.select("span.tag_2").first();
               tbScenicInfo.setTag(tag_2.text());
               //获取景区名称
               Element detail_title = doc.select("h4.detail_title").first();
               tbScenicInfo.setName(detail_title.text());
               //获取景区地址
               Element address_2 = doc.select("span.address_2").first();
               tbScenicInfo.setAddress(address_2.text());

               //获取景区电话
               Element telephone_2 = doc.select("span.telephone_2").first();
               if(telephone_2!=null) {
                   tbScenicInfo.setTel(telephone_2.text());
               }
               //获得景区星级
               Element star_level_2 = doc.select("span.star_level_2").first();
               if(star_level_2!=null) {
                   tbScenicInfo.setStarLevel(star_level_2.text());
               }
               //获得景区介绍
               Elements detail_introduce = doc.select("div.detail_introduce p");
               if(detail_introduce!=null) {
                   tbScenicInfo.setIntroduction(detail_introduce.text());
               }
               //获得景区图片
               Elements display_img = doc.select("img.example-image");
               if(display_img!=null) {
                   List<String> imgList = new ArrayList<String>();
                   int i = 0;
                   for (Element element : display_img) {
                       imgList.add(element.attr("data-original"));
                       //取前三条
                       i++;
                       if (i == 3) {
                           break;
                       }
                   }
                   tbScenicInfo.setPictureUrl(JSON.toJSONString(imgList));
               }
           }
        }
       catch (Exception e){
            e.printStackTrace();
       }
       return tbScenicInfo;
    }

    /**
     * 景区评论爬虫 - 高德评论
     * @param sid
     * @return
     */
    public static List<TbScenicReviewInfo> ScenicReviewInfoCrawler(String sid){

        //页数
        Integer pageNum = 1;
        //url
        String url = "";
        //httpClient
        httpClient = HttpClients.createDefault();
        //评论信息集合
        List<TbScenicReviewInfo> list = new ArrayList<TbScenicReviewInfo>();
        try{
                while (true) {
                    url = "https://www.amap.com/detail/get/reviewList?poiid="+sid+"&pagesize=10&pagenum="+pageNum;
                    //构造httpClient和httpGet对象
                    httpGet = new HttpGet(url);
                    //发起请求
                    response =  httpClient.execute(httpGet);
                    //获取返回结果
                    if (response.getStatusLine().getStatusCode() == 200) {
                        String content = EntityUtils.toString(response.getEntity(), "utf-8");
                        //System.out.println(content);
                        //获得评论JSON对象
                        JSONObject data = (JSONObject) JSON.parseObject(content).get("data");
                        //获得总页数
                        Integer pageTotal = (Integer) data.get("page_total");
                        //获得评论列表
                        JSONArray review_list = data.getJSONArray("review_list");
                        for (int i= 0; i < review_list.size(); i++) {
                            try{
                                TbScenicReviewInfo tbScenicReviewInfo = new TbScenicReviewInfo();
                                //评论id
                                tbScenicReviewInfo.setReviewId(review_list.getJSONObject(i).getString("review_id"));
                                //评论人 emoji表情过滤
                                tbScenicReviewInfo.setAuthor(EmojiParser.replaceAllEmojis((review_list.getJSONObject(i).getString("author")),"-"));
                                //评论人照片
                                tbScenicReviewInfo.setAuthorProfileUrl(review_list.getJSONObject(i).getString("author_profileurl"));
                                //评论内容照片列表
                                tbScenicReviewInfo.setPicInfo(review_list.getJSONObject(i).getString("pic_info"));
                                //评论内容 emoji表情过滤
                                tbScenicReviewInfo.setReview(EmojiParser.replaceAllEmojis((review_list.getJSONObject(i).getString("review")),"-"));
                                //评论评分
                                tbScenicReviewInfo.setScore(Double.parseDouble(review_list.getJSONObject(i).getString("score")));
                                //评论来源
                                tbScenicReviewInfo.setSrcName(review_list.getJSONObject(i).getString("src_name"));
                                //评论时间
                                tbScenicReviewInfo.setTime(review_list.getJSONObject(i).getString("time"));
                                //景区id
                                tbScenicReviewInfo.setSid(sid);
                                list.add(tbScenicReviewInfo);
                            }catch (Exception e){
                                e.printStackTrace();
                            }
                        }
                        pageNum++;
                        if(pageNum>pageTotal){
                            break;
                        }
                    }
                }
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }



    public static void main(String[] args) {
        //测试景区信息爬虫
        //System.out.println(ScenicInfoCrawler("B0FFG0BPT6",430100));
        //测试景区评论爬虫 -高德地图
        //System.out.println(ScenicCrawler.ScenicReviewInfoCrawler("B02DB104Y7").size());
    }





}
