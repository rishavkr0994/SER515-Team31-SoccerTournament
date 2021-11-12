package com.ser515.soccer.rest.datamodel;

import java.util.List;

public class PagedAPIResponseBody<T> {
    public int pageNo;
    public int pageSize;
    public int pageCount;
    public long totalCount;
    public List<T> data;

    public PagedAPIResponseBody(int pageNo, int pageSize,
        int pageCount, long totalCount, List<T> data) {
        this.pageNo = pageNo;
        this.pageSize= pageSize;
        this.pageCount = pageCount;
        this.totalCount = totalCount;
        this.data = data;
    }
}
