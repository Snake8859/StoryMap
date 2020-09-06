package com.csuft.gis.utils;

import com.kennycason.kumo.CollisionMode;
import com.kennycason.kumo.WordCloud;
import com.kennycason.kumo.WordFrequency;
import com.kennycason.kumo.bg.CircleBackground;
import com.kennycason.kumo.bg.PixelBoundryBackground;
import com.kennycason.kumo.font.KumoFont;
import com.kennycason.kumo.font.scale.SqrtFontScalar;
import com.kennycason.kumo.nlp.FrequencyAnalyzer;
import com.kennycason.kumo.nlp.tokenizers.ChineseWordTokenizer;
import com.kennycason.kumo.palette.LinearGradientColorPalette;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import java.awt.*;
import java.io.*;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 词云生成工具类
 */
public class WordCloudUtil {

    //Windows环境下路径
    private static String UPLOAD_FOLDER_WINDOWS;

    //Linux环境下路径
    private static String UPLOAD_FOLDER_LUNIX;

    //本地访问前缀
    private static String LOCAL_HTTP_PATH;

    //远程访问前缀
    private static String REMOTE_HTTP_PATH;

    /**
     * 静态代码块
     *      读取配置文件
     */
    static{
        ClassPathResource cpr = new ClassPathResource("resource.properties");
        Properties properties = null;
        try{
            properties = new Properties();
            properties.load(cpr.getInputStream());
            UPLOAD_FOLDER_WINDOWS = properties.getProperty("UPLOAD_FOLDER_WINDOWS");
            UPLOAD_FOLDER_LUNIX = properties.getProperty("UPLOAD_FOLDER_LUNIX");
            LOCAL_HTTP_PATH = properties.getProperty("LOCAL_HTTP_PATH");
            REMOTE_HTTP_PATH = properties.getProperty("REMOTE_HTTP_PATH");
        }catch (IOException e){
            e.printStackTrace();
        }
    }



    /**
     * 文件读取
     *      打包jar情况下存在问题 需要修改
     * @return
     */
    public static  List<String> getStopWords()  {
        String filePath = "";
        try {
            File file = ResourceUtils.getFile(ResourceUtils.CLASSPATH_URL_PREFIX + "static/stopwords/四川大学机器智能实验室停用词库.txt");
            filePath = file.getPath();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        //读取文件
        List<String> lineLists = null;
        try {
            System.out.println(filePath);
            lineLists = Files
                    .lines(Paths.get(filePath), Charset.defaultCharset())
                    .flatMap(line -> Arrays.stream(line.split("\n")))
                    .collect(Collectors.toList());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return  lineLists;
    }

    /**
     * 读取文件内容
     *      jar包解决
     * @return
     */
    public static List<String> getFileContent() {
        List<String> strList = new ArrayList<String>();
        ClassPathResource cpr = new ClassPathResource("static/stopwords/四川大学机器智能实验室停用词库.txt");
        InputStreamReader read = null;
        BufferedReader reader = null;
        try {
            read = new InputStreamReader(cpr.getInputStream(),"utf-8");
            reader = new BufferedReader(read);
            String line;
            while ((line = reader.readLine()) != null) {
                strList.add(line);
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (read != null) {
                try {
                    read.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        }
        return strList;
    }

    /**
     * 词云生成工具类
     * @param words
     * @param sid
     * @return
     */
    public static String createWordCloud(List<String> words,String sid){
        //词频分析器
        FrequencyAnalyzer frequencyAnalyzer = new FrequencyAnalyzer();
        //词频
        frequencyAnalyzer.setWordFrequenciesToReturn(200);
        //最小分割单元
        frequencyAnalyzer.setMinWordLength(2);
        //停用词
        frequencyAnalyzer.setStopWords(getFileContent());
        //引入中文解析器
        frequencyAnalyzer.setWordTokenizer(new ChineseWordTokenizer());
        //指定数据源，生成词频集合
        List<WordFrequency> wordFrequencyList = frequencyAnalyzer.load(words);
        //设置词云图片分辨率
        Dimension dimension = new Dimension(990,620);
        //生成词云对象
        WordCloud wordCloud = new WordCloud(dimension, CollisionMode.PIXEL_PERFECT);
        //构建圆形背景，字体颜色
        wordCloud.setPadding(2);
        //Windos环境下字体 (Linux环境下需要按照simhei)
        Font font = new Font("simhei",2,20);
        //wordCloud.setBackground(new CircleBackground(300));
        try {
            ClassPathResource cpr = new ClassPathResource("static/s-img/whale.png");
            wordCloud.setBackground(new PixelBoundryBackground(cpr.getInputStream()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        wordCloud.setBackgroundColor(new Color(255,255,255));
        wordCloud.setColorPalette(new LinearGradientColorPalette(Color.RED, Color.BLUE, Color.GREEN, 30, 30));
        wordCloud.setFontScalar(new SqrtFontScalar(12, 45));
        wordCloud.setKumoFont(new KumoFont(font));
        //生成词云
        wordCloud.build(wordFrequencyList);
        String outputFileName=sid+".png";
        //Windows环境下
        //wordCloud.writeToFile(UPLOAD_FOLDER_WINDOWS+outputFileName);
        //return LOCAL_HTTP_PATH+outputFileName;
        //Liunx环境下
        wordCloud.writeToFile(UPLOAD_FOLDER_LUNIX+outputFileName);
        return REMOTE_HTTP_PATH+outputFileName;

    }


    public static void main(String[] args) throws IOException {

        createWordCloud(Arrays.asList("可能是天气原因吧，没有什么新鲜感。","小孩很喜欢，坐车方便，值得一看。","靖港古镇去过三次了，好吃又好玩。"),"B0FFG0BPT6");
    }

}
