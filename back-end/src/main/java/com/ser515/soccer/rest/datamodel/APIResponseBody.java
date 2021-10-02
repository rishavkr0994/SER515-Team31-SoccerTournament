package com.ser515.soccer.rest.datamodel;

public class APIResponseBody {
    public boolean isSuccess;
    public String errMsg;
    public Object data;

    public APIResponseBody() { }
    public static APIResponseBody success(Object data) {
        APIResponseBody apiResponseBody = new APIResponseBody();
        apiResponseBody.isSuccess = true;
        apiResponseBody.data = data;
        return apiResponseBody;
    }
    public static APIResponseBody failure(String errMsg) {
        APIResponseBody apiResponseBody = new APIResponseBody();
        apiResponseBody.isSuccess = false;
        apiResponseBody.errMsg = errMsg;
        return apiResponseBody;
    }
}
