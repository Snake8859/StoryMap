package com.csuft.gis.pojo;

public class Result {
    /**
     * 错误码
     */
    private String code;

    /**
     * 提示信息
     */
    private String msg;

    /**
     * 具体的内容
     */
    private Object data;


    /**
     * 根据 code， 和  msg 构建返回结果
     * @param code
     * @param msg
     * @return
     */
    public static Result build(String code, String msg) {
        return new Result (code, msg);
    }

    /**
     * 根据 code， 和  msg, 和 data 构建返回结果
     * @param code
     * @param msg
     * @param data
     * @return
     */
    public static  Result build(String code, String msg, Object data) {
        return new Result(code, msg, data);
    }


    /**
     *  若@ResponseBody起作用，需要使用getter和setter方法
     */

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Result(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Result(String code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

}